import React, { useState } from 'react';
import axiosInstance from '../../Global/Axios/AxiosInstance';
import DeleteModal from '../Modal/DeleteModal/DeleteModal';

const EbookCard = ({ ebookData, onDelete }) => {
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

            await axiosInstance.delete(`/ebooks/${ebookData._id}`)
            onDelete(ebookData._id)
        } catch (error) {
            console.error('Failed to delete campus image:', error);
        }
    }
    return (
        <div className='bg-white h-56 rounded-md '>
            <div className='relative'>
                <img
                    src={`http://localhost:5000/getimage?path=${ebookData.imagePath}`}
                    alt=""
                    className='w-full h-full object-cover'
                    style={{ aspectRatio: '16/9' }}
                />
            </div>
            <h1 className='text-center mt-2'>{ebookData.book_name}</h1>
            <div className='flex justify-center'>
                <button onClick={openModal} className='px-5 w-32 mt-2 rounded-md bg-red-500 hover:bg-red-600 duration-300 text-white'>Delete</button>
            </div>
            <DeleteModal isOpen={isModalOpen} closeModal={closeModal} handleDelete={handleDelete}></DeleteModal>
        </div>
    );
};

export default EbookCard;