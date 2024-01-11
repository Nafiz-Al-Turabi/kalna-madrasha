import React from 'react';

const Dashboard = () => {
    return (
        <div className='admin grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-white'>
            <div className='text-center space-y-4 bg-rose-400 h-56 flex justify-center items-center rounded-lg '>
                <div>
                    <h1 className='text-xl font-extrabold'>Total Student</h1>
                    <p className='text-8xl font-extrabold'>655</p>
                </div>
            </div>
            <div className='text-center space-y-4 bg-cyan-400 h-56 flex justify-center items-center rounded-lg'>
                <div>
                    <h1 className='text-xl font-extrabold'>Total Teacher</h1>
                    <p className='text-8xl font-extrabold'>45</p>
                </div>
            </div>
            <div className='text-center space-y-4 bg-yellow-400 h-56 flex justify-center items-center rounded-lg'>
                <div>
                    <h1 className='text-xl font-extrabold'>Total Committee Member</h1>
                    <p className='text-8xl font-extrabold'>20</p>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;