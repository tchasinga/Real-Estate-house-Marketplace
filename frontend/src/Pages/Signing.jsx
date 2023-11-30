import { useState, } from 'react';
import '../index.css';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {signInStart, singInSuccess, signInFailure} from '../redux/user/userSlice.js'
import OAuth from '../Components/OAuth.jsx';

export default function SignIn() {
  const [formData, setFormData] = useState({})
  const {loading, error} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handlerSubmit = async (e) => {
    e.preventDefault()
   try {
    dispatch(signInStart())
      const res = await fetch('http://localhost:4000/api/auth/singin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.success == false){
       dispatch(signInFailure(data.message || "Failed to sign in. Please try again."))
        return;
      }
    dispatch(singInSuccess(data)) 
      navigate('/')
      } catch (error) {
        dispatch(signInFailure(error.message || "Failed to sign in. Please try again."))
      }
    }
   

  return (
    <div className='p-3  max-w-lg mx-auto'>
        <h1 className="text-3xl text-center font-semibold m-7">Sing-in</h1>
        <form action="" onSubmit={handlerSubmit} className='flex flex-col gap-2'>
          <input type="email" placeholder='Email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
          <input type="password" placeholder='Password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
          <button  disabled={loading} className='bg-gray-900 text-white rounded-lg uppercase hover:opacity-90  p-3 font-medium w-44'>{ loading ?'loading' : 'Sign-in'}</button>
          <OAuth />
        </form>
        <div className='flex gap-2 mt-3 text-sm'>
        <p>Create an account?</p>
          <Link to='/sign-up' className='text-blue-700 hover:opacity-60'>Sing-up</Link>
        </div>
        {error && <p className='text-red-500 text-center mt-3'>{error}</p>}
    </div>
  )
}
