import React, { useEffect, useState } from 'react';
import { CiSquarePlus } from 'react-icons/ci';
import axiosInstance from '../../Global/Axios/AxiosInstance';
import { FaRegCheckCircle } from 'react-icons/fa';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import NewsCard from '../Cards/NewsCard';

const AddNews = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [successMessage, setSucsessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [news, setNews] = useState([]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file)
    };

    useEffect(() => {
        fetchData();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const description = form.description.value;
        const date = form.date.value;

        const formData = new FormData();

        formData.append('title', title);
        formData.append('description', description)
        formData.append('date', date);
        formData.append('image', selectedFile);

        try {
            const response = await axiosInstance.post('/postnews', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setSucsessMessage('News Added Successfully!');
            setErrorMessage('');
            event.target.reset();
            setSelectedFile(null);
            fetchData();
            setTimeout(() => {
                setSucsessMessage('');
            }, 3000);
        } catch (error) {
            console.error('Failed to post news :', error);
            setErrorMessage('Failed to add news. Please try again.');
            setSucsessMessage('');

            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }

    };

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/news');
            const sortedNews = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setNews(sortedNews);
            console.log(sortedNews)
        } catch (error) {
            console.error('Failed to fetch news data', error);
        }
    };

    const handleDelete = (deleteNewsId) => {
        setNews((prevNews) => prevNews.filter((news) => news.id !== deleteNewsId))
        fetchData();
    }
    return (
        <div>
            <div className=" flex items-center justify-center">
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
                <form onSubmit={handleSubmit} className="admin bg-white p-8 rounded shadow-md w-96">
                    <h2 className="text-2xl font-bold mb-4 text-center">Add News</h2>
                    <div className="relative border-dashed border-2 border-gray-300 bg-gray-50 rounded-md p-6 group mb-5">
                        <input
                            encType="multipart/form-data"
                            type="file"
                            name='image'
                            className="hidden"
                            id="fileInput"
                            onChange={handleFileChange}
                            accept='.jpg, .png, .gif'
                            required
                        />
                        <label
                            htmlFor="fileInput"
                            className="cursor-pointer block text-gray-500 hover:text-gray-700 duration-300"
                        >
                            <div className="flex justify-center items-center">
                                <CiSquarePlus className='text-xl mr-2' />
                                <span>Choose a image file</span>
                            </div>
                        </label>
                        <p className="text-xs text-center text-gray-500 mt-2">PNG, JPG, GIF up to 5MB</p>

                        {selectedFile && (
                            <div className="mt-4">
                                <span className="text-sm font-medium text-gray-700">
                                    Selected file:
                                </span>
                                <p className="text-sm text-gray-500">{selectedFile.name}</p>
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-semibold text-gray-600 mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            className="w-full px-4 py-2 text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded"
                            placeholder="Enter news title"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-600 mb-1">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows="4"
                            className="w-full px-4 py-2 text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded resize-none"
                            placeholder="Enter news description"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-semibold text-gray-600 mb-1">News Date</label>
                        <input
                            type="date"
                            name="date"
                            className="w-full px-4 py-2 text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded"
                            placeholder="Enter news date"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#DAA520] text-white px-4 py-2 rounded-md hover:bg-[#DAC520] duration-300"
                    >
                        Add News
                    </button>
                </form>

            </div>
            <div>
                <div className='bg-gray-800 my-5 p-5 text-white'>
                    <h1 className='text-3xl font-bold uppercase '>Added News: {news.length}</h1>
                </div>
                <div className='grid grid-cols-4 gap-3'>
                    {
                        news.map(singleNews => <NewsCard
                            key={singleNews._id}
                            newsData={singleNews}
                            onDelete={handleDelete}
                        ></NewsCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default AddNews;