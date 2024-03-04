import React, { useState, useEffect } from "react";
import axiosInstance from "../../Global/Axios/AxiosInstance";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";

const PhotoGallery = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullMode, setShowFullMode] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axiosInstance.get("/lillahBoardingimages");
        setImages(response.data); 
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleClose = () => {
    setShowFullMode(false);
  };

  const handleImageClick = (index) => {
    console.log("Clicked image index:", index);
    setCurrentIndex(index);
    console.log("Current index:", currentIndex);
    setShowFullMode(true);
    console.log("Show full mode:", showFullMode);
  };

  return (
    <div>
      <h1 className='text-3xl font-bold text-center mt-5 text-gray-700'>আমিনিয়া লিল্লাহ বোর্ডিং</h1>
      <p className="text-lg text-center my-5 max-w-5xl mx-auto">লিল্লাহ বোর্ডিং বিষয়টি উপমহাদেশের মাদ্রাসা শিক্ষা ব্যবস্থার সাথে সম্পর্কিত একটি আবাসিক হোস্টেলের ধারনা, যেটি স্থানীয় ইসলামি যাকাত ব্যবস্থা, মুসলিমদের দান, সদকা, ধনী ব্যক্তিদের সাহায্য-সহযোগিতার উপর নির্ভর করে প্রতিষ্ঠিত হয়েছে।</p>
      <div className="relative grid grid-cols-1 md:grid-cols-5 max-w-7xl mx-auto gap-6 mt-5 mb-20 ">
        {images.map((image, index) => (
          <img
            key={index}
            src={`http://localhost:5000/getimage?path=${image.imagePath}`}
            alt={`Image ${index + 1}`}
            className="cursor-pointer md:h-40 w-full "
            onClick={() => handleImageClick(index)}
          />
        ))}

        {showFullMode && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
            <div className="max-w-3xl">
              <img
                src={`http://localhost:5000/getimage?path=${images[currentIndex].imagePath}`}
                alt={`Image ${currentIndex + 1}`}
                className="max-w-full max-h-full"
              />
              <button
                className="absolute top-0 right-0 text-white p-2 bg-black"
                onClick={handleClose}
              >
                <AiOutlineClose />
              </button>
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white p-2 bg-black"
                onClick={handleNext}
              >
               <FaArrowRight />
              </button>
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white p-2 bg-black"
                onClick={handlePrev}
              >
                <FaArrowLeft />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;
