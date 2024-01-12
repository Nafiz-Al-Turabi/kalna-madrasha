import React from 'react';

const TeacherCard = ({teacherData}) => {
    const {imagePath,name,designation,email,number}=teacherData;
    return (
        <div className=' flex bg-white rounded-lg shadow-lg overflow-hidden'>
            <div className='flex justify-center overflow-hidden'>
                <img src={`http://localhost:5000/getimage?path=${imagePath}`} className='w-40 object-cover rounded-l-lg ' alt="" />
            </div>
            <div className='text-gray-700 p-3'>
                <h1 className='text-xl font-bold'>{name}</h1>
                <h2 className=' font-semibold text-[#DAA520]'>{designation}</h2>
                <p className=' font-bold'>Email: <span className='text-base text-gray-600'>{email}</span></p>
                <p className=' font-bold'>Phone: <span className='text-base text-gray-600'>{number}</span></p>
                <button className='bg-green-500 text-white font-semibold px-5 py-1 mt-1 rounded-md hover:bg-green-600 duration-300 active:scale-95 mr-5'>Update</button>
                <button className='bg-red-500 text-white font-semibold px-5 py-1 mt-1 rounded-md hover:bg-red-600 duration-300 active:scale-95 '>Delete</button>
            </div>
        </div>
    );
};

export default TeacherCard;