import React from 'react'
import Link from 'next/link'
import mgsense from '../../images/logomg.png'
import Image from 'next/image'

export default function MenuBar() {
    return (
        <nav className="navbar navbar-expand-lg my-nav">
  <div className="container-fluid">
    <a className="navbar-brand" href="/"><Image src={mgsense} alt={"logo"} width={35} height={27} /><div style={{display: 'inline', color: 'white', backgroundColor: '#dd7711', paddingBottom: 5, paddingRight: 10}}>SENSE</div></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="my-nav-item">
          <a   href="/">Home</a>
        </li>
        <li className="my-nav-item">
          <a  href="/devices">Devices</a>
        </li>
        <li className="my-nav-item">
          <a  href="/orders">Orders</a>
        </li>
        
       
      </ul>
      <form className="d-flex">
       
        <button className="btn btn-outline-warning " type="submit"><Link className="btn-primary text-white decoration-transparent" href="/api/auth/signout">Sign Out</Link></button>
      </form>
    </div>
  </div>
</nav>
    )
}