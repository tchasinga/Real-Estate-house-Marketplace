import { useState } from 'react';
import '../index.css';
import {Link} from 'react-router-dom';

export default function SignUp() {

  const [formData, setFormData] = useState({})
  const [ error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handlerSubmit = async (e) => {
    e.preventDefault()
   try {
      setLoading(true)
      const res = await fetch('http://localhost:4000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      console.log(data)
      if (data.success == false){
        setLoading(false)
        setError(data.message)
      }
      setLoading(false)
      } catch (error) {
        setLoading(false)
        setError(error.message)
      }
    }
   

  return (
    <div className='p-3  max-w-lg mx-auto'>
        <h1 className="text-3xl text-center font-semibold m-7">Sing-Up</h1>
        <form action="" onSubmit={handlerSubmit} className='flex flex-col gap-3'>
          <input type="text" placeholder='Username' className='border p-3 rounded-lg' id='username' onChange={handleChange}/>
          <input type="email" placeholder='Email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
          <input type="password" placeholder='Password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
          <button  disabled={loading} className='bg-gray-900 text-white rounded-lg uppercase hover:opacity-90  p-3 font-medium w-44'>{ loading ?'loading' : 'Sign Up'}</button>
        </form>
        <div className='flex gap-2 mt-3 text-sm'>
          <p>Do you have an acoount?</p>
          <Link to='/sing-in' className='text-blue-700 hover:opacity-60'>Login now</Link>
        </div>
        {error && <p className='text-red-500 text-center mt-3'>{error}</p>}
    </div>
  )
}
