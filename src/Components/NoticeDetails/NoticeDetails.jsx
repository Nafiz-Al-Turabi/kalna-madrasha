import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../Global/Axios/AxiosInstance';

const NoticeDetails = () => {
    const { id } = useParams(); // Assuming the parameter name is 'id'
    const [notice, setNotice] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`/noticeDtails/${id}`); // Fetch the notice by its ID
            setNotice(response.data);
        } catch (error) {
            console.error('Error fetching notice:', error);
        }
    };
    const { title, category, date, description } = notice;

    
  return (
    <div className="max-w-7xl mx-auto my-10 bg-white p-8 rounded-lg shadow-lg border-t border-gray-200">
      <h2 className="text-2xl md:text-4xl text-gray-700 font-bold mb-6">{title}</h2>
      <div className="flex justify-between items-center mb-4">
        <span className="text-xl font-bold text-[#DAA520]">{category}</span>
        <span className='text-xl font-bold text-gray-600'>Published: {date}</span>
      </div>
      <p className="text-gray-800 mb-8 text-justify">{description}</p>
      <hr className="border-t border-gray-200 mb-8" />
      <div className=" text-sm text-gray-500">
        <div>Author: Kalna Madrasha Admin</div>
      </div>
    </div>
  );
};

export default NoticeDetails;
