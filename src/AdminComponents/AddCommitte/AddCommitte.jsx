import React, { useState } from 'react';
import { CiSquarePlus } from 'react-icons/ci';

const AddCommitte = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };
    return (
        <div>
            <div>
                <h1 className='text-3xl font-extrabold text-gray-700 text-center mb-5 uppercase'>Add Committee</h1>
            </div>
            <form action="" className='admin bg-white w-96 mx-auto p-4 shadow-xl rounded'>

                <div className='grid grid-cols-1 md:grid-cols-1 gap-5'>
                    <div className="relative border-dashed border-2 border-gray-300 bg-gray-50 rounded-md p-6 group">
                        <input
                            type="file"
                            className="hidden"
                            id="fileInput"
                            onChange={handleFileChange}
                        />
                        <label
                            htmlFor="fileInput"
                            className="cursor-pointer block text-gray-500 hover:text-gray-700 duration-300"
                        >
                            <div className="flex justify-center items-center">
                                <CiSquarePlus className='text-xl mr-2' />
                                <span>Choose a file</span>
                            </div>
                        </label>
                        <p className="text-xs text-center text-gray-500 mt-2">PNG, JPG, GIF up to 5MB</p>

                        {selectedFile && (
                            <div className="mt-4">
                                <span className="text-sm font-medium text-gray-700">
                                    Selected file:
                                </span>
                                <p className="text-sm text-gray-500">{selectedFile.name}</p>
                            </div>
                        )}
                    </div>
                    <div className='space-y-4'>
                        <div>
                            <input className='admin-input w-full text-xl text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded ' type="text" name='name' placeholder="Enter Committee Name" />
                        </div>

                        <div>
                            <input className='admin-input w-full text-xl text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded ' type="text" name='designation' placeholder="Enter  Designation" />
                        </div>
                        <div>
                            <input className='admin-input w-full text-xl text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded ' type="text" name='number' placeholder="Enter Phone  Number" />
                        </div>
                    </div>
                </div>
                <input className='text-lg font-semibold  text-white rounded bg-[#daa520] hover:bg-[#dab520] duration-300 active:scale-95 px-5 py-3 mt-5 uppercase cursor-pointer' type="submit" value="Add Committe" />
            </form>
        </div>
    );
};

export default AddCommitte;