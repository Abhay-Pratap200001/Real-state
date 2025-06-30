import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md">{/* // Header container with background and shadow */}
       <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
       <Link to='/'>   {/* Making logo clickeable to redirect home */}
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            {/*website logitems */}
            <span className='text-slate-500'>Sahand</span>
            <span className='text-slate-700'>Estate</span>
          </h1>
        </Link>
        
        <form className="bg-slate-100 p-3 rounded-lg flex items-center"> {/* Search bar input */}
          <input
            type="text"
            placeholder="serch...."
            className="bg-transparent focus:outline-none w-24 sm:w-64"/>
          {/* react icon Fasearch - search igon of input */}
            <FaSearch className='text-slate-600' />
        </form>

        {/* Making all component clickable to redirect there page */}
          <ul className="flex gap-4">
                  <Link to='/'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              Home
            </li>
          </Link>

          <Link to='/about'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              About
            </li>
          </Link>

          <Link to='/sing-in'>
          <li className=" text-slate-700 hover:underline">Sign in</li>
          </Link>

       </ul>
      </div>
    </header>
  );
}
