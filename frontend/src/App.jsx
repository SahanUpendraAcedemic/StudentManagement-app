import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import {Outlet} from 'react-router-dom'

function App() {

  return (
    <>
      <Header /> 
      <main className='min-h-screen max-w-7xl mx-auto py-10'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
