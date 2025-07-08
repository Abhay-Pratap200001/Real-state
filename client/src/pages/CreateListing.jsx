import React from 'react';
import { useState } from 'react';
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`;
const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export default function CreateListing() { // creeate listing component
  const [files, setFiles] = useState([]);// for storing file which is choose by user to upload
  const [formData, setFormData] = useState({imageUrls: [],}); // storing image url and other form data
   
  const [imageUploadError, setImageUploadError] = useState(false);// to show erro while upload error
  const [uploading, setUploading] = useState(false);// showing upload status

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
    formData.append('upload_preset', CLOUDINARY_PRESET); // senfing preset configuration with image upload request
    xhr.open('POST', CLOUDINARY_URL);//opening the cloudinary api using post

    // xhr.upload.addEventListener('progress', (event) => {
    //   if (event.lengthComputable) {
    //     const percent = (event.loaded / event.total) * 100;
    //     console.log(`Upload is ${Math.round(percent)}% done`);
    //   }
    // });

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

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required/>


          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required/>


          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required/>


          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>


            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>


            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking spot</span>
            </div>


            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>


            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
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
                className="p-3 border border-gray-300 rounded-lg"/>


              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"/>


              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"/>


              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>


            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"/>


              <div className="flex flex-col items-center">
                <p>Discounted price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
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
              onClick={handleImageSubmit}
              className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
            </div>


         <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            Create Listing
          </button>
        
            <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>

          {formData.imageUrls.length > 0 &&
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

          {/* <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            Create Listing
          </button> */}

        </div>
      </form>
    </main>
  );
}


