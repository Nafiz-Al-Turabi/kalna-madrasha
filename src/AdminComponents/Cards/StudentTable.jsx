import React from 'react';

const StudentTable = ({studentData}) => {
    return (
        <tr>
            <td class="py-4 px-6"><img src={`http://localhost:5000/getimage?path=${studentData.imagePath}`} alt="Student Image" class="w-12 h-12 object-cover rounded-full" /></td>
            <td class="py-4 px-6">{studentData.name}</td>
            <td class="py-4 px-6">{studentData.class_name}</td>
            <td class="py-4 px-6">{studentData.roll}</td>
            <td class="py-4 px-6">{studentData.guardians_number}</td>
            <td class="py-4 px-6">
                <button class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-full focus:outline-none">Delete</button>
            </td>
        </tr>
    );
};

export default StudentTable;