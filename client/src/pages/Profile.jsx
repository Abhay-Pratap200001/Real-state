import React from "react";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess, 
  signOutUserStart,//import inbuild state from user/slice
} from '../user/userSlice';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';//dispatch used to trigger Redux actions
import { useSelector } from "react-redux";//useselector used to read state from Redux store
import { useRef, useState } from "react";

export default function Profile() {
  const [formData, setFormData] = useState({})// to manage form fields inputs data
  const fileRef = useRef(null)//find currentUser avatr
  const { currentUser, loading, error } = useSelector((state) => state.user); //importing currentUser from user.slice for know the how is current user
  const [updateSuccess, setUpdateSuccess] = useState(false)//show update message
  const [showListingsError, setShowListingsError] = useState(false);// to track error while handleShowlisting
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();//config dispach
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});// copying oldform data and update only new inputs 
  }
  
 const handleSubmit = async (e) => { //form submit funtion 
    e.preventDefault();//stop to reload the page and submit from directly
    try {
      dispatch(updateUserStart()); // update the user
      const res = await fetch(`/api/user/update/${currentUser._id}`, {// sending data to backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // sending data to json from
        },
        body: JSON.stringify(formData), //coverting data to stingify so backend can read it
      });


      const data = await res.json();  //storing response which comes fron backend inti data
      if (data.success === false) { 
        dispatch(updateUserFailure(data.message));//  if data.success fails, show erro
        return;
      }
      dispatch(updateUserSuccess(data));//if passed, dispatch success with data
      setUpdateSuccess(true);

    } catch (error) {
      dispatch(updateUserFailure(error.message));// give error message
    }
  };

  const handleDeleteUser = async () => { // deleting user function
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {  //sending user to delete
        method: 'DELETE',// method is delete
      });
      const data = await res.json();  //storing resonpsw
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return; //if data.success fails, show erro
      }
      dispatch(deleteUserSuccess(data));  //if passed, dispatch success with data
    }
     catch (error) {
      dispatch(deleteUserFailure(error.message));// if some error then show
    }
  };

const handleSignOut = async () => {  //signout Functiom
    try {
      dispatch(signOutUserStart()); 
      const res = await fetch('/api/auth/signout'); // sending request to backend
      const data = await res.json(); //string res 
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message)); //if data.success fails, show erro
        return;
      }
      dispatch(deleteUserSuccess(data));  //if passed, dispatch success with data
    } catch (error) {
      dispatch(deleteUserFailure(data.message)); // if some error then show
    }
  };

   const handleShowListings = async () => { //showing listing functiom
    try {
      setShowListingsError(false); 
      const res = await fetch(`/api/user/listings/${currentUser._id}`);// sending req to backend with current user
      const data = await res.json(); //holding response 
      if (data.success === false) {
        setShowListingsError(true); // if any problem occur then give error
        return;
      }
      setUserListings(data) // storing response in setuserstata to show data in screen

    } catch (error) {
        setShowListingsError(true);
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="file" ref={fileRef}  hidden accept="'image/*"/>
        <img onClick={()=>fileRef.current.click()}
          src={currentUser.avatar} // adding profile according to currentuser 
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"/>

        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          id="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}/>

        <input
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
          id="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}/>

        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}/>

       <button
          disabled={loading} 
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Update'}  {/* if loading is true show update other wise keep it disable */}
        </button>

          <Link
          className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'
          to={'/create-listing'}
        >
          Create Listing
        </Link>
      </form>

        <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign out</span>
      </div>

      {/* Definig error */}
      <p className='text-center text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully! ✅' : ''}{/* if sucess show other wise show emplty */}
      </p>
      <button  onClick={handleShowListings} className='text-green-700 w-full'>Show listings</button>

       <p className='text-red-700 mt-5'>
        {showListingsError ? 'Error showing listings' : ''}
      </p>

        {userListings && // if userlist is then show this 
        userListings.length > 0 &&
        <div className="flex flex-col gap-4">
          <h1 className='text-center mt-7 text-2xl font-semibold'>Your Listings</h1>
          {userListings.map((listing) => ( // maping all listing
            <div key={listing._id} 
              className='border rounded-lg p-3 flex justify-between items-center gap-4'>

              <Link to={`/listing/${listing._id}`}> 
                <img
                  src={listing.imageUrls[0]} // show images according user id
                  alt='listing cover'
                  className='h-16 w-16 object-contain'/>
              </Link>

              <Link
                className='text-slate-700 font-semibold  hover:underline truncate flex-1'// show name according id
                to={`/listing/${listing._id}`}> 
                <p>{listing.name}</p> 
              </Link> 
  
              <div className='flex flex-col item-center'>
                <button className='text-red-700 uppercase'>Delete</button>
                <button className='text-green-700 uppercase'>Edit</button>
              </div>
            </div>
          ))}
        </div>}
      
    </div>
  );
}

