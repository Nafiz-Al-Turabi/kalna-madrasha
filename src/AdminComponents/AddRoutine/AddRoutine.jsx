import React, { useEffect, useRef, useState } from 'react';
import { CiSquarePlus } from 'react-icons/ci';
import axiosInstance from '../../Global/Axios/AxiosInstance';
import { FaRegCheckCircle } from 'react-icons/fa';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import RoutineCard from '../Cards/RoutineCard';

const AddRoutine = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [successMessage, setSucsessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [routines, setRoutines] = useState([])

    const formRef = useRef(null);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    useEffect(() => {
        fetchData();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const date = form.date.value;
        const formData = new FormData();

        formData.append('title', title);
        formData.append('date', date);
        formData.append('pdf', selectedFile);

        try {
            const response = await axiosInstance.post('/postroutine', formData, {
                headers: {
                    'Content_Type': 'multipart/form-data'
                }
            });
            fetchData();
            setSucsessMessage('Routine Added Successfully!');
            setErrorMessage('');
            event.target.reset();
            setSelectedFile(null);
            setTimeout(() => {
                setSucsessMessage('');
            }, 3000);
        } catch (error) {
            console.error('Error to post routine:', error);
            setErrorMessage('Failed to add routine. Please try again.');
            setSucsessMessage('');

            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/routines');
            setRoutines(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching Routine:', error);
        }
    };

    const handleDelete=(deleteRoutineId)=>{
        setRoutines((prevRoutines)=>prevRoutines.filter((routine)=>routine.id !== deleteRoutineId));
        fetchData();
    }
    return (
        <div>
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
            <div className='flex justify-center items-center'>
                <form onSubmit={handleSubmit} className="admin bg-white p-8 rounded shadow-md w-96">
                    <h2 className="text-2xl font-bold mb-4 text-center">Add Routine</h2>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-semibold text-gray-600 mb-1">Routine Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="w-full px-4 py-2 text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded"
                            placeholder="Enter routine title"
                        />
                    </div>
                    <div className="relative border-dashed border-2 border-gray-300 bg-gray-50 rounded-md p-6 group mb-5">
                        <input
                            encType="multipart/form-data"
                            type="file"
                            name='pdf'
                            className="hidden"
                            id="fileInput"
                            onChange={handleFileChange}
                            accept='.pdf'
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
                        <p className="text-xs text-center text-gray-500 mt-2">Only pdf</p>

                        {selectedFile && (
                            <div className="mt-4">
                                <span className="text-sm font-medium text-gray-700">
                                    Selected file:
                                </span>
                                <p className="text-sm text-gray-500">{selectedFile.name}</p>
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-semibold text-gray-600 mb-1">Date</label>
                        <input
                            type="date"
                            name="date"
                            className="w-full px-4 py-2 text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded"
                            placeholder="Enter date"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#DAA520] text-white px-4 py-2 rounded-md hover:bg-[#DAC520] duration-300"
                    >
                        Add Routine
                    </button>
                </form>
            </div>
            <div>
                <h1 className='text-3xl font-bold text-gray-600'>Added Routines: {routines.length}</h1>
                <hr className='border-2 border-yellow-400 my-3' />
                <div className='grid grid-cols-1 gap-2'>
                    {
                        routines.map(routine => <RoutineCard
                            key={routine._id}
                            routineData={routine}
                            onDelete={handleDelete}
                        ></RoutineCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default AddRoutine;