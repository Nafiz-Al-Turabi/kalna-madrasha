import React, { useState } from 'react';
import axiosInstance from '../../Global/Axios/AxiosInstance';
import DeleteModal from '../Modal/DeleteModal/DeleteModal';

const CommitteCard = ({committeData,onDelete}) => {
    const {_id,imagePath,name,designation,number}=committeData;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleDelete = async () => {
        try {
            // Close the modal
            closeModal();

            await axiosInstance.delete(`/committes/${_id}`)
            onDelete(_id)
        } catch (error) {
            console.error('Failed to delete committe member:', error);
        }
    }
    return (
        <div>
            <div className='h-32 flex bg-white rounded-lg shadow-lg overflow-hidden'>
                <div className='flex justify-center overflow-hidden'>
                    <img src={`http://localhost:5000/getimage?path=${imagePath}`} className='w-28 object-cover rounded-l-lg ' alt="" />
                </div>
                <div className='text-gray-700 p-2'>
                    <h1 className='text-xl font-bold'>{name}</h1>
                    <h2 className=' font-semibold text-[#DAA520]'>{designation}</h2>
                    <p className=' font-bold'>Phone: <span className='text-base text-gray-600'>{number}</span></p>
                    <button className='bg-green-500 text-white font-semibold px-5 py-1 mt-1 rounded-md hover:bg-green-600 duration-300 active:scale-95 mr-5'>Update</button>
                    <button onClick={openModal} className='bg-red-500 text-white font-semibold px-5 py-1 mt-1 rounded-md hover:bg-red-600 duration-300 active:scale-95 '>Delete</button>
                    <DeleteModal isOpen={isModalOpen} closeModal={closeModal} handleDelete={handleDelete}></DeleteModal>
                </div>
            </div>
        </div>
    );
};

export default CommitteCard;