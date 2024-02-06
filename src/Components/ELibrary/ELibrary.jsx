import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axiosInstance from '../../Global/Axios/AxiosInstance';


const ELibrary = () => {
    const [ebooks, setEbooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEbooks, setFilteredEbooks] = useState([]);

    useEffect(() => {
        ebooksData();
    }, []);

    const ebooksData = async () => {
        try {
            const response = await axiosInstance.get('/ebooks');
            setEbooks(response.data);
            setFilteredEbooks(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching Ebooks:', error);
        }
    };

    const downloadPdf = async (ebook) => {
        try {
            const response = await fetch(`http://localhost:5000/getimage?path=${ebook.filePath}`);
            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${ebook.book_name}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up after the download
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };

    const viewPdf = (ebook) => {
        try {
            const viewerUrl = `http://localhost:5000/getimage?path=${ebook.filePath}`;
            window.open(viewerUrl, '_blank');
        } catch (error) {
            console.error('Error viewing PDF:', error);
        }
    };

    const handleSearch = () => {
        const searchTermLower = searchTerm.toLowerCase();
        const filtered = ebooks.filter((ebook) =>
            ebook.book_name.toLowerCase().includes(searchTermLower)
        );
        setFilteredEbooks(filtered);
    };

    return (
        <div>
            <h1 className='text-3xl font-bold text-center mt-5 text-gray-700'>ই-লাইব্রেরী</h1>
            <div className='flex justify-center mx-4 md:mx-0 mt-2 mb-5'>
                <input
                    type="text"
                    className='w-full md:w-96 p-2 bg-gray-100 focus:outline-none placeholder:uppercase text-gray-700'
                    placeholder='Search book here...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    className='bg-[#DAA520] py-2 px-4 text-white hover:bg-yellow-500 duration-300 active:bg-yellow-300'
                    onClick={handleSearch}
                >
                    <FaSearch />
                </button>
            </div>
            <div className='max-w-7xl mx-auto mb-10'>
                {filteredEbooks.length === 0 ? (
                    <p className="text-center text-xl font-bold text-red-300 h-screen">Book not found</p>
                ) : (
                    <div className='mx-4 md:mx-0 grid grid-cols-2 md:grid-cols-6 gap-5 '>
                        {filteredEbooks.map((ebook) => (
                            <div key={ebook.id} className='border border-gray-200 w-full rounded shadow-lg'>
                                <div className='  flex justify-center overflow-hidden'>
                                    <img
                                        src={`http://localhost:5000/getimage?path=${ebook.imagePath}`}
                                        alt=""
                                        className=' w-full hover:scale-110 object-cover duration-300'
                                        style={{ aspectRatio: '16/20' }} 
                                    />
                                </div>
                                <h1 className='font-bold text-gray-700 p-2'>{ebook.book_name}</h1>
                                <div className='p-2'>
                                    <button onClick={() => viewPdf(ebook)}
                                        className='w-full text-white bg-cyan-500 hover:bg-cyan-400 duration-300 rounded mb-1'>Read Book</button>
                                    <button onClick={() => downloadPdf(ebook)}
                                        className='w-full text-white bg-green-500 hover:bg-green-400 duration-300 rounded'>Download Book</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ELibrary;
