import React, { useState } from 'react';
import axiosInstance from '../../Global/Axios/AxiosInstance';
import DeleteModal from '../Modal/DeleteModal/DeleteModal';

const HeadlineCard = ({ headlineData, onDelete }) => {
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

            await axiosInstance.delete(`/headline/${headlineData._id}`)
            onDelete(headlineData._id)
        } catch (error) {
            console.error('Failed to delete headline:', error);
        }
    }
    return (
        <div className='bg-white p-1 rounded-md'>
            <div className='flex justify-between items-center gap-5'>
                <p className='text-xs text-justify text-gray-700'>{headlineData.headline}</p>
            </div>
                <button onClick={openModal} className='px-5 mt-2 rounded-md bg-red-500 hover:bg-red-600 duration-300 text-white'>Delete</button>
            <DeleteModal isOpen={isModalOpen} closeModal={closeModal} handleDelete={handleDelete}></DeleteModal>
        </div>
    );
};

export default HeadlineCard;