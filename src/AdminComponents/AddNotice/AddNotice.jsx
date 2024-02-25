import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Global/Axios/AxiosInstance';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { FaRegCheckCircle } from 'react-icons/fa';
import NoticeTable from '../Cards/NoticeTable';

const AddNotice = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [successMessage, setSucsessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [notices, setNotices] = useState([])

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
        const description = form.description.value;
        const date = form.date.value;
        const formData = new FormData();

        formData.append('title', title);
        formData.append('class_name', class_name);
        formData.append('description', description)
        formData.append('date', date);
        formData.append('file', selectedFile);

        try {
            const response = await axiosInstance.post('/postnotice', formData, {
                'Content_type': 'multipart/form-data'
            });
            console.log(response.data)
            setSucsessMessage('Notice Added Successfully!');
            setErrorMessage('');
            event.target.reset();
            setSelectedFile(null)
            setTimeout(() => {
                setSucsessMessage('');
            }, 3000);
        } catch (error) {
            setErrorMessage('Failed to add notice. Please try again.');
            setSucsessMessage('');

            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/notices');
            setNotices(response.data);
        } catch (error) {
            console.error('Error fetching results:', error);
        }
    };

    const handleDelete = (deleteNoticeId) => {
        setNotices((prevNotice) => prevNotice.filter((notice) => notice.id !== deleteNoticeId))
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
            <div className="admin max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
                <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Add Notice</h2>
                <form onSubmit={handleSubmit} className='admin'>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-600 mb-2" htmlFor="title">
                            Notice Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="w-full px-4 py-2 text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-600 mb-2 rounded-2xl" htmlFor="class_name">
                            Select Class
                        </label>
                        <select
                            id="class_name"
                            name="class_name"
                            className="w-full px-4 py-2 text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded"
                            required
                        >
                            <option value="ইবতেদায়ী">ইবতেদায়ী</option>
                            <option value="দাখিল">দাখিল</option>
                            <option value="আলিম">আলিম</option>
                            <option value="ফাজিল">ফাজিল</option>
                            <option value="কামিল">কামিল</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-600 mb-2" htmlFor="file">
                            File
                        </label>
                        <input
                            encType="multipart/form-data"
                            type="file"
                            id="file"
                            name="file"
                            onChange={handleFileChange}
                            className="w-full px-4 py-2 text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded"
                            accept=".pdf, .doc, .docx"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-600 mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows="4"
                            className="w-full px-4 py-2 text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-600 mb-2" htmlFor="date">
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            className="w-full px-4 py-2 text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#DAA520] text-white py-3 rounded-md hover:bg-[#DAC520] duration-300 focus:outline-none focus:shadow-outline-blue uppercase"
                    >
                        Add Notice
                    </button>
                </form>
            </div>
            <div className='mt-20'>
                <div className='bg-gray-800 my-5 p-5 text-white'>
                    <h1 className='text-3xl font-bold uppercase '>Added Notices: {notices.length}</h1>
                </div>
                <div className="container mx-auto mt-8">
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 rounded-md">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="py-3 px-6 text-left">File</th>
                                    <th className="py-3 px-6 text-left">Title</th>
                                    <th className="py-3 px-6 text-left">Class Name</th>
                                    {/* <th className="py-3 px-6 text-left">Description</th> */}
                                    <th className="py-3 px-6 text-left">Date</th>
                                    <th className="py-3 px-6 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {
                                    notices.map(notice => <NoticeTable
                                        key={notice._id}
                                        noticeData={notice}
                                        onDelete={handleDelete}
                                    ></NoticeTable>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNotice;
