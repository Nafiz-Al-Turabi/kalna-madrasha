import React from 'react';

const DeleteModal = ({ isOpen, closeModal, handleDelete }) => {
    return (
        <>
            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-red-800 bg-opacity-50">
                    <div className="admin bg-white p-8 rounded-lg">
                        <p className="mb-4 text-xl">Are you sure you want to delete this student?</p>
                        <div className="flex justify-end">
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-full focus:outline-none mr-2"
                                onClick={handleDelete}
                            >
                                Ok
                            </button>
                            <button
                                className="bg-gray-400 hover:bg-gray-500 text-white py-1 px-3 rounded-full focus:outline-none"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteModal;
