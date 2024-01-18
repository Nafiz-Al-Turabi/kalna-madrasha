import React, { useState } from 'react';
import DeleteModal from '../Modal/DeleteModal/DeleteModal';
import axiosInstance from '../../Global/Axios/AxiosInstance';

const CampusImageCard = ({ campusData,onDelete }) => {
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

            await axiosInstance.delete(`/campusimages/${campusData._id}`)
            onDelete(campusData._id)
        } catch (error) {
            console.error('Failed to delete campus image:', error);
        }
    }
    return (
        <div className='bg-white h-20'>
            <div className='relative'>
                <img
                    src={`http://localhost:5000/getimage?path=${campusData.imagePath}`}
                    alt=""
                    className='w-full h-full object-cover'
                    style={{ aspectRatio: '16/9' }} // You can adjust the aspect ratio as needed
                />
            </div>
            <button onClick={openModal} className='w-full bg-red-500 hover:bg-red-600 duration-300 text-white'>Delete</button>
            <DeleteModal isOpen={isModalOpen} closeModal={closeModal} handleDelete={handleDelete}></DeleteModal>
        </div>
    );
};

export default CampusImageCard;
