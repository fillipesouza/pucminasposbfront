"use client";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useState } from "react";
import worker from '../images/worker.png';
import client from '../images/client.png';
import Image from "next/image";

export default function RolePage({ email
}: {
    email: string
}) {
    const [role, setRole] = useState('')
    const [form, setForm] = useState({});

    const handleInput = (e: any) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    const axiosAuth = useAxiosAuth();
  const sendDataToServer = async () => {
    form.email = email;
    let res;
    if(role === 'customer'){        
        res = await axiosAuth.post("/customers", form);
    } else {
        res = await axiosAuth.post("/providers", form);
    }
  };


    return (
        <div className="container">
            <div className="row">
                {!role &&
                    <>
                        <center><h1>Choose your role</h1></center>
                        <div style={{ display: "flex", height: '60vh', flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                            <button className="btn btn-outline-warning" onClick={() => setRole('customer')}>
                                <Image src={client} alt="client" width={0} height={0} style={{ width: '20vh', height: '20vh' }}  />
                                <br />
                                <br />
                                <p style={{ textAlign: 'center' }}><h2>Customer</h2></p>
                            </button>
                            <button className="btn btn-outline-primary" onClick={() => setRole('provider')}>
                                <Image src={worker} alt="worker" width={0} height={0} style={{ width: '20vh', height: '20vh' }}  />
                                <br />
                                <br />
                                <p style={{ textAlign: 'center' }}><h2>Provider</h2></p>
                            </button>
                        </div>
                    </>
                }
                {role && <>
                    <center><h1>Fill out the form</h1></center>
                    <div className="row">
                        {role === 'customer' ?
                            <>
                                <div className="mb-3 col-md-12">
                                    <label htmlFor="companyName" className="form-label">Company Name</label>
                                    <input type="text" className="form-control" id="companyName" name="companyName" placeholder="Mercado do Povo" onChange={handleInput} />
                                </div>
                            </>
                            : <>
                                <div className="mb-3 col-md-12">
                                    <label htmlFor="providerName" className="form-label">Provider Name</label>
                                    <input type="text" className="form-control" id="providerName" name="providerName" placeholder="Eletronica LTDA" onChange={handleInput} />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label htmlFor="providerCode" className="form-label">Provider Code</label>
                                    <input type="text" className="form-control" id="providerCode" name="providerCode" placeholder="CNPJ" onChange={handleInput} />
                                </div>
                            </>
                        }
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
                            <select className="form-select" aria-label="state" id="state" name="state" onChange={handleInput}>
                                <option selected>Choose the State</option>
                                <option value="MG">MG</option>
                                <option value="SP">SP</option>
                                <option value="RJ">RJ</option>
                                <option value="GO">GO</option>
                                <option value="ES">ES</option>
                                <option value="BA">BA</option>
                                <option value="TO">TO</option>
                            </select>
                        </div>
                        <button className="btn btn-primary" onClick={sendDataToServer}>Submit</button>
                        <br />
                    
                    <hr />
                    <br />
                    <br />
                    <br />
                    <br />
                    </div>
                    
                    <center><button className="btn btn-warning" onClick={() => setRole('')}>Back to choose another role</button></center>
                </>
                }

            </div>
        </div>
    )
}