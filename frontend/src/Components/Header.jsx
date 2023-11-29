import { FaSearch } from 'react-icons/fa';
import {Link} from 'react-router-dom'

export default function Header() {
  return (
   <header className="bg-slate-200 ">
    <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
     <Link to="/">
      <h1 className="font-bold text-sm sm:text-xl flex flex-wrap cursor-pointer">
             <span className="text-slate-500">Land</span>
             <span className="text-slate-800">Estate</span>
        </h1>
     </Link>
        <form action="" className="bg-slate-100 p-3 rounded-lg flex items-center">
                <input type="text" placeholder="Search..." className="bg-transparent focus:outline-none w-24 sm:w-64"/>
                <FaSearch className="text-slate-700"/>
        </form>
        <ul className='flex gap-3 cursor-pointer'>
            <li className='hidden sm:inline text-slate-700'>Home</li>
            <li>About</li>
            <li>Sign in</li>
        </ul>
    </div>
   </header>
  )
}
