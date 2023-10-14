"use client";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import Device from "@/models/DeviceResponse";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Devices() {
    const { data: session, status } = useSession();
    const initialState : Device[] = [];
  const [devices, setDevices] = useState(initialState);
  const axiosAuth = useAxiosAuth();
  const fetchDevices = async () => {
    const res = await axiosAuth.get("/devices/test");
    setDevices(res.data);
  };

  useEffect(() => {
    fetchDevices();
  }, [])
  return (
    <main >
        <center><h1>Devices</h1></center>
        
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Device Alias</th>
                    <th>Device Type</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>
                {devices && devices.map((d, i) => (
                    <tr key={i}>
                        <td>{d.deviceId}</td>
                        <td>{d.deviceAlias}</td>
                        <td>{d.deviceType}</td>
                        <td>{d.measurementValue}</td>
                    </tr>
                ))}
            </tbody>
        </table>
     
    </main>
  )
}