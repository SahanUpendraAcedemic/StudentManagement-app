import React from 'react'

export default function Header() {
  return (
    <div className='flex flex-row justify-between sticky top-0 p-10'>
      <h1 className='text-5xl'>Acedemia</h1>
      <nav className='flex justify-between space-x-4'>
        <ul className='flex flex-row space-x-4'>
          <button>Sign In</button>
          <button>Sign Up</button>
        </ul>
      </nav>
    </div>
  )
}
