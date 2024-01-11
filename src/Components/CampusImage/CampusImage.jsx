// CampusImage.js
import React, { useEffect, useState } from 'react';
import ImageSlider from '../ImageSlider/ImageSlider';
import ImageViewer from '../ImageViewer/ImageViewer';

const images = [
  "https://i.ibb.co/zV1b9vg/kalna3.jpg",
  "https://i.ibb.co/ZSVcq1C/kalna2.jpg",
  "https://i.ibb.co/khPNY8R/kalna1.jpg"
  // Add more image URLs as needed
];

const CampusImage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showImageViewer, setShowImageViewer] = useState(false);

  useEffect(() => {
    let intervalId;

    if (!showImageViewer) {
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [showImageViewer]);

  const handleImageClick = () => {
    setShowImageViewer(true);
  };

  const closeImageViewer = () => {
    setShowImageViewer(false);
  };

  const handleNextImage = () => {
    // Change to the next image when the "Next" button is clicked
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="">
      <ImageSlider
        images={images}
        currentIndex={currentIndex}
        onImageClick={handleImageClick}
      />

      {showImageViewer && (
        <ImageViewer
          imageUrl={images[currentIndex]}
          onNext={handleNextImage}
          onClose={closeImageViewer}
        />
      )}
    </div>
  );
};

export default CampusImage;
