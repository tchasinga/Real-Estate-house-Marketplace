import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Header = () => {
  const currentUser = useSelector((state) => state.user && state.user.user.currentUser);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();





  // SUBMITING A FORM TO THE SERVER TO SEACHING DATA AND FILTER THEM
   const handlerSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const seachQuery = urlParams.toString();
    navigate(`/search?${seachQuery}`);
  }

  useEffect(() =>{
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl);
    }
  }, [])

  return (
    <header className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap cursor-pointer">
            <span className="text-slate-500">Land</span>
            <span className="text-slate-800">Estate</span>
          </h1>
        </Link>
        <form
          action=""
          className="bg-slate-100 p-3 rounded-lg flex items-center"
          onSubmit={handlerSubmit}
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="text-slate-500">
            <FaSearch />
          </button>
        </form>
        <ul className="flex gap-3 cursor-pointer">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700">Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img src={currentUser.avatar} alt="avatar" className="w-7 h-7 rounded-full object-cover" />
            ) : (
              <li>Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
