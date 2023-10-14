import React from 'react'
import Link from 'next/link'
import bigLogo from '../../images/mgsense_big.png'
import Image from 'next/image'

export default function LoginScreen() {
    return (
        <div className="h-screen bg-bg flex flex-col text-white/90">
            <div className="m-auto bg-bg-700 px-4 md:px-10 py-20 md:rounded-3xl w-full md:w-fit flex flex-col" style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', height: '80vh'}}>
            <Image src={bigLogo} width={0} height={0} style={{width: '40vh', height: '40vh'}} />
        
                <Link className="btn btn-danger border-t-orange-600" style={{width: '40vh', padding: '10px', backgroundColor: '#dd7722'}} href="/api/auth/signin">Sign In</Link>
            </div>
        </div>
    )
}