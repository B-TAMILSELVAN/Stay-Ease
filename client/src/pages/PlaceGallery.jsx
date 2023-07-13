import { useState } from "react";

export default function PlaceGallery({place}){
  const [showallPhotos, setShowAllPhotos] = useState(false);
  
  if (showallPhotos) { 
    return (
      <div className="bg-black text-white absolute inset-0 bg-white  min-h-screen">
        <div className="bg-black p-8 grid gap-4 ">
          <div>
            <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
            <button
              onClick={() => {
                setShowAllPhotos(false);
              }}
              className="bg-white text-black flex gap-1 py-2 px-4 rounded-2xl fixed shadow-black right-12 top-8"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              Close Photos
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div>
                <img src={"http://localhost:4000/uploads/" + photo} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }
  return(
    <div className="relative">
    <div className="grid gap-2 grid-cols-[2fr_1fr]  rounded-3xl overflow-hidden">
      <div>
        {place.photos?.[0] && (
          <div>
            <img onClick={()=>setShowAllPhotos(true)}
              className="aspect-square object-cover cursor-pointer"
              src={"http://localhost:4000/uploads/" + place.photos[0]}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="grid ">
        {place.photos?.[1] && (
          <img onClick={()=>setShowAllPhotos(true)}
            className="aspect-square object-cover cursor-pointer"
            src={"http://localhost:4000/uploads/" + place.photos[1]}
            alt=""
          />
        )}
        <div className="overflow-hidden">
          {place.photos?.[2] && (
            <img onClick={()=>setShowAllPhotos(true)}
              className="aspect-square object-cover relative top-2 cursor-pointer"
              src={"http://localhost:4000/uploads/" + place.photos[2]}
              alt=""
            />
          )}
        </div>
      </div>
    </div>
    <button
      onClick={() => setShowAllPhotos(true)}
      className=" flex gap-1 bg-white rounded-2xl shadow-md shadow-gray-500  absolute bottom-2 right-2 py-2 px-4"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
          clipRule="evenodd"
        />
      </svg>
      Show more photos
    </button>
  </div>
  )
}