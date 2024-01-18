import React, { useState } from 'react';
import axiosInstance from '../../Global/Axios/AxiosInstance';
import DeleteModal from '../Modal/DeleteModal/DeleteModal';

const NewsCard = ({ newsData, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const truncatedDescription = newsData.description.split(' ').slice(0, 20).join(' ');

    const handleDelete = async () => {
        try {
            closeModal();
            await axiosInstance.delete(`/news/${newsData._id}`);
            onDelete(newsData._id);
        } catch (error) {
            console.error('Failed to delete News');
        }
    };

    return (
        <div className='overflow-hidden  bg-white p-2 '>
            <div className='relative space-y-2'>
                <img
                    src={`http://localhost:5000/getimage?path=${newsData.imagePath}`}
                    alt=""
                    className=' object-cover'
                    style={{ aspectRatio: '16/9' }}
                />
                <h1 className='text-lg font-bold'>{newsData.title}</h1>
                <p className='text-xs text-justify'>{truncatedDescription}</p>
            </div>
            <div className='flex justify-end '>
                <button className='px-5 bg-red-500 hover:bg-red-600 duration-300 text-white mt-3 rounded' onClick={openModal}>Delete</button>
            </div>
            <DeleteModal isOpen={isModalOpen} closeModal={closeModal} handleDelete={handleDelete}></DeleteModal>
        </div>
    );
};

export default NewsCard;
