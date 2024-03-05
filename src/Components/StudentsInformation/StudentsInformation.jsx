import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Global/Axios/AxiosInstance';

const StudentsInformation = () => {
    const [students, setStudents] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20; // number of items per page
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchStudentData();
    }, [searchInput, selectedClass, currentPage]);

    const fetchStudentData = async () => {
        try {
            const response = await axiosInstance.get('/students');
            const data = response.data;
            // Apply search filter
            let filteredResults = data.filter(student =>
                student.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                student.roll.includes(searchInput)
            );
            // Apply class filter if a class is selected
            if (selectedClass !== '') {
                filteredResults = filteredResults.filter(student =>
                    student.class_name === selectedClass
                );
            }
            // Apply pagination
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedResults = filteredResults.slice(startIndex, endIndex);
            setStudents(paginatedResults);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSearch = () => {
        setCurrentPage(1); // Reset to the first page when searching
        fetchStudentData();
    };

    const handleClassChange = (classSelected) => {
        setSelectedClass(classSelected);
        setCurrentPage(1); // Reset to the first page when class changes
    };

    return (
        <div>
            <h1 className='text-center text-3xl text-gray-700 font-bold my-5'>ছাত্র-ছাত্রীর তথ্য</h1>
            <div className='md:flex justify-center space-y-2 md:space-y-0'>
                <div className='flex justify-center '>
                    <input
                        type="text"
                        className='w-96 p-2 bg-gray-100 focus:outline-none'
                        placeholder='Search by Name or ID...'
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />

                </div>
                <div className='flex justify-center'>
                    <select
                        value={selectedClass}
                        onChange={(e) => handleClassChange(e.target.value)}
                        className='px-2 py- border border-gray-300 focus:outline-none focus:border-[#DAA520]'
                    >
                        <option value=''>All Classes</option>
                        {/* Add options dynamically based on available classes */}
                        {Array.from(new Set(students.map(student => student.class_name))).map((class_name) => (
                            <option key={class_name} value={class_name}>
                                {class_name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='max-w-7xl mx-auto my-10'>

                {
                    loading
                        ?
                        <div className="flex justify-center items-center h-screen md:h-96">
                            <div class="w-16 h-16 border-8 border-dashed rounded-full animate-spin duration-1000 border-[#DAA520]"></div>
                        </div>
                        :
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
                }
                {/* Pagination Controls */}
                <div className="flex justify-between mt-5">
                    <button
                        className={`mr-2 ${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <button
                        className={`ml-2 ${students.length < itemsPerPage ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={students.length < itemsPerPage}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentsInformation;
