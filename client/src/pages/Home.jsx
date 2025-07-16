import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import Listingitem from "../components/Listingitem";
import { motion } from "framer-motion";

function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4"); //sending request with some limits
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings(); // run when  fetchOfferListings will clear and same for all
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div className="">
      {/*top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <motion.h1
          className="text-slate-700 font-bold text-3xl lg:text-6xl cursor-pointer"
          initial={{ opacity: 0, y: 40 }} // Start invisible and moved down
          whileInView={{ opacity: 1, y: 0 }}  // Become visible and slide up on scroll into view
          whileHover={{ scale: 1.05, color: "#000" }} // Grows and changes color when hovered
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}>
          Find your next <span className="text-slate-500">perfect</span>
          <br />
          place with ease
        </motion.h1>

        <motion.div
          className="text-gray-600 text-lg sm:text-sm"
          initial={{ opacity: 0, y: 40 }} // Start invisible and moved down
          whileInView={{ opacity: 1, y: 0 }}  // Become visible and slide up on scroll into view
          whileHover={{ scale: 1.05, color: "#000" }} // Grows and changes color when hovered
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}>
          Sahand Estate is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ x: 5, scale: 1.05 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
          viewport={{ once: true }}>

          <Link
            to={"/search"}
            className="text-xs sm:text-sm text-blue-800 font-bold hover:underline">
            Let's get started...
          </Link>
        </motion.div>
      </div>

  <Swiper navigation>
  {offerListings &&
    offerListings.length > 0 &&
    offerListings.map((listing) => (
      <SwiperSlide key={listing._id}>
    <div
       className="w-full h-[300px] sm:h-[400px] md:h-[500px]"
          style={{
          background: `url(${listing.imageUrls[0]}) center center / cover no-repeat`,
          }}
        />
      </SwiperSlide>
    ))}
</Swiper>

      {/* listing resutly */}
      <div className="min-w-6xl mx-auto p-3 flex flex-col items-center iy gap-8 my-10 ">
        {offerListings &&
          offerListings.length > 0 && ( // if there is offerlisting and length is greater then 0 run
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}>

              <motion.div
                className="my-3"
                whileHover={{ scale: 1.02, color: "#1e40af" }}
                transition={{ type: "spring", stiffness: 300 }}>

                <h2 className="text-2xl font-semibold text-slate-600">
                  Recent offers
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"/search?offer=true"}>
                  Show more offers
                </Link>
              </motion.div>
              <div className="flex flex-wrap gap-4">
                {offerListings.map((listing) => (
                  <Listingitem listing={listing} key={listing._id} />
                ))}
              </div>
            </motion.div>
          )}

        {rentListings && rentListings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>

            <motion.div
              className="my-3"
              whileHover={{ scale: 1.02, color: "#334155" }}
              transition={{ type: "spring", stiffness: 300 }}>

              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}>
                Show more places for rent
              </Link>
            </motion.div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <Listingitem listing={listing} key={listing._id} />
              ))}
            </div>
          </motion.div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}>
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <Listingitem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
         )}
      </div>
    </div>
  );
}

export default Home;



