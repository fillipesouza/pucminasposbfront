"use client";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { Address } from "@/models/Address";
import Device from "@/models/DeviceResponse";
import Order from "@/models/Order";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

export default function MyOrders() {
    const { data: session, status } = useSession();
    const initialState : Order[] = [];
    const initialAddress: Address = {address1: '', city: '', zipcode: '', country: '', phone: ''}
  const [orders, setOrders] = useState(initialState);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (newAddress: Address) => {setShow(true); setAddress(newAddress)};
  const [address, setAddress] = useState(initialAddress);

  const axiosAuth = useAxiosAuth();
  const fetchDevices = async () => {
    const res = await axiosAuth.get("/orders/providers/" + session?.user.data.providerId);
    setOrders(res.data);
  };

  useEffect(() => {
    fetchDevices();
  }, [])
  return (
    <main >
      {JSON.stringify(session?.user.data)}
        <center><h1>Devices</h1></center>
        
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>CustomerName</th>
                    <th>ProviderName</th>
                    <th>Area</th>
                    <th>Device</th>
                    <th>City</th>
                    <th>Address</th>

                </tr>
            </thead>
            <tbody>
                {orders && orders.map((o, i) => (
                    <tr key={i}>
                        <td>{o._id}</td>
                        <td>{o.customerName}</td>
                        <td>{o.providerName}</td>
                        <td>{o.areaPlan}</td>
                        <td>{o.devicePlan}</td>
                        <td>{o.address.city}</td>
                        <td><Button onClick={() => handleShow(o.address)}>See Address</Button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <p>{address.address1}</p>
                <p>Zip code: {address.zipcode}  Phone: {address.phone}</p>
                <p>{address.city} - {address.state} ({address.country})</p>
        </Modal.Body>
      </Modal>
     
    </main>
  )
}