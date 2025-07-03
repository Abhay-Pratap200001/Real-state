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
        <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
