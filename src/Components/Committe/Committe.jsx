import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Global/Axios/AxiosInstance';

const Committe = () => {
    const [committes, setCommittes] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/committes')
            const data = response.data;
            console.log(data);
            setCommittes(data);

        } catch (error) {

        }
    }
    return (
        <div className=' max-w-7xl mx-auto'>
            <h1 className='text-3xl font-bold text-center pt-5 text-gray-700'>ম্যানেজিং কমিটি</h1>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
                {
                    committes.map(committe =>
                        <div key={committe._id} className='w-full my-10'>
                            <div class="card bg-white shadow-md rounded-md p-2 mb-5">
                                <div class="flex justify-center">
                                    <img src={`http://localhost:5000/getimage?path=${committe.imagePath}`} alt="Profile Image" class=" w-72 h-72" />
                                </div>
                                <div class="text-center mt-4">
                                    <h2 class="text-xl font-semibold">{committe.name}</h2>
                                    <p class="text-gray-600 text-sm">{committe.designation}</p>
                                    <p class="text-gray-600 text-sm mt-2">Phone: {committe.number}</p>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Committe;