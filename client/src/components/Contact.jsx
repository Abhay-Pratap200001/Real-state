import React,{ useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Contact({listing}) {
    const [landlord, setLandlord] = useState(null);// for string data we fetch
    const [message, setMessage] = useState('');
    const onChange = (e) => {
    setMessage(e.target.value);
};


  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`); //fetching user data
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  },[listing.userRef]) // run only ones or when listig change

  return (
    // contact to landlord section only unauthorized user can access
      <>
     {landlord && (
        <div className='flex flex-col gap-4 mt-6 w-full max-w-xl px-4 sm:px-0'>
          <p className="text-lg text-gray-700 leading-relaxed">
            <span className='font-extrabold'>Contact ➡️</span>
            <span className='font-semibold'>{landlord.username}</span> 
            for{' '}
            <span className='font-semibold'>{listing.name.toLowerCase()}</span>
          </p>

           <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='"w-full border border-gray-300 p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400'>
            </textarea>

        <Link  // sending to mail box to send mail to landlord
          to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
          className='bg-slate-700 text-white text-center p-3 rounded-lg uppercase font-semibold hover:opacity-95 transition'>
          Send Message          
        </Link>
         </div>
     )}
    </>
  )
}
