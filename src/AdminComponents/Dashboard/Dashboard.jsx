import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Global/Axios/AxiosInstance';
import ContactCard from '../Cards/ContactCard';


const Dashboard = () => {
    const [committes, setCommittes] = useState([]);
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
        fetchStudentData();
        fetchTeachersData();
        fetchContacts();
    }, [])

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/committes')
            const data = response.data;
            console.log(data);
            setCommittes(data);
            setLoading(false)

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

    const fetchContacts = async () => {
        try {
            const response = await axiosInstance.get('/contacts');
            setContacts(response.data)
        } catch (error) {
            console.error('Error contact fetching data:', error);
        }
    }

    const handleDelete = (deleteContactId) => {
        setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== deleteContactId))
        fetchContacts();
    }
    return (
        <div>
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
            {
                loading ?
                    <div className="flex justify-center items-center h-screen md:h-96">
                        <div class="w-16 h-16 border-8 border-dashed rounded-full animate-spin duration-1000 border-[#DAA520]"></div>
                    </div>
                    :
                    <div className='mt-20 space-y-1'>
                        {
                            contacts.slice(0).reverse().map(contact => <ContactCard
                                key={contact._id}
                                contact={contact}
                                onDelete={handleDelete}
                            >

                            </ContactCard>)
                        }
                    </div>
            }
        </div>
    );
};

export default Dashboard;