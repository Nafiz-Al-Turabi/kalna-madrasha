import React from 'react';
import { CiSquarePlus } from 'react-icons/ci';

const AddNews = () => {
    return (
        <div className=" flex items-center justify-center">
            <form className="admin bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Add News</h2>
                <div className="relative border-dashed border-2 border-gray-300 bg-gray-50 rounded-md p-6 group mb-5">
                        <input
                            encType="multipart/form-data"
                            type="file"
                            name='image'
                            className="hidden"
                            id="fileInput"
                            // onChange={handleFileChange}
                        />
                        <label
                            htmlFor="fileInput"
                            className="cursor-pointer block text-gray-500 hover:text-gray-700 duration-300"
                        >
                            <div className="flex justify-center items-center">
                                <CiSquarePlus className='text-xl mr-2' />
                                <span>Choose a image file</span>
                            </div>
                        </label>
                        <p className="text-xs text-center text-gray-500 mt-2">PNG, JPG, GIF up to 5MB</p>

                        {/* {selectedFile && (
                            <div className="mt-4">
                                <span className="text-sm font-medium text-gray-700">
                                    Selected file:
                                </span>
                                <p className="text-sm text-gray-500">{selectedFile.name}</p>
                            </div>
                        )} */}
                    </div>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-semibold text-gray-600 mb-1">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="w-full px-4 py-2 text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded"
                        placeholder="Enter news title"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-semibold text-gray-600 mb-1">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        className="w-full px-4 py-2 text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded resize-none"
                        placeholder="Enter news description"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-semibold text-gray-600 mb-1">News Date</label>
                    <input
                        type="date"
                        id="title"
                        name="date"
                        className="w-full px-4 py-2 text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded"
                        placeholder="Enter news date"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#DAA520] text-white px-4 py-2 rounded-md hover:bg-[#DAC520] duration-300"
                >
                    Add News
                </button>
            </form>
        </div>
    );
};

export default AddNews;