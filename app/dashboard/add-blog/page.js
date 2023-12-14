'use client'
import { useEffect, useState } from "react";


// add provision to publish or save blogs, only published blogs should be visible to the general user


export default function addBlog(){

  const [cookie, setCookie] = useState();
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
  });


  useEffect(() => {
    const fetchSession = async()=>{
      const response = await fetch('/api/session');
      if(response.ok) {
          const session = await response.json();
          if(session){
              setCookie(session);
          }
      }
      else{
          console.log("No response from api (internal server error)")
      }
    }
    fetchSession();
  }, []);
  console.log(cookie);


  const handleChange = (e)=>{
    setBlogData({
      ...blogData,
      [e.target.name]: e.target.value,
    })
  }
  console.log(blogData);


  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const response = await fetch('/api/blogs/add-blog',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(blogData),
      });
      if(response.ok){
        alert('Blog saved successfully');
      }
    } catch (error) {
        alert('Internal Error');
    }
  }


  return (
    <form>
      <div className="space-y-12 max-w-4xl mx-auto m-24">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Add a blog</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Share you thoughts
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter title"
                    value={blogData.title}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
                Content
              </label>
                <p className="mt-3 text-sm leading-6 text-gray-600">Write down your thoughts...</p>
              <div className="mt-2">
                <textarea
                  id="content"
                  name="content"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={blogData.content}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        {/* <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button> */}
        <button
          type="button"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
      </div>
    </form>
  )
}
