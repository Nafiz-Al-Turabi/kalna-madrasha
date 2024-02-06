import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Global/Axios/AxiosInstance';
import { FaSearch } from 'react-icons/fa';

const StudentsInformation = () => {
    const [students, setStudents] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        fetchStudentData();
    }, [searchInput]);

    const fetchStudentData = async () => {
        try {
            const response = await axiosInstance.get('/students');
            const data = response.data;
            setStudents(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSearch = () => {
        const filteredResults = students.filter(student =>
            student.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            student.roll.includes(searchInput)
        );
        setStudents(filteredResults);
    };

    return (
        <div>
            <h1 className='text-center text-3xl text-gray-700 font-bold my-5'>ছাত্র-ছাত্রীর তথ্য</h1>
            <div className='flex justify-center '>
                <input
                    type="text"
                    className='w-96 p-2 bg-gray-100 focus:outline-none'
                    placeholder='Search by Name or ID...'
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <button className='p-2 bg-gray-100' onClick={handleSearch}>
                    <FaSearch />
                </button>
            </div>
            <div className='max-w-7xl mx-auto my-10'>
                <div className='grid grid-cols-2 lg:grid-cols-6 gap-5 mx-4'>
                    {students.map((student) => (
                        <div key={student.id} className="rounded-lg overflow-hidden shadow-md border border-gray-200">
                            <div className="flex justify-center items-center h-48 m-2 rounded-lg  overflow-hidden">
                                <img className="w-full h-full object-cover" src={`http://localhost:5000/getimage?path=${student.imagePath}`} alt="Student" />
                            </div>
                            <div className="p-2">
                                <div className="font-bold text-base md:text-xl mb-2 text-gray-700">{student.name}</div>
                                <p className="text-gray-700 font-bold text-base mb-2">Class: {student.class_name}</p>
                                <p className="text-gray-700 font-bold text-base">ID: <span className='text-red-500'>{student.roll}</span></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentsInformation;
