import React,{useState} from 'react'

export default function SignUp() {

  const [loading,setLoading] = useState(false);
  const [newUserData,setNewUserData] = useState(
    {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      rePassword: ''
    }
  );

  const handleSignUp = async (e) => {
    setLoading(true);
    e.preventDefault;
    setNewUserData({
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      password: e.target.password.value,
      rePassword: e.target.rePassword.value
    });
    sendUserData = await fetch('localhost:3000/user/signup',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUserData)
    });
    setLoading(false);
  };

  return (
    <div>
      <div className='flex flex-row h-screen'>
        <img src='/sign-1.jpg' alt='bg' className='object-cover h-screen w-1/2' />
        <form className='flex flex-col p-5 space-y-4 w-full items-center justify-center' onSubmit={handleSignUp}>
          <h1 className='text-3xl font-bold'>Sign Up</h1>
          <input className='rounded-lg border border-black p-2 focus:drop-shadow focus:scale-105' type='text' placeholder='First Name' name='firstName' />
          <input className='rounded-lg border border-black p-2 focus:drop-shadow focus:scale-105' type='text' placeholder='Last Name' name='lastName' />
          <input className='rounded-lg border border-black p-2 focus:drop-shadow focus:scale-105' type='email' placeholder='Email' name='email' />
          <input className='rounded-lg border border-black p-2 focus:drop-shadow focus:scale-105' type='password' placeholder='Password' name='password' />
          <input className='rounded-lg border border-black p-2 focus:drop-shadow focus:scale-105' type='password' placeholder='Confirm Password' name='rePassword' />
          <button className='rounded-lg bg-primary text-white p-2 px-5 border border-black hover:bg-white hover:border hover:border-black hover:text-black' onClick={()=>handleSignUp()}>{loading?'loading':'Sign Up'}</button>
          <p>Already have an account? <a href='/signin' className='text-primary'>Sign In</a></p>
        </form>      
      </div>
    </div>
  )
}
