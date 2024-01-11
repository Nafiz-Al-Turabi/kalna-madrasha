import React, { useEffect, useState } from 'react';
import './ImageSlider.css';

const ImageSlider = ({ images, currentIndex, onImageClick }) => {
    const [notices, setNotices] = useState([]);
    const [activeCategory, setActiveCategory] = useState('all');

    useEffect(() => {
        fetch('notice.json')
            .then(ress => ress.json())
            .then(data => setNotices(data))
    }, []);

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
    };

    // Sort notices by date in descending order
    const sortedNotices = [...notices].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="max-w-7xl mx-auto md:flex gap-6 ">
            <div className="relative lg:w-2/3 h-[400px] border-2 overflow-hidden">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Image ${index + 1}`}
                        className={`absolute w-full h-full object-cover ${index === currentIndex ? 'opacity-100 duration-500' : 'opacity-0 duration-500'
                            } transition-opacity duration-500 cursor-pointer`}
                        onClick={onImageClick}
                    />
                ))}
            </div>
            <div className="flex flex-col ml-4 ">
                <h1 className="text-[#DAA520] text-2xl font-bold mb-4">নোটিশ বোর্ড</h1>
                <div className="flex mt-2 space-x-4">
                    {['all', 'দাখিল','আলিম', 'ফাজিল'].map((category) => (
                        <button
                            key={category}
                            className={`text-gray-700 px-4 py-2 focus:outline-none transition duration-300 ${activeCategory === category
                                    ? 'bg-green-500 text-white'
                                    : 'border '
                                }`}
                            onClick={() => handleCategoryChange(category)}
                        >
                            {category === 'all' ? 'All' : category.toUpperCase()}
                        </button>
                    ))}
                </div>
                <div className="mt-4 custom-scrollbar h-72 w-full">
                    {sortedNotices
                        .filter(
                            (notice) => activeCategory === 'all' || notice.category === activeCategory
                        )
                        .map((notice) => (
                            <div key={notice.id} className="p-4">
                                <div className='flex items-center gap-5'>
                                    <div>
                                        <p className='bg-yellow-500 p-2 font-semibold text-white'>{notice.date}</p>
                                    </div>
                                    <div>
                                        <h3 className="">{notice.title}</h3>
                                        <button className='text-xs text-green-500'>নোটিশ দেখুন</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ImageSlider;
