import React from 'react'

export default function SignUp() {
  return (
    <div>
      <div className='flex flex-row h-screen'>
        <img src='/sign-1.jpg' alt='bg' className='object-cover h-screen w-3/4' />
        <form className='flex flex-col p-5 space-y-4 w-full items-center justify-center'>
          <input className='rounded-lg border border-black p-2 focus:drop-shadow focus:scale-105' type='text' placeholder='First Name' />
          <input className='rounded-lg border border-black p-2 focus:drop-shadow focus:scale-105' type='text' placeholder='Last Name' />
          <input className='rounded-lg border border-black p-2 focus:drop-shadow focus:scale-105' type='email' placeholder='Email' />
          <input className='rounded-lg border border-black p-2 focus:drop-shadow focus:scale-105' type='password' placeholder='Password' />
          <input className='rounded-lg border border-black p-2 focus:drop-shadow focus:scale-105' type='password' placeholder='Confirm Password' />
          <button className='rounded-lg bg-primary text-white p-2 px-5 border border-black hover:bg-white hover:border hover:border-black hover:text-black'>Sign Up</button>
        </form>      
      </div>
    </div>
  )
}
