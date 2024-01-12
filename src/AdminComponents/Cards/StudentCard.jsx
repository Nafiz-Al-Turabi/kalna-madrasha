import React from 'react';
const getRandomColorClass = () => {
    const colors = ['bg-red-100', 'bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-purple-100','bg-cyan-100','bg-purple-100'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
const StudentCard = ({studentData}) => {
    const cardColor = studentData.color || getRandomColorClass();
    return (
        <div class={`${cardColor} rounded-lg overflow-hidden shadow-md w-full mt-5`}>
        <img src={`http://localhost:5000/getimage?path=${studentData.imagePath}`} alt="Profile Image" class="w-full h-56 object-cover"/>

        <div class="p-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-2">{studentData.name}</h2>

            <p class="text-sm text-gray-600 mb-2">Class: {studentData.class_name}</p>
            <p class="text-sm text-gray-600 mb-2">Roll: {studentData.roll}</p>

            <p class="text-sm text-gray-600 mb-4">Guardian's Number: {studentData.guardians_number}</p>

            <button class="w-full bg-red-500 text-white py-2 px-4 rounded-full">Delete</button>
        </div>
        </div>
    );
};

export default StudentCard;