'use client'
import Link from 'next/link';
import React, { useState } from 'react'
import { useEffect } from 'react';

const layout = ({children}) => {
    const [sessionSuccess, setSessionSuccess] = useState(false);
    useEffect(() => {
      const fetchSession = async()=>{
        const response = await fetch('/api/session');
        if(response.ok) {
            const session = await response.json();
            if(session){
                setSessionSuccess(true);
            }
        }
        else{
            console.log("No response from api (internal server error)")
        }
      }
      fetchSession();
    }, []);

    if (!sessionSuccess) {
        return (
            <div className='flex flex-row items-center gap-5 justify-center pt-24'>
                <p>To view</p>
                <Link href={`/auth/login`} className='px-5 py-2 outline rounded-full'>Click here</Link>
            </div>
        )
    }    

  return (
    <main>
        {children}
    </main>
  )
}

export default layout
