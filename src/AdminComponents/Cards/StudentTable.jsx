import React, { useState } from 'react';
import axiosInstance from '../../Global/Axios/AxiosInstance';
import DeleteModal from '../Modal/DeleteModal/DeleteModal';

const StudentTable = ({ studentData, onDelete }) => {
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

            await axiosInstance.delete(`/students/${studentData._id}`)
            onDelete(studentData._id)
        } catch (error) {
            console.error('Failed to delete student:', error);
        }
    }
    return (
        <tr>
            <td className="py-4 px-6"><img src={`http://localhost:5000/getimage?path=${studentData.imagePath}`} alt="Student Image" className="w-12 h-12 object-cover rounded-full" /></td>
            <td className="py-4 px-6">{studentData.name}</td>
            <td className="py-4 px-6">{studentData.class_name}</td>
            <td className="py-4 px-6">{studentData.roll}</td>
            <td className="py-4 px-6">{studentData.guardians_number}</td>
            <td className="py-4 px-6">
                <button onClick={openModal} className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-full focus:outline-none">Delete</button>
                <DeleteModal isOpen={isModalOpen} closeModal={closeModal} handleDelete={handleDelete}></DeleteModal>
            </td>
        </tr>
    );
};

export default StudentTable;