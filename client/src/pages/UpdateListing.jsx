import React, { useEffect, useRef } from 'react';
import { useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`;
const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export default function CreateListing() { // creeate listing component
  const { currentUser } = useSelector((state) => state.user); // check current user
    const navigate = useNavigate();
    const params = useParams();

  const [files, setFiles] = useState([]);// for storing file which is choose by user to upload
  const [formData, setFormData] = useState({imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'ren ',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  }); // storing image url and other form data
  
  const [imageUploadError, setImageUploadError] = useState(false);// to show erro while upload error
  const [uploading, setUploading] = useState(false);// showing upload status
  const [error, setError] = useState(false); // to show error while uploading failed
  const [loading, setLoading] = useState(false);// show loading effect
  
  
  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`); // sending req to api to get single user listing  according to lsiting id
      const data = await res.json();
      if (data.success === false) {
        return;
      }
      setFormData(data);
    };
    fetchListing();
  },[]);
  


  const handleImageSubmit = (e) => {// uploading image function
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) { 
      setUploading(true);
      setImageUploadError(false); // checking img length has to be under 7 if yes then setUploading(true); || setImageUploadError(false);
    
      const promises = []; // to store all images upload promise
      for (let i = 0; i < files.length; i++) { // go to each image files that user selected 
        promises.push(storeImage(files[i])); // calling storeImage function to store file in cloudinary
      }

      Promise.all(promises)// to wait until all image uploads are completed, and then update the state with the image URLs.
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),//after promise completed  then update the state with the image URLs.
          });

          setImageUploadError(false);//if image uploaded successfully do error false
          setUploading(false);// then turn off uploading status
        })

        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');// if image upload failed show to user
          setUploading(false);// stop uploading status
        });

    } else {
      setImageUploadError('You can only upload 6 images per listing');// uploading length limitaion
      setUploading(false);
    }
  };

  const storeImage = async (file) => { // stroing image to cloudinary

  return new Promise((resolve, reject) => { // to selove success and failed response

    const xhr = new XMLHttpRequest();// crating new XMLHttpReques object to manually send http request

    const formData = new FormData();// Creates a formData object required to send files like img etc

    formData.append('file', file);//attach actual file with from data

    formData.append('upload_preset', CLOUDINARY_PRESET);// A Cloudinary configuration (which tells Cloudinary which account or folder to use)

    xhr.open('POST', CLOUDINARY_URL);// Prepares a POST request to the Cloudinary API endpoint.

    xhr.onload = () => { // run when imgupload request resolve or rejecr
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText); // convert server response from string to j.s object
        resolve(response.secure_url); // Cloudinary returns secure_url
      } else {
        reject(new Error('Cloudinary upload failed'));
      }
    };

    xhr.onerror = () => reject(new Error('XHR error during upload'));// for some issues its reject the promise
    xhr.send(formData);// final step and send the requestto cloudinary with img preset
  });
};


  const handleRemoveImage = (index) => {
    setFormData({
      ...formData, // keeping all previous data by spreading and only update imgurls
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),// removing image
    });
  };

  const handleChange = (e) =>{ // form data function
     if (e.target.id === 'sale' || e.target.id === 'rent') { // run when any only check box checked
      setFormData({ 
        ...formData, // store previous data and add new one
        type: e.target.id,
      });
    }

    if (
      e.target.id === 'parking' ||  e.target.id === 'furnished' || e.target.id === 'offer'){// run when these conditions get true
      setFormData({
        ...formData, 
        [e.target.id]: e.target.checked,
      });
    }

        if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea'){// run when these conditions get true
        setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
      return setError('You must upload at least one image');
    
       if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');

      setLoading(true);
      setError(false);
        const res = await fetch(`/api/listing/update/${params.listingId}`, { // sending request to backend to update
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
          body: JSON.stringify({
          ...formData,
          userRef:currentUser._id // tell which user is posting data
          }), //sending form data to backend  
        });
        const data = await res.json(); // accepting response which come from backend
      setLoading(false);
      if (data.success === false) { 
        setError(data.message);
      }
      navigate(`/listing/${data._id}`)// navigate user according to there id
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }



  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Update a Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}/>

          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
             onChange={handleChange}
            value={formData.description}/>



          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
             onChange={handleChange}
            value={formData.address}/>



          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" 
               onChange={handleChange}
               checked={formData.type === "sale"}/>
              <span>Sell</span>
            </div>


            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" 
               onChange={handleChange}
               checked={formData.type === "rent"}/>
              <span>Rent</span>
            </div>


            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5"
               onChange={handleChange}
               checked={formData.parking}/>
              <span>Parking spot</span>
            </div>


            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5"
               onChange={handleChange}
               checked={formData.furnished}/>
              <span>Furnished</span>
            </div>


            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5"
               onChange={handleChange}
               checked={formData.offer}/>
              <span>Offer</span>
            </div>
          </div>


          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                 onChange={handleChange}
               checked={formData.bedrooms}/>
              <p>Beds</p>
            </div>


            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                 onChange={handleChange}
               checked={formData.bathrooms}/>
                 <p>Baths</p>
             </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="200"
                max="200000"
                required
                className="p-3 border border-gray-300 rounded-lg"
               onChange={handleChange}
               checked={formData.regularPrice}/> 
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>


            {formData.offer && ( // if dicount price is checked only that moment show discount box
              <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                min="0"
                max="200000"
                required
                className="p-3 border border-gray-300 rounded-lg"
                 onChange={handleChange}
               checked={formData.discountPrice}/>
              <div className="flex flex-col items-center">
                <p>Discounted price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            )}
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple/>


             <button
              type='button'
              disabled={uploading}
              onClick={handleImageSubmit} //image submit button
              className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
            </div>
        
            <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>

          {formData.imageUrls.length > 0 &&  // image length has to be greater then 0
            formData.imageUrls.map((url, index) => ( // if img upload map all img 
              <div
                key={url}
                className='flex justify-between p-3 border items-center'>

                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'/>


                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}// with the images give a delet button
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'>
                  Delete
                </button>
              </div>
            ))}

          <button disabled={loading || uploading} className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                  {loading ? 'Updating...' : 'Update listing'} 
            </button>
                   {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>
    </main>
  );
}


