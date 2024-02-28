import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Global/Axios/AxiosInstance';
import { CiSquarePlus } from "react-icons/ci";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import StudentTable from '../Cards/StudentTable';

const AddStudent = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [successMessage, setSucsessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

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
        const formData = new FormData();

        formData.append('name', name);
        formData.append('class_name', class_name);
        formData.append('roll', roll);
        formData.append('guardians_number', guardians_number);
        formData.append('image', selectedFile);

        try {
            const response = await axiosInstance.post('/poststudent', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);
            setSucsessMessage('Student Added Successfully!');
            setErrorMessage('');
            event.target.reset();
            setSelectedFile(null);
            fetchData();
            setTimeout(() => {
                setSucsessMessage('');
            }, 3000);
        } catch (error) {
            console.error('Error adding student:', error);
            setErrorMessage('Failed to add student. Please try again.');
            setSucsessMessage('');

            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };


    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/students');
            const data = response.data;
            setStudents(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // delete students
    const handleDelete = (deleteStudentId) => {
        setStudents((prevStudent) => prevStudent.filter((student) => student.id !== deleteStudentId))
        fetchData();
    }


    return (
        <div>
            <div>
                <h1 className='text-3xl font-extrabold text-gray-700 text-center mb-5 uppercase'>Add Student</h1>
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
            <form onSubmit={handleAddStudent} action="" className='admin bg-white w-96 mx-auto p-4 shadow-xl rounded'>

                <div className='grid grid-cols-1 md:grid-cols-1 gap-5'>
                    <div className="relative border-dashed border-2 border-gray-300 bg-gray-50 rounded-md p-6 group">
                        <input
                            encType="multipart/form-data"
                            type="file"
                            name='image'
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
                <input className='w-full text-lg font-semibold  text-white rounded bg-[#daa520] hover:bg-[#dab520] duration-300 active:scale-95 px-5 py-3 mt-5 uppercase cursor-pointer' type="submit" value="Add Student" />
            </form>
            <div className='mt-20'>
                <div className='bg-gray-800 my-5 p-5 text-white'>
                    <h1 className='text-3xl font-bold uppercase '>Added Students: {students.length}</h1>
                </div>
                <div className="container mx-auto mt-8">
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 rounded-md">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="py-3 px-6 text-left">Image</th>
                                    <th className="py-3 px-6 text-left">Name</th>
                                    <th className="py-3 px-6 text-left">Class Name</th>
                                    <th className="py-3 px-6 text-left">Roll</th>
                                    <th className="py-3 px-6 text-left">Guardians Number</th>
                                    <th className="py-3 px-6 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {
                                    students.map(student => <StudentTable
                                        key={student._id}
                                        studentData={student}
                                        onDelete={handleDelete}
                                    ></StudentTable>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AddStudent;