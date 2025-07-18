import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className='mb-10  mt-15 border-t-2  border-gray-500'>
    <footer className=" text-black  ">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 pt-15">
        
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold text-gray">Nestora Real Estate</h2>
          <p className="mt-4 text-sm text-black">
            Helping you find your dream home with trust, transparency, and tailored solutions.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:underline">Home</li>
            <li className="hover:underline">AboutUs</li>
            <li className="hover:underline">Listing</li>
            <li className="hover:underline">ContactUs</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact</h3>
          <p className="text-sm text-black">Email: support@nestora.com</p>
          <p className="text-sm text-black">Phone: +91 98765 43210</p>
          <p className="text-sm text-black">Address: 123 Estate Lane, Delhi, India</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-lg">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-sm text-black mt-10 pt-4">
        © {new Date().getFullYear()} Nestora Real Estate. All rights reserved.
      </div>
    </footer>
    </div>
  );
}
