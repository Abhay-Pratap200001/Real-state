import React, {useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';// allow to acces route as a based of url
import { Swiper, SwiperSlide } from 'swiper/react'; // 1.main container of carousel, 2.repersent each slide
import SwiperCore from 'swiper';// engine of swiper work in back of swiper
import { Navigation } from 'swiper/modules';//allow previous arroe <- ->
import 'swiper/css/bundle';// allow all swiper default style
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa'

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false); // for copping url
  

  const params = useParams();
  useEffect(() => {
    const fetchListing = async () => { // function of fetching list details 
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`); // fetching list details as per list id
        const data = await res.json();

        if (data.success === false) { // if success false
          setError(true);
          setLoading(false);
          return;
        }

        setListing(data); // else set data into setlisting state
        setLoading(false);// do loading false
        setError(false);

      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  },
[params.listingId]);// run when some one enter this route or when url will changed

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>} {/* if loading show loading*/}

      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p> // if some wrong show somwwrong
      )}
      
      {listing && !loading && !error && (// 3 are false  opne image
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => ( // map all the images which is under the url
              <SwiperSlide key={url}>

                <div
                  className='h-[500px] '
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}>
             </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
             <FaShare
              className='text-slate-500'
               onClick={() => {
                navigator.clipboard.writeText(window.location.href); // copide 
                 setCopied(true);
                 setTimeout(() => {
                  setCopied(false);
                },2000); // set copide false after 2milisec
              }}/>
          </div>

          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
          
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
              {listing.name} - ${' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')// showing discount price
                : listing.regularPrice.toLocaleString('en-US')// showing regualr price
                } 
              {listing.type === 'rent' && ' / month'}    {/* show  if property is rented show mnth pernt or "" */}
            </p>

            <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {listing.address}    {/*showing address and logo*/}
            </p>

            <div className='flex gap-4'>
              <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}   {listing.type === 'rent' && ' / month'}  {/*if rent show rent or show for*/}
             </p>

              {listing.offer && (
                <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  ${+listing.regularPrice - +listing.discountPrice} {/*confirming pricer has to be number and finding how uch user save*/}
                </p>
              )}
            </div> 
    
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span> {/* Showing description*/} 
              {listing.description}
            </p>

            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {listing.bedrooms > 1 ? `${listing.bedrooms} beds ` : `${listing.bedrooms} bed `}{/*show beds if there is more then one or show bed*/}
              </li>

              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-lg' />
                {listing.bathrooms > 1 ? `${listing.bathrooms} baths ` : `${listing.bathrooms} bath `} {/*same as bed*/}
              </li>

              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg'/>
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>

              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
          </div>
        </div>         
      )}
    </main>
  )}
