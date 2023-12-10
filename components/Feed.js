'use client'
import React from 'react';
import { useEffect, useState } from 'react';

export default function Feed() {
   const [allBlogs, setAllBlogs] = useState([]);
    useEffect(() => {
      async function fetchData() {
         try{
            const response = await fetch('/api/blogs');
            if(response.ok){
               const allBlogData = await response.json();
               setAllBlogs(allBlogData);
            }
            else{
               console.log("Failed to fetch blogs");
            }
         }
         catch(err){
            console.log(err);
         }
      }
      fetchData();
    }, [])

    if(!allBlogs){
      return <p>Loading...</p>
    }
    
    console.log(allBlogs);

 return (
    <div>
      <h1 className='text-2xl font-extrabold p-10'>Blog Feed</h1>
      <div>
         {allBlogs.map((blog)=>(
            <div key={blog.b_id} className='p-8 shadow-md my-8'>
               <h3 className='text-lg font-semibold mb-5'>{blog.title}</h3>
               <p>{blog.content}</p>
            </div>
         ))}
      </div>
    </div>
 );
}