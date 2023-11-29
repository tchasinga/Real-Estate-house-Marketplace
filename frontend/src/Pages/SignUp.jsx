import { useState } from 'react';
import '../index.css';
import {Link} from 'react-router-dom';

export default function SignUp() {

  const [formData, setFormData] = useState({})
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handlerSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }


  return (
    <div className='p-3  max-w-lg mx-auto'>
        <h1 className="text-3xl text-center font-semibold m-7">Sing-Up</h1>
        <form action="" className='flex flex-col gap-3'>
          <input type="text" placeholder='Username' className='border p-3 rounded-lg' id='username' onChange={handleChange}/>
          <input type="email" placeholder='Email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
          <input type="password" placeholder='Password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
          <button onSubmit={handlerSubmit} className='bg-gray-900 text-white rounded-lg uppercase hover:opacity-90  p-3 font-medium w-44'>Sing-up</button>
        </form>
        <div className='flex gap-2 mt-3 text-sm'>
          <p>Do you have an acoount?</p>
          <Link to='/sing-in' className='text-blue-700 hover:opacity-60'>Login now</Link>
        </div>
    </div>
  )
}
