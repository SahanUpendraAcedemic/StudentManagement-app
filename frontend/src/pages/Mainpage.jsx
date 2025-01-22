import React from 'react'
import { Link } from 'react-router-dom'

export default function Mainpage() {
  return (
    <div className="bg-[url('bg-1.jpg')] bg-cover bg-center w-screen h-screen">
      <div className="h-screen flex items-center justify-center flex-col">
      <h1 className='text-5xl font-semibold text-center drop-shadow'>Ultimate Student Management System</h1>
        <div className='flex flex-row space-x-4 py-5'>  
           <Link to={'/signup'} className='rounded-lg bg-white text-black p-2 px-5 border border-black hover:bg-primary hover:border hover:border-white hover:text-white'>Sign Up</Link>
        </div>
      </div>
    </div>
  )
}
