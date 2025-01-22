import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='flex flex-row justify-between sticky top-0 p-5 bg-primary text-white rounded-b rounded-b-2xl shadow-md z-50'>
      <Link to={'/'}><h1 className='text-5xl'>Acedemia</h1></Link>
      <nav className=' justify-between space-x-4'>
        <ul className='flex flex-row space-x-4'>
          <Link to={'/signin'} className=' text-white p-2 px-5 hover:underline '>Login</Link>
          <Link to={'/signup'} className='rounded-lg bg-white text-black p-2 px-5 border border-black hover:bg-primary hover:border hover:border-white hover:text-white animate-pulse'>Sign Up</Link>
        </ul>
      </nav>
    </div>
  )
}
