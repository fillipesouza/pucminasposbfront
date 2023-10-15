"use client";
import PaymentForm from "@/components/PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Home() {
  const [isPagamento, setPagamento] = useState(false)
  const [form, setForm] = useState({});

  const handleInput = (e: any) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  }
  return (
    <div className="container">
      <center><h1>Installation Order</h1></center>
      <hr  />
      <br /><br />
      {!isPagamento ?
      <form className="row">
        <div className="mb-3 col-md-10">
          <label htmlFor="address" className="form-label">Address</label>
          <input type="text" className="form-control" id="address" name="address" placeholder="Rua Presidente Peixoto" onChange={handleInput} />
        </div>
        <div className="mb-3  col-md-2">
          <label htmlFor="number" className="form-label">Number</label>
          <input type="text" className="form-control" id="number" name="number" placeholder="999" onChange={handleInput} />
        </div>
        <div className="mb-3  col-md-5">
          <label htmlFor="complement" className="form-label">Complement</label>
          <input type="text" className="form-control" id="complement" name="complement" placeholder="Apto 4, Bloco 1" onChange={handleInput} />
        </div>
        <div className="mb-3  col-md-4">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input type="text" className="form-control" id="phone" name="phone" placeholder="(31)987541254" onChange={handleInput} />
        </div>
        <div className="mb-3  col-md-3">
          <label htmlFor="zipcode" className="form-label">Zip Code</label>
          <input type="text" className="form-control" id="zipcode" name="zipcode" placeholder="19454-351" onChange={handleInput} />
        </div>
       
        <div className="mb-3 col-sm-9">
          <label htmlFor="city" className="form-label">City</label>
          <input type="text" className="form-control" id="city" name="city" placeholder="Belo Horizonte" onChange={handleInput} />
        </div>
        <div className="mb-3 col-sm-3">
          <label htmlFor="state" className="form-label">State</label>
        <select className="form-select" defaultValue={"DEFAULT"} aria-label="state" id="state" name="state" onChange={handleInput}>
          <option value="DEFAULT" disabled>Choose the State</option>
          <option value="MG">MG</option>
          <option value="SP">SP</option>
          <option value="RJ">RJ</option>
          <option value="GO">GO</option>
          <option value="ES">ES</option>
          <option value="BA">BA</option>
          <option value="TO">TO</option>
        </select>
        </div>
        <div className="mb-3 col-sm-6">
          <label htmlFor="size" className="form-label">Area size in m<sup>2</sup> (roughly)</label>
        <select className="form-select"  defaultValue={"DEFAULT"} aria-label="size" id="size" name="size" onChange={handleInput}>
          <option value="DEFAULT" disabled>Choose the area (in square meters)</option>
          <option value="1">20-50</option>
          <option value="2">50-150</option>
          <option value="3">150-300</option>
        </select>
        </div>
        <div className="mb-3 col-sm-6">
          <label htmlFor="deviceNumber" className="form-label">Amount of devices (estimate)</label>
        <select className="form-select"  defaultValue={"DEFAULT"} aria-label="deviceNumber" id="deviceNumber" name="deviceNumber" onChange={handleInput}>
          <option value="DEFAULT" disabled>The number of devices you wish to deploy</option>
          <option value="1">1-5</option>
          <option value="2">5-15</option>
          <option value="3">15-30</option>
        </select>
        </div>
        <div className="mb-3">
          <label htmlFor="obs" className="form-label">Observations</label>
          <textarea className="form-control" id="obs" name="obs" rows={3} onChange={handleInput}></textarea>
        </div>
        <button className="btn btn-primary" onClick={() => setPagamento(true)}>Go to Checkout</button>
      </form>

       :
      <Elements stripe={stripePromise}>
        <PaymentForm metadata={form} />
        <br />
        <br />
        <center><button className="btn btn-warning" onClick={() => setPagamento(false)}>Back</button></center>
      </Elements>
    }
    
    </div>
  );
}