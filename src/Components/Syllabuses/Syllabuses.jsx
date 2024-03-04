import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Global/Axios/AxiosInstance';
import { Link } from 'react-router-dom';

const Syllabuses = () => {
    const [syllabuses, setSyllabuses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20; // Change the number of items per page as needed

    useEffect(() => {
        fetchDataSyllabus();
    }, [currentPage]); // Fetch data when the currentPage changes

    const fetchDataSyllabus = async () => {
        try {
            const response = await axiosInstance.get('/syllabuses');
            setSyllabuses(response.data);
        } catch (error) {
            console.error('failed to fetch Syllabus', error);
        }
    };

    const downloadPdf = async (syllabus) => {
        try {
            const response = await fetch(`http://localhost:5000/getimage?path=${syllabus.imagePath}`);
            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${syllabus.syllabus_name}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up after the download
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };

    const viewPdf = (syllabus) => {
        try {
            const viewerUrl = `http://localhost:5000/getimage?path=${syllabus.imagePath}`;
            window.open(viewerUrl, '_blank');
        } catch (error) {
            console.error('Error viewing PDF:', error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredSyllabuses = syllabuses.filter((syllabus) =>
        syllabus.syllabus_name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    // Calculate pagination variables
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedSyllabuses = filteredSyllabuses.slice(startIndex, endIndex);

    return (
        <div className='max-w-7xl mx-auto '>
            <h1 className='text-center text-3xl text-gray-700 font-bold my-5'>পাঠক্রম</h1>
            <div className='my-10 space-y-2'>
                <div className='flex justify-center my-5'>
                    <input
                        type="text"
                        className='w-96 p-2 bg-gray-100 focus:outline-none'
                        placeholder='Search...'
                        onChange={handleSearch}
                    />
                </div>
                {paginatedSyllabuses.map((syllabus) => (
                    <div key={syllabus._id} className="bg-white rounded-lg shadow-lg p-6  mx-4 border-t border-gray-100">
                        <h2 className="text-lg font-semibold mb-4">{syllabus.syllabus_name}</h2>
                        <div className="flex justify-between items-center mb-4">
                            <button
                                onClick={() => downloadPdf(syllabus)}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Download
                            </button>
                            <Link
                                onClick={() => viewPdf(syllabus)}
                                className="text-blue-500 hover:underline"
                            >
                                View
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-5">
                <button
                    className={`mr-2 ${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    className={`ml-2 ${paginatedSyllabuses.length < itemsPerPage ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={paginatedSyllabuses.length < itemsPerPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Syllabuses;
