import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Global/Axios/AxiosInstance';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CampusImage = () => {
  const [campusImages, setCampusImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDataCampusImage();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % campusImages.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [campusImages]);



  const fetchDataCampusImage = async () => {
    try {
      const response = await axiosInstance.get('/campusimages');
      setCampusImages(response.data);
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch Campus Images', error);
    }
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % campusImages.length);
  };

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + campusImages.length) % campusImages.length);
  };

  // 
  const [notices, setNotices] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/notices');
      setNotices(response.data);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  }

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };
  // Sort notices by date in descending order
  const sortedNotices = [...notices].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      {
        loading ?
          <div className="flex justify-center items-center h-screen md:h-96">
            <div class="w-16 h-16 border-8 border-dashed rounded-full animate-spin duration-1000 border-[#DAA520]"></div>
          </div>
          :
          <div className="max-w-7xl mx-auto  lg:flex">
            <div className="md:w-full ">
              <div style={{ position: 'relative' }}>
                {campusImages.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000/getimage?path=${encodeURIComponent(image.imagePath)}`}
                    alt={`Image ${index + 1}`}
                    className="campus-image"
                    style={{
                      width: '100%',
                      height: 'auto',
                      position: 'absolute',
                      opacity: index === currentImageIndex ? 1 : 0,
                      transition: 'opacity 0.5s ease-in-out',
                      zIndex: index === currentImageIndex ? 1 : 0,
                    }}
                  />
                ))}
                <button className="absolute bg-black/50 hover:bg-white/50 duration-300 py-5 px-1 left-0 top-24 lg:top-60 transform -translate-y-1/2 z-30" onClick={handlePrevClick}>
                  <FaArrowLeft className='text-2xl text-white' />
                </button>
                <button className="absolute bg-black/50 hover:bg-white/50 duration-300 py-5 px-1 right-0 top-24 lg:top-60 transform -translate-y-1/2 z-30" onClick={handleNextClick}>
                  <FaArrowRight className='text-2xl text-white' />
                </button>
              </div>
            </div>
            <div className="flex flex-col mx-4   pt-64 lg:pt-0">
              <h1 className="text-[#DAA520] text-center lg:text-left text-3xl md:text-2xl font-bold mb-4">নোটিশ বোর্ড</h1>
              <div className="grid grid-cols-3 text-xs  gap-2">
                {['all', 'ইবতেদায়ী', 'দাখিল', 'আলিম', 'ফাজিল', 'কামিল'].map((category) => (
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
              <div className="mt-4 custom-scrollbar h-[346px] w-96 lg:w-96 overflow-y-auto overflow-x-auto">
                {sortedNotices
                  .filter(
                    (notice) => activeCategory === 'all' || notice.category === activeCategory
                  )
                  .map((notice) => (
                    <div key={notice.id} className="py-4">
                      <div className='flex items-center gap-5'>
                        <div>
                          <p className='bg-yellow-500 p-2 w-28 font-semibold text-white'>{notice.date}</p>
                        </div>
                        <div>
                          <h3 className="">{notice.title}</h3>
                          <Link to={`/noticeDetails/${notice._id}`} className='text-xs text-green-500'>নোটিশ দেখুন</Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
      }
    </div>
  );
};

export default CampusImage;
