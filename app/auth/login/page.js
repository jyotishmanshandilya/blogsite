'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {  
    const router = useRouter()
    const [userData, setUserData] = useState({
        username: '',
        password: '',
    })

    const handleChange = (e)=>{
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e)=>{
        // submit user data to server here.
        const response = await fetch('/api/auth/login',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if(response.ok){
            alert("Successful login");
            router.push('/')
        }
        else{
            alert("Login Failed");
        }
    }

    console.log(userData);
    
  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center w-72 mx-auto gap-5'>
        <div className='flex flex-col'>
            <label htmlFor="username">Name</label>
            <input
                type='text'
                name='username'
                value={userData.username}
                onChange={handleChange}
                className='border-3 '
            />
        </div>

        {/* <div className='flex flex-col'>
            <label htmlFor="email">Email</label>
            <input
                type='text'
                name='email'
                value={userData.email}
                onChange={handleChange}
            />
        </div> */}

        <div className='flex flex-col'>
            <label htmlFor="password">Password</label>
            <input
                type='password'
                name='password'
                value={userData.password}
                onChange={handleChange}
            />
        </div>
        <button type='button' onClick={handleSubmit}>Login</button>
        <div className='flex flex-row gap-3 justify-center'>
            <p>Don't have an account yet? </p>
            <Link href={`/auth/register`} className='underline'>Register</Link>
        </div>
      </form>
    </div>
  )
}

export default page
