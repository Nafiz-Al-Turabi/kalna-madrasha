import React, { useEffect, useState } from 'react';
import { FaPhone, FaSearch, FaUserTie } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";
import bg from '../../assets/islamic-bg2.jpg'
import axiosInstance from '../../Global/Axios/AxiosInstance';

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTeachers, setFilteredTeachers] = useState([]);

    useEffect(() => {
        fetchTeachersData();
    }, []);

    const fetchTeachersData = async () => {
        const response = await axiosInstance.get('/teachers');
        setTeachers(response.data);
        setFilteredTeachers(response.data)
    };

    const handleSearch = () => {
        const searchTermLower = searchTerm.toLowerCase();
        const filtered = teachers.filter((teacher) =>
            teacher.name.toLowerCase().includes(searchTermLower)
        );
        setFilteredTeachers(filtered);
    };

    return (
        <div className='my-10'>
            <h1 className='text-3xl font-bold text-center mt-5 text-gray-700'>শিক্ষক শিক্ষিকার তথ্য</h1>
            <div className='flex justify-center mx-4 md:mx-0 mt-2 mb-5'>
                <input
                    type="text"
                    className='w-full md:w-96 p-2 bg-gray-100 focus:outline-none placeholder:uppercase text-gray-700'
                    placeholder='Search...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    className='bg-[#DAA520] py-2 px-4 text-white hover:bg-yellow-500 duration-300 active:bg-yellow-300'
                    onClick={handleSearch}
                >
                    <FaSearch />
                </button>
            </div>
            <div className='max-w-7xl mx-auto'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 mx-4 lg:mx-0'>
                    {
                        filteredTeachers.map(teacher =>
                            <div className="shadow-lg rounded-lg overflow-hidden flex p-2 border-t border-gray-50 bg-cover"
                            style={{ backgroundImage: `url(${bg})` }}
                            key={teacher.id}>
                                <div className="flex-none">
                                    <img className=" w-32 object-cover rounded-md"
                                        src={`http://localhost:5000/getimage?path=${teacher.imagePath}`} alt="Person"
                                        style={{ aspectRatio: '16/18' }}
                                        />
                                </div>
                                <div className="px-2 py-4 text-white">
                                    <div className="font-bold text-xl mb-2">{teacher.name}</div>
                                    <p className="font-semibold text-base flex items-center"><FaUserTie className='mr-2'/> {teacher.designation}</p>
                                    <p className="font-semibold text-base flex items-center"><MdEmail className='mr-2' /> {teacher.email}</p>
                                    <p className="font-semibold text-base flex items-center"><FaPhone className='mr-2'/> {teacher.number}</p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Teachers;
