import '../index.css';
import {Link} from 'react-router-dom';

export default function SignUp() {
  return (
    <div className='p-3  max-w-lg mx-auto'>
        <h1 className="text-3xl text-center font-semibold m-7">Sing-Up</h1>
        <form action="" className='flex flex-col gap-3'>
          <input type="text" placeholder='Username' className='border p-3 rounded-lg' id='username' />
          <input type="email" placeholder='Email' className='border p-3 rounded-lg' id='email' />
          <input type="password" placeholder='Password' className='border p-3 rounded-lg' id='password' />
          <button className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-60 disabled:opacity-75 p-3 font-medium'>Sing-up</button>
        </form>
        <div className='flex gap-2 mt-3 text-sm'>
          <p>Do you have an acoount?</p>
          <Link to='/login' className='text-blue-700 hover:opacity-60'>Login now</Link>
        </div>
    </div>
  )
}
