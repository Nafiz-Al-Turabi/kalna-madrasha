import React, { useState } from 'react';
import axiosInstance from '../../Global/Axios/AxiosInstance';
import { CiSquarePlus } from "react-icons/ci";

const AddStudent = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };
    const handleAddStudent = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const class_name = form.class_name.value;
        const roll = parseInt(form.roll.value, 10);
        const rawGuardiansNumber = form.number.value;
        const guardians_number = `+88${rawGuardiansNumber.replace(/\D/g, '')}`;

        try {
            // Upload image to imgBB
            const imgBBApiKey = 'db2fb6a976b720d2a464ebe2917eb735';
            const imgFormData = new FormData();
            imgFormData.append('image', selectedFile);

            const imgBBResponse = await fetch('https://api.imgbb.com/1/upload?key=' + imgBBApiKey, {
                method: 'POST',
                body: imgFormData,
            });

            const imgBBData = await imgBBResponse.json();
            const imageUrl = imgBBData.data.url;

            // Store student data in the database
            const student = { name, class_name, roll, guardians_number, imageUrl };

            const response = await axiosInstance.post('/poststudent', student);
            console.log(response.data);
            event.target.reset();
        } catch (error) {
            console.error('Error adding student:', error);
        }
    };
    return (
        <div>
            <div>
                <h1 className='text-3xl font-extrabold text-gray-700 text-center mb-5 uppercase'>Add Student</h1>
            </div>
            <form onSubmit={handleAddStudent} action="" className='admin bg-white w-96 mx-auto p-4 shadow-xl rounded'>

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
                            <input className='admin-input w-full text-xl text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded ' type="text" name='name' placeholder="Enter Student's Name" />
                        </div>
                        <div>
                            <select
                                id="classSelect"
                                name="class_name"
                                className='admin-input w-full text-xl text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded'
                            >
                                <option value="" disabled selected>Select class</option>
                                <option value="One">Class One</option>
                                <option value="Two">Class Two</option>
                                <option value="Three">Class Three</option>
                                <option value="Four">Class Four</option>
                                <option value="Five">Class Five </option>
                                <option value="Six">Class Six</option>
                                <option value="Seven">Class Seven</option>
                                <option value="Eight">Class Eight</option>
                                <option value="Nine">Class Nine</option>
                                <option value="Ten">Class Ten</option>
                            </select>
                        </div>
                        <div>
                            <input className='admin-input w-full text-xl text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded ' type="text" name='roll' placeholder="Enter Student's Id or Roll" />
                        </div>
                        <div>
                            <input className='admin-input w-full text-xl text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded ' type="text" name='number' placeholder="Enter Guardians  Number" />
                        </div>
                    </div>
                </div>
                <input className='text-lg font-semibold  text-white rounded bg-[#daa520] hover:bg-[#dab520] duration-300 active:scale-95 px-5 py-3 mt-5 uppercase cursor-pointer' type="submit" value="Add Student" />
            </form>
        </div>
    );
};

export default AddStudent;