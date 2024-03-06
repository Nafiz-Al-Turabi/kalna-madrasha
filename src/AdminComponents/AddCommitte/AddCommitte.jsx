import React, { useEffect, useState } from 'react';
import { CiSquarePlus } from 'react-icons/ci';
import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import axiosInstance from '../../Global/Axios/AxiosInstance';
import CommitteCard from '../Cards/CommitteCard';

const AddCommitte = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [successMessage, setSucsessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [committes, setCommittes] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };
    const handleAddCommittee = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const designation = form.designation.value;
        const rawNumber = form.number.value;
        const number = `+88${rawNumber.replace(/\D/g, '')}`;
        const formData = new FormData();

        formData.append('name', name);
        formData.append('designation', designation);
        formData.append('number', number);
        formData.append('image', selectedFile);

        try {
            const response = await axiosInstance.post('/postcommittee', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            setSucsessMessage('Committee Added Succesfully!')
            setErrorMessage('')
            event.target.reset();
            setSelectedFile(null);
            fetchData();
            setTimeout(() => {
                setSucsessMessage('')
            }, 3000)
        } catch (error) {
            console.error('Error adding Committee:', error);
            setErrorMessage('Failed to add Committee. Please try again.');
            setSucsessMessage('');

            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/committes')
            const data = response.data;
            console.log(data);
            setCommittes(data);

        } catch (error) {

        }
    }
    // delete committe
    const handleDelete = (deleteCommitte) => {
        setCommittes((prevCommitte) => prevCommitte.filter((committe) => committe.id !== deleteCommitte));
        fetchData();
    }
    return (
        <div>
            <div>
                <h1 className='text-3xl font-extrabold text-gray-700 text-center mb-5 uppercase'>Add Committee</h1>
            </div>
            {successMessage &&
                <div className="notification text-xl font-semibold text-green-500 bg-white w-96 h-20 flex justify-center items-center shadow-lg absolute bottom-5 border-[3px] border-green-300 tracking-wider rounded-lg z-30">
                    <div className='flex items-center'>
                        <FaRegCheckCircle className='mr-3 text-4xl' /> {successMessage}
                    </div>
                </div>
            }
            {errorMessage && <div className="notification text-xl font-semibold text-red-500 bg-white w-96 h-20 flex justify-center items-center shadow-lg absolute bottom-5 border-[3px] border-red-300 tracking-wider rounded-lg z-30">
                <div className='flex items-center'>
                    <IoMdCloseCircleOutline className='mr-3 text-4xl' /> {errorMessage}
                </div>
            </div>
            }
            <form onSubmit={handleAddCommittee} action="" className='admin bg-white w-96 mx-auto p-4 shadow-xl rounded'>

                <div className='grid grid-cols-1 md:grid-cols-1 gap-5'>
                    <div className="relative border-dashed border-2 border-gray-300 bg-gray-50 rounded-md p-6 group">
                        <input
                            encType="multipart/form-data"
                            type="file"
                            name='image'
                            className="hidden"
                            id="fileInput"
                            onChange={handleFileChange}
                            required
                            accept='.jpg,.png,.gif,.jpeg.web'
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
                            <input className='admin-input w-full text-xl text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded ' type="text" name='name' placeholder="Enter Committee Name" required />
                        </div>

                        <div>
                            <input className='admin-input w-full text-xl text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded ' type="text" name='designation' placeholder="Enter  Designation" required />
                        </div>
                        <div>
                            <input className='admin-input w-full text-xl text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded ' type="text" name='number' placeholder="Enter Phone  Number" required />
                        </div>
                    </div>
                </div>
                <input className='w-full text-lg font-semibold  text-white rounded bg-[#daa520] hover:bg-[#dab520] duration-300 active:scale-95 px-5 py-3 mt-5 uppercase cursor-pointer' type="submit" value="Add Committe" />
            </form>
            <div className='my-5'>
            <div className='bg-gray-800 my-5 p-5 text-white'>
                    <h1 className='text-3xl font-bold uppercase '>Added Committee: {committes.length}</h1>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                    {
                        committes.map(committe => <CommitteCard
                            key={committe._id}
                            committeData={committe}
                            onDelete={handleDelete}
                        ></CommitteCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default AddCommitte;