import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; //dispatch used to trigger Redux actions, useselector used to read state from Redux store
import { SignInStart, SignInSuccess, SignInFaliure } from "../user/userSlice";
import OAuth from "../components/OAuth";
import toast, { Toaster } from 'react-hot-toast';


export default function SignIn() {
  const [formData, setFormData] = useState({}); //state for store form input field data
  const { loading, error } = useSelector((state) => state.user);// impoeting from usersilce.js
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => { //function for inputs fields
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {  //function for submmit form
    e.preventDefault();
      toast.loading("Signing in...");


    try {
      dispatch(SignInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(SignInFaliure(data.message)); //if error occur its send from backend
        toast.dismiss(); 
        toast.error(data.message || "Sign in failed");
        return;
      }

    dispatch(SignInSuccess(data)); 
    toast.dismiss(); // remove the loading toast
    toast.success("Signed in successfully 😊");
     setTimeout(() => {
      navigate("/");
    }, 1500);
    } catch (error) {
      dispatch(SignInFaliure(error.message));
       toast.dismiss();
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-3xl text-center font-semibold mt-60 mb-10">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg focus:outline-none"
          id="email"
          onChange={handleChange}/>

        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg focus:outline-none"
          id="password"
          onChange={handleChange}/>

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading..." : "Sign In"}
        </button> 
        <OAuth/>  {/* adding google button */}
      </form>
      
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
