import React, {useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';// allow to acces route as a based of url
import { Swiper, SwiperSlide } from 'swiper/react'; // 1.main container of carousel, 2.repersent each slide
import SwiperCore from 'swiper';// engine of swiper work in back of swiper
import { Navigation } from 'swiper/modules';//allow previous arroe <- ->
import 'swiper/css/bundle';// allow all swiper default style

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
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
  }, [params.listingId]);// run when some one enter this route or when url will changed
  console.log(loading);

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
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
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </main>
  );
}
