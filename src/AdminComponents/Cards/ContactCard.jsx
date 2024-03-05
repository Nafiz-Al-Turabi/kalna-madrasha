import React, { useState } from 'react';
import axiosInstance from '../../Global/Axios/AxiosInstance';
import DeleteModal from '../Modal/DeleteModal/DeleteModal';

const ContactCard = ({ contact,onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDelete = async () => {
        try {
            closeModal();
            await axiosInstance.delete(`/contacts/${contact._id}`);
            onDelete(contact._id);
        } catch (error) {
            console.error('Failed to delete contact');
        }
    };
    return (
        <div className="  p-3 bg-white shadow-lg rounded-lg">
            <div className="flex justify-between items-center ">
                <div>
                    <h2 className="text-xl text-gray-500 font-semibold">Message from: {contact.name}</h2>
                    <p className='text-gray-700'>Email: {contact.email}</p>
                    <p className='text-lg text-gray-700 font-bold'>Message:</p>
                    <p className='text-gray-800'>{contact.message}</p>
                </div>
                <button onClick={openModal} className="bg-orange-500 hover:bg-orange-600 duration-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Delete
                </button>
            </div>
            <DeleteModal isOpen={isModalOpen} closeModal={closeModal} handleDelete={handleDelete}></DeleteModal>
        </div>
    );
};

export default ContactCard;
