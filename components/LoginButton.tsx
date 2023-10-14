"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function LoginButton() {
  const { data: session } = useSession();
  if (session && session.user) {
    
    return (
      <>
      

<div className="card mb-3" style={{maxWidth: '100%'}}>
  <div className="row g-0">
    <div className="col-3 col-sm-2 col-lg-1">
    <Image src={session.user.image} class="card-img-top" alt="..." width={120} height={160}  />
    </div>
    <div class="col-9 col-sm-10 col-lg-11">
      <center>
      <div className="card-body">
      <h5>Welcome back, {session.user.name}</h5>
        <p class="card-text"> Signed in as {session.user.email} <br /></p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
      </center>
    </div>
  </div>
  <div className="row g-0"></div>
</div>

      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}