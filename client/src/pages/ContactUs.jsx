import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
export default function ContactUs() {
  const [showMore, setShowMore] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast.success("Form has submitted 😊");
    setFormData({ name: '', email: '', contact: '' });
    
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-50">
    <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Contact Us</h1>

      <p className="text-gray-700 text-xl ">
       At Nestora Real Estate, we are committed to helping you find your perfect home or investment property with confidence and ease. Whether you are looking to buy, sell, or rent, our dedicated support team is always ready to assist you with personalized solutions tailored to your needs. We understand the value of trust and transparency in real estate, which is why every query is treated with utmost care and confidentiality. Our experts are available to guide you through every step of the process, offering valuable insights, clear communication, and timely responses. From luxury villas to cozy apartments, your satisfaction is our top priority. Please don’t hesitate to reach out to us with any questions or requests regarding our listings, services, or partnership opportunities. We aim to build lasting relationships with our clients by providing a seamless, honest, and reliable experience. Thank you for considering Nestora Real Estate as your trusted property partner. We look forward to hearing from you and turning your real estate dreams into reality.

        {showMore && (
          <>
           Please don’t hesitate to reach out to us with any questions or requests regarding our listings, services, or partnership opportunities. We aim to build lasting relationships with our clients by providing a seamless, honest, and reliable experience. Thank you for considering Nestora Real Estate as your trusted property partner. We look forward to hearing from you and turning your real estate dreams into reality.
          </>
        )}
      </p>
    
      {!showMore && (
        <button
          onClick={() => setShowMore(true)}
          className="mb-6 px-4 bg-transparent text-blue-700 rounded hover:bg-blue-200 transition "
        >
          Show More
        </button>
      )}

      <div className="bg-pink-100 p-6 rounded-lg shadow-lg mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Send Us a Message</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"/>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
