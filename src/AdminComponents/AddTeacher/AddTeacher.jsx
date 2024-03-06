import React, { useEffect, useState } from 'react';
import './AddTeacher.css'
import { CiSquarePlus } from 'react-icons/ci';
import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import axiosInstance from '../../Global/Axios/AxiosInstance';
import TeacherCard from '../Cards/TeacherCard';

const AddTeacher = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [successMessage, setSucsessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };
    const handleAddteacher = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const designation = form.designation.value;
        const email = form.email.value;
        const rawNumber = form.number.value;
        const number = `+88${rawNumber.replace(/\D/g, '')}`;
        const formData = new FormData();

        formData.append('name', name);
        formData.append('designation', designation);
        formData.append('email', email);
        formData.append('number', number);
        formData.append('image', selectedFile);


        try {
            const response = await axiosInstance.post('/postteacher', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            setSucsessMessage('Teacher Added Succesfully!')
            setErrorMessage('')
            fetchData();
            event.target.reset();
            setSelectedFile();
            setTimeout(() => {
                setSucsessMessage('')
            }, 3000)
        } catch (error) {
            console.error('Error adding teacher:', error);
            setErrorMessage('Failed to add teacher. Please try again.');
            setSucsessMessage('');

            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/teachers');
            const data = response.data;
            console.log(data);
            setTeachers(data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDelete = (deleteTeacher) => {
        setTeachers((prevTeacher) => prevTeacher.filter((teacher) => teacher.id !== deleteTeacher));
        fetchData();
    }
    return (
        <div>
            <div>
                <h1 className='text-3xl font-extrabold text-gray-700 text-center mb-5 uppercase'>Add Teacher</h1>
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
            <form onSubmit={handleAddteacher} action="" className='admin bg-white p-4 shadow-inherit rounded'>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className="relative  border-dashed border-2 border-gray-300 bg-gray-50 rounded-md p-6 group">
                        <input
                            encType="multipart/form-data"
                            type="file"
                            name='image'
                            className="hidden"
                            id="fileInput"
                            onChange={handleFileChange}
                            required
                            accept='.jpg,.png,.gif,.jpeg,.web'
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
                            <input className='admin-input w-full text-xl text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded ' type="text" name='name' placeholder="Enter Teacher's Name" required />
                        </div>
                        <div>
                            <input className='admin-input w-full text-xl text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded ' type="text" name='designation' placeholder="Enter Teacher's Designation" required />
                        </div>
                        <div>
                            <input className='admin-input w-full text-xl text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded ' type="text" name='email' placeholder="Enter Teacher's Email" required />
                        </div>
                        <div>
                            <input className='admin-input w-full text-xl text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded ' type="text" name='number' placeholder="Enter Teacher's Number" required />
                        </div>
                    </div>
                </div>
                <input className='text-lg font-semibold  text-white rounded bg-[#daa520] hover:bg-[#dab520] duration-300 active:scale-95 px-5 py-3 mt-5 uppercase cursor-pointer' type="submit" value="Add Teacher" />
            </form>
            <div className='mt-10'>
                <div className='bg-gray-800 my-5 p-5 text-white'>
                    <h1 className='text-3xl font-bold uppercase '>Added Teachers: {teachers.length}</h1>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                    {
                        teachers.map(teacher => <TeacherCard
                            key={teacher._id}
                            teacherData={teacher}
                            onDelete={handleDelete}
                        ></TeacherCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default AddTeacher;