"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import RolePage from "./RolePage";
import bigLogo from '../images/mgsense_big.png';

export default function HomeScreen() {
  const { data: session } = useSession();
  if (session && session.user) {
    if (session.user.data && session.user.data.status === 'processed') {
      return (
        <>


          <div className="card mb-3" style={{ maxWidth: '100%' }}>
            <div className="row g-0">
              <div className="col-3 col-sm-2 col-lg-1">
                <Image src={session.user.image} className="card-img-top" alt="..." width={120} height={160} />
              </div>
              <div className="col-9 col-sm-10 col-lg-11">
                <center>
                  <div className="card-body">
                    <h5>Welcome back, {session.user.name}</h5>
                    <p className="card-text"> Signed in as {session.user.data && session.user.data.isProvider ? "PROVIDER" : "CUSTOMER"} with {session.user.email} <br /></p>
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                  </div>
                </center>
              </div>
            </div>
            <br />
            <br />
            <hr />
            {session.user.data && session.user.data.isProvider &&
            <div className="row g-0" style={{height: '60vh', overflowY: 'auto'}}>
             
              <div className="card text-center">
                <div className="card-header  bg-primary  text-white">
                  Notifications
                </div>
                <div className="card-body">
                 Nothing yet
                </div>
                <div className="card-footer text-muted">
                  Last updated at: 1 day ago
                </div>
              </div>
              


            </div>
            }
             {session.user.data && session.user.data.isCustomer && 
             <div className="row g-0" style={{height: '60vh', overflowY: 'auto'}}>
             
             <div className="card text-center col-md-6">
                <div className="card-header  bg-primary  text-white">
                  Device Summary
                </div>
                <div className="card-body">
                 Nothing yet
                </div>
                <div className="card-footer text-muted">
                  Last updated at: 1 day ago
                </div>
              </div>
              <div className="card text-center col-md-6">
                <div className="card-header  bg-primary  text-white">
                  Notifications
                </div>
                <div className="card-body">
                 Nothing yet
                </div>
                <div className="card-footer text-muted">
                  Last updated at: 1 day ago
                </div>
              </div>
             


           </div>
          }
          </div>

        </>
      );

    } else if (session.user.data && session.user.data.status === 'processing') {
      return (
        <>
          <h1>Your account is still being processed...</h1>
        </>
      )
    } else {
      return (
        <>
          <RolePage email={session.user.email || ''} />
        </>
      )
    }
  } else {
    return (
      <>
        <br />
        <Image src={bigLogo} width={0} height={0} style={{ width: '40vh', height: '40vh' }} />
        <button className="btn border-t-orange-600" onClick={() => signIn()}>Sign in</button>
      </>
    );
  }
}