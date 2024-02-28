import React, { useState } from 'react';
import pdf from '../../assets/pdf.png'
import DeleteModal from '../Modal/DeleteModal/DeleteModal';
import axiosInstance from '../../Global/Axios/AxiosInstance';

const SyllabusCard = ({ syllabus,onDelete }) => {
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

            await axiosInstance.delete(`/syllabuses/${syllabus._id}`)
            onDelete(syllabus._id)
        } catch (error) {
            console.error('Failed to delete syllabus:', error);
        }
    }
    return (
        <div className='bg-white h-20  p-2 rounded-md flex justify-between items-center  '>
            <div className=' flex items-center gap-5'>
                <img src={pdf} alt="" className='w-10' />
            <h1 className='text-lg text-gray-700 font-semibold'>{syllabus.syllabus_name}</h1>
            </div>
            <button  onClick={openModal} className='w-24 h-full rounded-md bg-red-500 hover:bg-red-600 duration-300 text-white'>Delete</button>
            <DeleteModal isOpen={isModalOpen} closeModal={closeModal} handleDelete={handleDelete}></DeleteModal>
        </div>
    );
};

export default SyllabusCard;