import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Global/Axios/AxiosInstance';
import ResultTable from '../Cards/ResultTable';
import { FaRegCheckCircle } from 'react-icons/fa';
import { IoMdCloseCircleOutline } from 'react-icons/io';

const AddResult = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [results, setResults] = useState([]);
    const [successMessage, setSucsessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };
    useEffect(() => {
        fetchData();
    }, [])
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const class_name = form.class_name.value;
        const formData = new FormData();

        formData.append('title', title);
        formData.append('pdf', selectedFile);
        formData.append('class_name', class_name);

        try {
            const response = await axiosInstance.post('/postresult', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSucsessMessage('Result Added Successfully!');
            setErrorMessage('');
            event.target.reset();
            setSelectedFile(null)
            fetchData();
            setTimeout(() => {
                setSucsessMessage('');
            }, 3000);
        } catch (error) {
            setErrorMessage('Failed to add Result. Please try again.');
            setSucsessMessage('');

            setTimeout(() => {
                setErrorMessage('');
            }, 3000);

        }
    };

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/results');
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching results:', error);
        }
    };

    // Delete Result
    const handleDeleteResult = (deleteResultId) => {
        setResults(prevResult => prevResult.filter((result) => result.id !== deleteResultId));
        fetchData();
    }

    return (
        <div>
            {successMessage &&
                <div className="notification text-xl font-semibold text-green-500 bg-white w-96 h-20 flex justify-center items-center shadow-lg absolute bottom-5 border-[3px] border-green-300 tracking-wider rounded-lg z-30">
                    <div className='flex items-center'>
                        <FaRegCheckCircle className='mr-3 text-4xl' /> {successMessage}
                    </div>
                </div>
            }
            {errorMessage && <div className="notification text-xl font-semibold text-red-500 bg-white w-96 h-20 flex justify-center items-center shadow-lg absolute bottom-5 border-[3px] border-red-300 tracking-wider rounded-lg z-30">
                <div className='flex items-center'>
                    <IoMdCloseCircleOutline className='mr-3 text-4xl' /> {errorMessage}
                </div>
            </div>
            }
            <form onSubmit={handleSubmit} className="admin max-w-md mx-auto my-8 bg-white p-8 rounded-md shadow-lg">
                <h2 className="text-3xl font-semibold mb-6 text-center">Publish Result</h2>

                {/* Title Input */}
                <div className="mb-6">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-600 mb-2">
                        Title Of result
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        className="w-full px-4 py-2 text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded0"
                        placeholder="Exap. Class Ten result"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="result" className="block text-sm font-medium text-gray-600 mb-2">
                        Result Sheet (PDF)
                    </label>
                    <input
                        encType="multipart/form-data"
                        type="file"
                        id="result"
                        name="pdf"
                        accept=".pdf"
                        onChange={handleFileChange}
                        required
                        className="w-full px-4 py-2 text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded"
                        
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="class" className="block text-sm font-medium text-gray-600 mb-2">
                        Choose Class
                    </label>
                    <select
                        id="class"
                        name="class_name"
                        className="w-full px-4 py-2 text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded"
                        required
                    >
                        <option value="class One">Class One</option>
                        <option value="class Two">Class Two</option>
                        <option value="class Three">Class Three</option>
                        <option value="class Four">Class Four</option>
                        <option value="class Five">Class Five</option>
                        <option value="class Six">Class Six</option>
                        <option value="class Seven">Class Seven</option>
                        <option value="class Eight">Class Eight</option>
                        <option value="class Nine">Class Nine</option>
                        <option value="class Dakhil">Class Dakhil</option>
                        <option value="class Alim">Class Alim</option>
                        <option value="class Fazil">Class Fazil</option>
                        <option value="class Kamil">Class Kamil</option>
                    </select>
                </div>

                <div className="flex justify-center">
                    <button
                        className="bg-[#DAA520] text-white py-2 px-6 rounded-full"
                        type="submit"
                    >
                        Publish
                    </button>
                </div>
            </form>
            <div className='mt-20'>
                <div className='bg-gray-800 mt-5 p-5 text-white'>
                    <h1 className='text-3xl font-bold uppercase '>Added Results: {results.length}</h1>
                </div>
                <div className="container mx-auto mt-8">
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 rounded-md">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="py-3 px-6 text-left">Image</th>
                                    <th className="py-3 px-6 text-left">Title</th>
                                    <th className="py-3 px-6 text-left">Class Name</th>
                                    <th className="py-3 px-6 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {
                                    results.map(result => <ResultTable
                                        key={result._id}
                                        resultData={result}
                                        onDelete={handleDeleteResult}
                                    ></ResultTable>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddResult;