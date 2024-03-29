"use client";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import MyModal from './MyModal'
import bootstrap from 'bootstrap';
import SpinnerLoading from "./SpinnerLoading";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useRouter } from 'next/navigation'

export default function PaymentForm({ metadata
}: {
  metadata: any
}) {

  const mappedButton = {
    "1": <div className="btn btn-default">Basic</div>,
    "2": <div className="btn btn-primary">Standard</div>,
    "3": <div className="btn btn-success">Select+</div>
    
  }

  const stripe = useStripe();
  const elements = useElements();
  const [modal, setModal] = useState({show: false, success: false, title: ''})
  const [loading, setLoading] = useState(false);
  const axiosAuth = useAxiosAuth();
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cardElement = elements?.getElement("card");
    

    try {
      setLoading(true);
      if (!stripe || !cardElement) return null;
      const { data } = await axios.post("/api/create-payment-intent", {
        data: { amount: 89 },
      });
      console.log(data)
      const clientSecret = data;
      const res = await axiosAuth.post('/orders', { id: clientSecret, ...metadata})
      console.log(res);
      setModal({success: true, title: "Payment Successfully Sent", show: true });
      //await stripe?.confirmCardPayment(clientSecret, {
       // payment_method: { card: cardElement },
      //});
    } catch (error) {
      console.log(error);
      setModal({success: false, title: "Payment Failed", show: true });
    } finally {
      setLoading(false)
    }
  };

  if(loading) return (<SpinnerLoading title="Sending..." />)
  else return (
    <form className="row" onSubmit={onSubmit}>

      <h4>Personal Data</h4>
      <p>Address: {metadata.address + " " + metadata.number + " " + metadata.complement || ''} </p>
      <p>City: {metadata.city} - {metadata.state}  ZipCode: {metadata.zipcode}</p>
      <p>Telephone: {metadata.phone}   </p>
      <p>Additional info {metadata.obs} </p>
      <hr />

      <h4>Plain Data</h4>
      <div style={{ width: '100%' }}>
        <h4 style={{ float: 'left' }}>Area {mappedButton[metadata.size]}</h4> <h4 style={{ float: 'right' }}>{metadata.size * 7}</h4> <br /><br />
        <h4 style={{ float: 'left' }}>Sensor Plan {mappedButton[metadata.deviceNumber]} </h4> <h4 style={{ float: 'right' }}>{metadata.deviceNumber * 20}</h4> <br /><br />
        <hr />
        <h4 style={{ float: 'left' }}>Total </h4> <h4 style={{ float: 'right' }}>{metadata.deviceNumber * 20 + metadata.size * 7}</h4>
      </div>
      <br />
      <br /><br />
      <hr />

      <h3><p>Fill out the credit card information: </p></h3>
      <CardElement className="card"
        options={{
          hidePostalCode: true,
          iconStyle: "solid",
          style: {
            base: {
              backgroundColor: "white",
              lineHeight: "2",
              padding: "1",


            }
          },
        }} />
        
      <br />
      
      <br />
      <hr />
      <MyModal show={modal.show} title={modal.title} success={modal.success} handleClose={() => modal.success ? router.push('/') : setModal({...modal, show: false})}/>
      <br /><br />
      <button className="btn btn-success" type="submit">Submit</button>
    </form>
  );
}