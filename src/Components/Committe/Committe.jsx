import React from 'react';

const Committe = () => {
    return (
        <div className=' max-w-7xl mx-auto'>
            <h1 className='text-3xl font-bold text-center pt-5 text-gray-700'>ম্যানেজিং কমিটি</h1>
            <div className='bg-gray-100 w-48'>
                <div class="card bg-white shadow-md rounded-md p-2 mb-5">
                    <div class="flex justify-center">
                        <img src="https://via.placeholder.com/150" alt="Profile Image" class="-full w-40 h-40" />
                    </div>
                    <div class="text-center mt-4">
                        <h2 class="text-xl font-semibold">John Doe</h2>
                        <p class="text-gray-600 text-sm">Software Engineer</p>
                        <p class="text-gray-600 text-sm mt-2">Phone: +123456789</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Committe;