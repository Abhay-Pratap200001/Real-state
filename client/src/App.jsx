import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Importing the components/pages to be used in routing
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Signup from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";

function App() {
  return (

    // BrowserRouter enables routing in the app
    <BrowserRouter>
    <Header/>
      <Routes>  {/* Routes component holds all the individual Route definitions */}
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-listing" element={<CreateListing/>} />
        <Route path="/update-listing/:listingId" element={<UpdateListing/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
