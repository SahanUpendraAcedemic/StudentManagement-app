import React from 'react'

export default function SignIn() {

  return (
    <div>
      <div className='flex flex-row h-screen'>
        <img src='/log-1.jpg' alt='bg' className='object-cover h-screen w-1/2' />
        <form className='flex flex-col p-5 space-y-4 w-full items-center justify-center'>
          <h1 className='text-3xl font-bold'>Sign In</h1>
          <input className='rounded-lg border border-black p-2 focus:drop-shadow focus:scale-105' type='email' placeholder='Email' />
          <input className='rounded-lg border border-black p-2 focus:drop-shadow focus:scale-105' type='password' placeholder='Password' />
          <button className='rounded-lg bg-primary text-white p-2 px-5 border border-black hover:bg-white hover:border hover:border-black hover:text-black'>Log In</button>
          <p>Don't have an account? <a href='/signup' className='text-primary'>Sign Up</a></p>
        </form>      
      </div>
    </div>
  )
}
