'use client'
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'

const UserInfo = () => {
  const router = useRouter();
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

  const publishData = async(e)=>{
    console.log("Publish blog id: ", e.target.id);
    const blog_id = parseInt(e.target.id, 10);
    try {
      const response = await fetch('/api/blogs/publish', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({blog_id}),
      });
      if(response.ok){
        alert('Blog has been published!');
        router.push('/');

      }
    } catch (error) {
      alert("Internal Server Error");
    }
  }

  const deleteData = async(e)=>{
    console.log("Delete blog id: ", e.target.id);
    const blog_id = parseInt(e.target.id, 10);
    try {
      const response = await fetch('/api/blogs/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({blog_id}),
      });
      if(response.ok){
        alert('Blog has been deleted!');
        router.push('/')
      }
    } catch (error) {
      alert("Internal Server Error");
    }
  }

  const editData = (e)=>{
    const blog_id = e.target.id;
    router.push(`/dashboard/edit-blog/${blog_id}`);
  }


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
                      <div className='flex flex-row gap-5'>
                        <p>Published</p>
                      </div>
                    ): (
                      <div className='flex flex-row gap-5'>
                        <p>Unpublished</p>
                        <button id={blog.b_id} onClick={publishData} className=' px-5 rounded bg-black text-white'>+</button>
                      </div>
                    )}
                  </div>
                </div>
                <p className='w-11/12'>{blog.content}</p>
                <div className='flex justify-end gap-5'>
                  <button id={blog.b_id} onClick={deleteData} className='border px-5 rounded text-gray'>Delete</button>
                  <button id={blog.b_id} onClick={editData} className='border px-5 rounded text-gray'>Edit</button>
                </div>
              </div>
            ))}
          </div>
       </div>
    </div>
  )
}

export default UserInfo
