import React, { useState } from 'react';
import pdfImage from '../../assets/pdf.png';
import axiosInstance from '../../Global/Axios/AxiosInstance';
import DeleteModal from '../Modal/DeleteModal/DeleteModal';

const RoutineCard = ({ routineData, onDelete }) => {
    const [isModalOpen,setModalOpen]=useState(false);

    const openModal=()=>{
        setModalOpen(true);
    };
    const closeModal=()=>{
        setModalOpen(false);
    };

    const handleDelete=async()=>{
        try {
            closeModal();
            await axiosInstance.delete(`/routines/${routineData._id}`);
            onDelete(routineData._id)
        } catch (error) {
            console.error(error.message)
        }
    }
    return (
        <div className='flex justify-between items-center bg-white p-2 rounded-lg text-gray-700 overflow-hidden'>
            <div className='flex items-center gap-5'>
                <img src={pdfImage} alt="pdf" className='h-10' />
                <h1>{routineData.title}</h1>
            </div>

            <div >
                <button onClick={openModal} className=' bg-red-500 rounded-lg text-white hover:bg-red-600 duration-300 active:scale-95 px-5 py-1'>Delete</button>
                <DeleteModal isOpen={isModalOpen} closeModal={closeModal} handleDelete={handleDelete}></DeleteModal>
            </div>
        </div>
    );
};

export default RoutineCard;