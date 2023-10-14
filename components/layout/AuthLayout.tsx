'use client'
import React, { useEffect } from 'react'
import Head from 'next/head'
import MenuBar from './MenuBar'
import LoginScreen from '../Auth/LoginScreen'

import { useSession } from "next-auth/react"
import SpinnerLoading from '../SpinnerLoading'

export default function AuthLayout({ children, title
}: {
    children: React.ReactNode,
    title: string
}) {
    const { data: session, status } = useSession();

    let titleConcat = "nLetter";
    if (title) titleConcat += " | " + title;

    if (status === 'loading') return ( <SpinnerLoading /> );
    else {
        if (session) {
            return (
                <>
                    <Head>
                        <title>{titleConcat}</title>
                    </Head>
                    <main className="h-screen bg-bg text-white/90">
                        <header className="mb-10">
                            <MenuBar session={session} />
                        </header>
                        <div className="flex flex-col">
                            {children}
                        </div>
                    </main>
                </>
            )
        } else {
            return (
            <LoginScreen />
            )
        }
    }
}