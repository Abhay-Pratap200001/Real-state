import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";  
import { app } from "../firebase"; // Import the Firebase app we configured
import { useDispatch } from "react-redux"; // Import the success action to update Redux state after login
import { SignInSuccess } from "../user/userSlice"; // For redirecting the user after login
import { useNavigate } from "react-router-dom";

export default function () {
  const dispatch = useDispatch(); // Get the dispatch function to update Redux store
  const navigate = useNavigate();
 const handleGoogleClick = async () => { // google signin fuction
    try {
      const provider = new GoogleAuthProvider(); // Create Google provider instance
      const auth = getAuth(app);  // Get auth instance using our Firebase app

      const result = await signInWithPopup(auth, provider); // Open Google Sign-In popup and wait for user to sign in

      const res = await fetch('/api/auth/google', { //sending data to backend 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // content type jsom backend understand json only
        },

        body: JSON.stringify({  // Send user info (name, email, photo) to backend
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json(); // Wait for backend response and convert it to JSON
      dispatch(SignInSuccess(data));
      navigate('/'); // Redirect user to home page after successful login
    } 
    
    catch (error) {
      console.log('could not sign in with google', error);
    }
  };

  
  return (

    <button  // Button to trigger Google login
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
      Continue with google{" "}
    </button>
  );
}


///3.25.28mn