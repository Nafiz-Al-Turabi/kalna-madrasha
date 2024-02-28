import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Global/Axios/AxiosInstance';


const Dashboard = () => {
    const [committes, setCommittes] = useState([]);
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        fetchData();
        fetchStudentData();
        fetchTeachersData();
    }, [])

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/committes')
            const data = response.data;
            console.log(data);
            setCommittes(data);

        } catch (error) {

        }
    }

    const fetchStudentData = async () => {
        try {
            const response = await axiosInstance.get('/students');
            const data = response.data;
            setStudents(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchTeachersData = async () => {
        try {
            const response = await axiosInstance.get('/teachers');
            const data = response.data;
            console.log(data);
            setTeachers(data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    return (
        <div className='admin grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-white'>
            <div className='text-center space-y-4 bg-rose-400 h-56 flex justify-center items-center rounded-lg '>
                <div>
                    <h1 className='text-xl font-extrabold'>Total Student</h1>
                    <p className='text-8xl font-extrabold'>{students.length}</p>
                </div>
            </div>
            <div className='text-center space-y-4 bg-cyan-400 h-56 flex justify-center items-center rounded-lg'>
                <div>
                    <h1 className='text-xl font-extrabold'>Total Teacher</h1>
                    <p className='text-8xl font-extrabold'>{teachers.length}</p>
                </div>
            </div>
            <div className='text-center space-y-4 bg-yellow-400 h-56 flex justify-center items-center rounded-lg'>
                <div>
                    <h1 className='text-xl font-extrabold'>Total Committee Member</h1>
                    <p className='text-8xl font-extrabold'>{committes.length}</p>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;