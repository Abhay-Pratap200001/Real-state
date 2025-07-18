import React, { useState, useEffect } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Lottie from "lottie-react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  ////

  const [navSize, setnavSize] = useState("4rem");
  const [navColor, setnavColor] = useState("slate-100");
    const [showMobileMenu, setShowMobileMenu] = useState(false);


  const listenScrollEvent = () => {
    window.scrollY > 10 ? setnavColor("#c7d2fe") : setnavColor("#f2e8fe");
    window.scrollY > 10 ? setnavSize("6rem") : setnavSize("4rem");
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  /////
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search); // create new obj urlparam to and rap in urlsearchparams to perform crud oprsn
    urlParams.set("searchTerm", searchTerm); // save in url what user has written in search form
    const searchQuery = urlParams.toString(); // convert url to string for backend
    navigate(`/search?${searchQuery}`); // take to user according to search url
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search); // make new obj and extract url from urlsearch and allow to read
    const searchTermFromUrl = urlParams.get("searchTerm"); // extract value of search form from urlparams

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl); // if search term exist set in urlparam and update local components
    }
  }, [location.search]); // run when search term update

  return (
    <header
      style={{
        backgroundColor: navColor,
        height: navSize,
        transition: "all 1s",
      }}
      className="bg-slate-200 shadow-md fixed top-0 w-full z-10">
        
      {/* // Header container with background and shadow */}
      <div className="flex justify-between items-center max-w-6xl mx-auto px-4 py-2">
        <Link to="/">
          {" "}
          {/* Making logo clickeable to redirect home */}
          <h1 className="font-bold text-sm sm:text-2xl flex flex-wrap ">
            {/*website logitems */}
            <span className="text-slate-500 pt-1 cursor-pointer ">Nestora-Real</span>
            <span className="text-slate-700 pt-1 cursor-pointer ">Estate</span>
         <span className="pl-2">
           <lord-icon
             src="https://cdn.lordicon.com/dznelzdk.json"
             trigger="loop"
             state="loop-3d-roll"
             colors="primary:#4bb3fd,secondary:#f24c00,tertiary:#b26836,quaternary:#66d7ee,quinary:#646e78,senary:#242424">
              </lord-icon>
            </span> 
              </h1>
        </Link> 

        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-lg flex items-center" >
          {" "}
          {/* Search bar input */}
          <input
            type="text"
            placeholder="search...."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}/>
          <button>
            <FaSearch className="text-slate-600" />{" "}
            {/* react icon Fasearch - search igon of input */}
          </button>
        </form>

        {/* Making all component clickable to redirect there page */}
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>

          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>

          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"/>):(<li className=" text-slate-700 hover:underline"> Sign in</li>)}
          </Link>

            <Link to={"/contact-us"}>
          <li className="hidden sm:inline text-slate-700 hover:underline">
            Contact us
          </li>
        </Link>
        </ul>

 {/* Hamburger Menu Icon */}
        <div
          className="sm:hidden text-xl cursor-pointer"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Nav */}
      {showMobileMenu && (
        <div className="sm:hidden bg-slate-100 px-6 py-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-2 mb-4 rounded-md flex items-center"
          >
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <FaSearch className="text-slate-600" />
            </button>
          </form>
          <ul className="flex flex-col gap-4">
            <Link to="/" onClick={() => setShowMobileMenu(false)}>
              <li className="text-slate-700">Home</li>
            </Link>
            <Link to="/about" onClick={() => setShowMobileMenu(false)}>
              <li className="text-slate-700">About</li>
            </Link>
            <Link to="/contact-us" onClick={() => setShowMobileMenu(false)}>
              <li className="text-slate-700">Contact</li>
            </Link>
            <Link to="/profile" onClick={() => setShowMobileMenu(false)}>
              {currentUser ? (
                <img
                  className="rounded-full h-7 w-7 object-cover"
                  src={currentUser.avatar}
                  alt="profile"
                />
              ) : (
                <li className="text-slate-700">Sign In</li>
              )}
            </Link>
          </ul>
        </div>
      )}
    </header>
  );
}
