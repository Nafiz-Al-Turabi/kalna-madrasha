import React, { useState } from 'react';
import axiosInstance from '../../Global/Axios/AxiosInstance';
import DeleteModal from '../Modal/DeleteModal/DeleteModal';

const LillahBoardingCard = ({lillahImage, onDelete}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false)
    }
    const handleDelete = async () => {
        try {
            // Close the modal
            closeModal();

            await axiosInstance.delete(`/lillahBoardingimages/${lillahImage._id}`)
            onDelete(lillahImage._id)
        } catch (error) {
            console.error('Failed to delete lillah image:', error);
        }
    }
    return (
        <div className='bg-white rounded-full '>
            <div className='relative'>
                <img
                    src={`http://localhost:5000/getimage?path=${lillahImage.imagePath}`}
                    alt=""
                    className='w-full h-full object-cover'
                    style={{ aspectRatio: '16/25' }} // You can adjust the aspect ratio as needed
                />
            </div>
            <button onClick={openModal} className='w-full bg-red-500 hover:bg-red-600 duration-300 text-white'>Delete</button>
            <DeleteModal isOpen={isModalOpen} closeModal={closeModal} handleDelete={handleDelete}></DeleteModal>
        </div>
    );
};

export default LillahBoardingCard;