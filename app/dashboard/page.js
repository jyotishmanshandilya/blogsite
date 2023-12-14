'use client'
import React, { useState, useEffect } from 'react'

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const fetchData = async()=>{
        try {
            const response = await fetch('/api/dashboard');
            if(response.ok){
              const userData = await response.json();
              if(userData){
                  setUserInfo(userData);
              }
            }
        } catch (error) {
            console.log("Internal Server Error");
        }
    }
    fetchData();
  }, []);

  console.log(userInfo);

  if(!userInfo){
    return <p className='text-center'>Loading...</p>
  }

  return (
    <div className='p-24'>
       <h1 className='text-3xl font-bold mb-10'>Dashboard</h1>
       <div className='flex flex-col justify-center px-5 py-2 mb-10'>
            <h2 className='text-xl font-semibold mb-1'>Account Details</h2>
            <p>Username: {userInfo.username}</p>
            <p>Email: {userInfo.email}</p>
       </div>

       <div className='max-w-screen-lg mx-auto'>
          <h2 className='text-xl font-semibold px-5 mb-5'>User Blogs</h2>
          <div>
            {userInfo.blogs.map((blog)=>(
              <div key={blog.b_id} className='p-8 shadow-md mb-8'>
                <div className='mb-2 flex justify-between'>
                  <h3 className='text-lg font-semibold'>{blog.title}</h3>
                  <div>
                    {blog.published ? (
                      <p>Published</p>
                    ): (
                      <p>Unpublished</p>
                    )}
                  </div>
                </div>
                <p className='w-11/12'>{blog.content}</p>
              </div>
            ))}
          </div>
       </div>
    </div>
  )
}

export default UserInfo
