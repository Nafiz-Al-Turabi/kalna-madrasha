import React, { useState } from 'react';
const images = [
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/400',
    'https://via.placeholder.com/500',
    // Add more image URLs here
];
const LillahBoarding = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const openImageView = (index) => {
        setSelectedImageIndex(index);
    };

    const closeImageView = () => {
        setSelectedImageIndex(null);
    };

    const goToNextImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const goToPreviousImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };
    return (
        <div>
            <h1 className='text-3xl font-bold text-center pt-5 text-gray-700'>লিল্লাহ বোর্ডিং</h1>
            <div className="grid grid-cols-3 gap-4">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Image ${index}`}
                        className="cursor-pointer w-32"
                        onClick={() => openImageView(index)}
                    />
                ))}
                {selectedImageIndex !== null && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
                        <div className="max-w-full">
                            <img src={images[selectedImageIndex]} alt={`Selected Image ${selectedImageIndex}`} />
                            <div className="absolute top-1/2 left-0 flex justify-between w-full p-4">
                                <button className="text-white " onClick={goToPreviousImage}>
                                    Previous
                                </button>
                                <button className="text-white" onClick={goToNextImage}>
                                    Next
                                </button>
                                <button className="text-white" onClick={closeImageView}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LillahBoarding;