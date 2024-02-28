import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../Global/Axios/AxiosInstance';

const NewsDetails = () => {
    const { id } = useParams();
    const [news, setNews] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`/newsDetails/${id}`);
            setNews(response.data);
            setLoading(false)
            console.log(response.data)
        } catch (error) {
            console.error('Failed to fetch news data', error);
        }
    };
    console.log('Loading state:', loading);


    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div class="w-16 h-16 border-8 border-dashed rounded-full animate-spin duration-1000 border-[#DAA520]"></div>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto bg-white  overflow-hidden">
                    <div className="p-6">
                        <div className='md:flex justify-between items-center'>
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">{news.title}</h2>
                            <h2 className="text-xl hidden md:block font-semibold text-gray-700 mb-4">{news.date}</h2>
                        </div>
                        <p className="text-gray-600 mb-4 text-justify">{news.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsDetails;
