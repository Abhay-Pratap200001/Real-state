import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function About() {
   const [showContact, setShowContact] = useState(false); // state to toggle visibility

  const handleToggle = () => {
    setShowContact(!showContact); // toggle visibility
  };

  return (
    <div className="py-20 px-4 max-w-6xl mx-auto text-slate-700">
      {/* Main Heading */}
      <h1 className="text-3xl font-bold mb-4 text-slate-800">About Nestora Estate</h1>

      {/* Description */}
      <p className="mb-4">
        Nestora Estate is a leading real estate agency that specializes in helping clients buy, sell,
        and rent properties in the most desirable neighborhoods. Our team of experienced agents is
        dedicated to providing exceptional service and making the buying and selling process as
        smooth as possible.
      </p>

      <p className="mb-4">
        Our mission is to help our clients achieve their real estate goals by providing expert
        advice, personalized service, and a deep understanding of the local market. Whether you are
        looking to buy, sell, or rent a property, we are here to help you every step of the way.
      </p>

      <p className="mb-10">
        Our team of agents has a wealth of experience and knowledge in the real estate industry, and
        we are committed to providing the highest level of service to our clients. We believe that
        buying or selling a property should be an exciting and rewarding experience, and we are
        dedicated to making that a reality for each and every one of our clients.
      </p>

      {/* Key Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center mb-16">
        <div>
          <h2 className="text-3xl font-bold text-blue-700">1,200+</h2>
          <p className="text-sm">Properties Listed</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-blue-700">850+</h2>
          <p className="text-sm">Happy Clients</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-blue-700">10+</h2>
          <p className="text-sm">Years Experience</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-blue-700">24/7</h2>
          <p className="text-sm">Customer Support</p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">Why Choose Nestora Estate?</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Access to exclusive properties before they hit the market</li>
          <li>Experienced agents with deep local knowledge</li>
          <li>Transparent and hassle-free buying and selling process</li>
          <li>Strong network of mortgage and legal professionals</li>
          <li>Fully digital property tours and documentation</li>
        </ul>
      </div>

      {/* CTA Section */}
      <div className="mt-10 p-6 bg-blue-50 rounded-lg text-center shadow-md">
        <h3 className="text-xl font-semibold text-blue-800 mb-2">Ready to find your dream home?</h3>
        <p className="mb-4">
          Browse our latest listings or get in touch with our expert team today.
        </p>
        <Link
          to="/search"
          className="inline-block bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 transition"
        >
          View Listings
        </Link>
      </div>

       <div className='text-center pt-7'>
      <button
        onClick={handleToggle}
        className="cursor-pointer bg-green-400 px-4 py-2 rounded-md text-white font-semibold hover:bg-green-500 transition">
        Contact Us
      </button>
      {showContact && (
        <div className="mt-4 text-slate-700 space-y-1">
          <p className="text-blue-600 hover:cursor-pointer hover:underline">abhaypratap2638359@gmail.com</p>
          <p className="text-blue-600 hover:cursor-pointer hover:underline">+91 9935880302</p>
        </div>
      )}
    </div>
    </div>
  );
}

export default About;
