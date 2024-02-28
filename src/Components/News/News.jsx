import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Global/Axios/AxiosInstance';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../../Provider/AuthProvider';

const News = () => {
    const [news, setNews] = useState([]);
    const {loading}=useAuth();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/news');
            const sortedNews = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setNews(sortedNews);
            console.log(sortedNews)
        } catch (error) {
            console.error('Failed to fetch news data', error);
        }
    };

    return (
        <div className='max-w-7xl mx-auto  my-10'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {
                    news.map(singleNews =>
                        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 duration-300">
                            <img className="w-full h-56 object-cover object-center" src={`http://localhost:5000/getimage?path=${singleNews.imagePath}`} alt="News Image" />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{singleNews.title}</h2>
                                <div className="mt-4 flex justify-between items-center">
                                    <p className='text-gray-400'>Date: {singleNews.date}</p>
                                    <Link to={`newsDetails/${singleNews._id}`} className="flex items-center text-blue-500">Read More <FaArrowRight className='ml-2 mt-1' /> </Link>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

        </div>
    );
};

export default News;