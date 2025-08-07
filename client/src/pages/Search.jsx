import { get } from "mongoose";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Listingitem from "../components/Listingitem";

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation(); 

  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  //step3
  //extract the current value of url and save and update the setsidebar with new value
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search); // make new obj to reas urlparam
    const searchTermFromUrl = urlParams.get("searchTerm"); //extarct all urlqueryparams value keep in variable
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    //step4
    //if new value exixt keep update it other wise keep it default before they are
    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      // if any these value is available in url update sidebarstate
      setSidebardata({
        searchTerm: searchTermFromUrl || "", // update the value in setsidebar  or set empty steing
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();

       if (data.length === 9) {
        setShowMore(true);
        setListings(data.slice(0, 8)); // only show first 8
      } else {
        setShowMore(false);
        setListings(data);
      }

      setLoading(false);
    };

    fetchListings();
  }, [location.search]);
  
  //step1
  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id }); //set data and save previous info in state
    }

    if (e.target.id === "searchTerm") {
      //if id is equal to search
      setSidebardata({ ...sidebardata, searchTerm: e.target.value }); //set data to setsidebar ans save pervious data and add new data in searchTerm
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      }); // if its bollena true or string true do it true or do false
    }

    if (e.target.id === "sort_order") {
      // if id is true do according to condition run this
      const sort = e.target.value.split("_")[0] || "created_at"; // if user select keep first part or show default

      const order = e.target.value.split("_")[1] || "desc"; // pick second part of index in ascending or show default descending

      setSidebardata({ ...sidebardata, sort, order }); // storing all data like sort regualrprice order ascending and store in setSidebardata
    }
  };

  //step2
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(); // adding all values into the urlparams
    urlParams.set("searchTerm", sidebardata.searchTerm); //set all current select values in url.params.set
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString(); // make all data to string
    navigate(`/search?${searchQuery}`); // navigate according to url
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length; // show how many index in screen
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search); // get current url from params
    urlParams.set("startIndex", startIndex); // add params startindex from where fetch data
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();

    if (data.length > 8) {
      // if data is less then 9 dont show button showmore
      setShowMore(false);
    }
    setListings([...listings, ...data]); // add previous listings to new listing
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7  border-b-2 md:border-r-2 md:min-h-screen">
        {" "}
        {/* {left side div} */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-20 ">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              {" "}
              {/* {Search section} */}
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            {" "}
            {/* {Check boxes} */}
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "all"}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "sale"}
              />{" "}
              {/*is equal*/}
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.offer}
              />{" "}
              {/* is true*/}
              <span>Offer</span>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <span>Parking</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* {sorting section} */}
            <label className="font-semibold">Sort:</label>

            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="border rounded-lg p-3"
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to hight</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>

          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            {/* {search button} */}
            Search
          </button>
        </form>
      </div>

      <div className="flex-1 mt-18">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing results:
        </h1>
        <div className="p-7 flex flex-wrap  gap-4">
          {!loading &&
            listings.length === 0 && ( //if no loading lsiting is 0 show this
              <p className="text-xl text-slate-600">No Lsiting Match</p>
            )}

          {loading && (
            <p className="text-xl text-slate-900 text-center w-full">
              Loading....
            </p> // if loading is true show Loading
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <Listingitem key={listing._id} listing={listing} /> //loading id false and listing is true map on it and send prop to listingitem
            ))}

          {showMore && ( //if show more is then show button
            <button
              onClick={onShowMoreClick}
              className="text-black hover:underline p-7 text-center w-full "
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
