import React, { useState } from 'react';
import pdfImage from '../../assets/pdf.png'
import axiosInstance from '../../Global/Axios/AxiosInstance';
import DeleteModal from '../Modal/DeleteModal/DeleteModal';

const ResultTable = ({ resultData, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false)
    };

    const { _id, title, class_name } = resultData;
    const handleDelete = async () => {
        try {
            closeModal();
            await axiosInstance.delete(`/results/${_id}`);
            onDelete(_id)
        } catch (error) {
            console.error('Delete incompleted:', error)
        }
    }
    return (
        <tr>
            <td className="py-4 px-6"><img src={pdfImage} alt="Student Image" className="w-12 h-12 object-cover " /></td>
            <td className="py-4 px-6">{title}</td>
            <td className="py-4 px-6">{class_name}</td>
            <td className="py-4 px-6">
                <button onClick={openModal} className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-full focus:outline-none">Delete</button>
                <DeleteModal isOpen={isModalOpen} closeModal={closeModal} handleDelete={handleDelete}></DeleteModal>
            </td>
        </tr>
    );
};

export default ResultTable;