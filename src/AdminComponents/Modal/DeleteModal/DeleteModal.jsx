import React from 'react';
import { FaRegWindowClose } from 'react-icons/fa';

const DeleteModal = ({ isOpen, closeModal, handleDelete }) => {
    return (
        <>
            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-red-800 bg-opacity-50 z-50">
                    <div className="admin bg-white p-8 rounded-lg">
                        <div  className='flex justify-center'>
                            <FaRegWindowClose className='text-6xl text-red-500'/>
                        </div>
                        <p className="mb-4 text-xl">Are you sure you want to delete this?</p>
                        <div className="flex justify-center">
                            <button
                                className="bg-gray-400 hover:bg-gray-500 text-white py-1 px-3 rounded-full focus:outline-none mr-2"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-full focus:outline-none "
                                onClick={handleDelete}
                            >
                                Ok
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteModal;
