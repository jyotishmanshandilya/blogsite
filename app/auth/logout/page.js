'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

const page = () => {
    const router = useRouter();
    const [deleteButton, setDeleteButton] = useState(false);
    const [sessionSuccess, setSessionSuccess] = useState(false);

    // useEffect(() => {
    //   const fetchSession = async()=>{
    //     const response = await fetch('/api/session');
    //     if(response.ok) {
    //         const session = await response.json();
    //         if(session){
    //             setSessionSuccess(true);
    //         }
    //     }
    //     else{
    //         console.log("No response from api (internal server error)")
    //     }
    //   }
    //   fetchSession();
    // }, []);


    useEffect(() => {
        const fetchData = async(e)=>{
          try {
              const response = await fetch('/api/auth/logout');
              if(response.ok){
                  console.log('Successful deletion of session');
                  alert('Logged out successfully');
                  setDeleteButton(false);
                  router.push('/');
              }
              else{
                console.log('Failed to delete session');
              }
          } catch (error) {
            console.log('Successful deletion of session');
          }
    
      }
      
      if(deleteButton===true){
          fetchData();
      }
    }, [deleteButton, router]);


    const deleteSession = ()=>{
        // console.log('No session exists');
        // if(sessionSuccess){
        // }
        setDeleteButton(true);
    }
    

  return (
    <div className='text-center pt-24'>
      Are you sure you want to logout?
      <div className='flex flex-row justify-center mt-5'>
        <button onClick={deleteSession} className='px-4 py-2 rounded-md'>Yes</button>
        <Link href={'/'}>
            <button className='px-4 py-2 rounded-md bg-black text-white'>No</button>
        </Link>
      </div>
    </div>
  )
}

export default page
