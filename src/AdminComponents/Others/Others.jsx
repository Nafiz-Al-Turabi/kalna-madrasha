import React, { useEffect, useState } from 'react';
import { CiSquarePlus } from 'react-icons/ci';
import axiosInstance from '../../Global/Axios/AxiosInstance';
import { FaRegCheckCircle } from 'react-icons/fa';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import CampusImageCard from '../Cards/CampusImageCard';
import HeadlineCard from '../Cards/HeadlineCard';
import EbookCard from '../Cards/EbookCard';
import LillahBoardingCard from '../Cards/LillahBoardingCard';
import SyllabusCard from '../Cards/SyllabusCard';

const Others = () => {
    const [selectedFileCampusImage, setSelectedFileCampusImage] = useState(null);
    const [selectedFileLillahBoardingImage, setSelectedFileLillahBoardingImage] = useState(null);
    const [selectedFileEbookImage, setSelectedFileEbookImage] = useState(null);
    const [selectedFileEbookPdf, setSelectedFileEbookPdf] = useState(null);
    const [selectedFileSyllabusPdf, setSelectedFileSyllabusPdf] = useState(null);
    const [campusImages, setCampusImages] = useState([]);
    const [headline, setHeadline] = useState([]);
    const [ebooks, setEbooks] = useState([]);
    const [syllabuses, setSyllabuses] = useState([]);
    const [lillahImages, setLillahImages] = useState([]);
    const [successMessage, setSucsessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleFileChangeCampus = (e) => {
        const file = e.target.files[0];
        setSelectedFileCampusImage(file);
    };
    const handleFileChangeLillah = (e) => {
        const file = e.target.files[0];
        setSelectedFileLillahBoardingImage(file);
    };
    const handleFileChangeEbookImage = (e) => {
        const file = e.target.files[0];
        setSelectedFileEbookImage(file);
    };
    const handleFileChangeEbookPdf = (e) => {
        const file = e.target.files[0];
        setSelectedFileEbookPdf(file);
    };
    const handleFileChangeSyllabusPdf = (e) => {
        const file = e.target.files[0];
        setSelectedFileSyllabusPdf(file);
    };

    useEffect(() => {
        fetchDataCampusImage();
        fetchDataHeadline();
        fetchDataEbook();
        fetchDataSyllabus();
        fetchDataLillahBoardingImage();
    }, [])

    const handleCampusImageSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append('image', selectedFileCampusImage);

        try {
            const response = await axiosInstance.post('/postcampusimage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setSucsessMessage('Campus image Added Successfully!');
            setErrorMessage('');
            event.target.reset();
            setSelectedFileCampusImage(null);
            fetchDataCampusImage()
            setTimeout(() => {
                setSucsessMessage('');
            }, 3000);
        } catch (error) {
            console.error('Failed to add Campus image:', error);
            setErrorMessage('Failed to add Campus Image. Please try again.');
            setSucsessMessage('');

            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };
    const handleLillahBoardingImageSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append('image', selectedFileLillahBoardingImage);

        try {
            const response = await axiosInstance.post('/postlillahBoardingimage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setSucsessMessage('Lillah Boarding image Added Successfully!');
            setErrorMessage('');
            fetchDataLillahBoardingImage();
            event.target.reset();
            setSelectedFileLillahBoardingImage(null);
            setTimeout(() => {
                setSucsessMessage('');
            }, 3000);
        } catch (error) {
            console.error('Failed to add Lillah boarding image:', error);
            setErrorMessage('Failed to add Lillah boarding Image. Please try again.');
            setSucsessMessage('');

            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };
    const handleHeadlineSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const headline = form.headline.value;
        console.log("Headline value:", headline);
        const formData = new FormData();
        formData.append('headline', headline);

        try {
            const response = await axiosInstance.post('/headline', formData);
            console.log("Server Response:", response.data);
            setSucsessMessage('Headline Added Successfully!');
            setErrorMessage('');
            event.target.reset();
            fetchDataHeadline()
            setTimeout(() => {
                setSucsessMessage('');
            }, 3000);
        } catch (error) {
            console.error("Error submitting headline:", error);
            setErrorMessage('Failed to add Headline. Please try again.');
            setSucsessMessage('');

            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };

    const handleEBookSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const book_name = form.book_name.value;
        const formData = new FormData();
        formData.append('book_name', book_name);
        formData.append('imageEbook', selectedFileEbookImage);
        formData.append('pdf', selectedFileEbookPdf);
        try {
            const response = await axiosInstance.post('/ebook', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setSucsessMessage('Ebook Added Successfully!');
            setErrorMessage('');
            event.target.reset();
            fetchDataEbook();
            setSelectedFileEbookImage(null)
            setSelectedFileEbookPdf(null);
            setTimeout(() => {
                setSucsessMessage('');
            }, 3000);
        } catch (error) {
            setErrorMessage('Failed to add Ebook. Please try again.');
            setSucsessMessage('');

            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };
    const handleSyllabusSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const syllabus_name = form.syllabus_name.value;
        const formData = new FormData();
        formData.append('syllabus_name', syllabus_name);
        formData.append('pdf', selectedFileSyllabusPdf);
        try {
            const response = await axiosInstance.post('/postsyllabus', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setSucsessMessage('Syllabus Added Successfully!');
            setErrorMessage('');
            event.target.reset();
            fetchDataSyllabus();
            setSelectedFileEbookPdf(null);
            setTimeout(() => {
                setSucsessMessage('');
            }, 3000);
        } catch (error) {
            setErrorMessage('Failed to add Syllabus. Please try again.');
            setSucsessMessage('');

            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };

    // Get campus Images...
    const fetchDataCampusImage = async () => {
        try {
            const response = await axiosInstance.get('/campusimages');
            setCampusImages(response.data)
        } catch (error) {
            console.error('failed to fetch Campus Images', error)
        }
    };
    // Get campus Headline...
    const fetchDataHeadline = async () => {
        try {
            const response = await axiosInstance.get('/headline');
            setHeadline(response.data)
        } catch (error) {
            console.error('failed to fetch Headline', error)
        }
    };
    // Get campus Ebooks...
    const fetchDataEbook = async () => {
        try {
            const response = await axiosInstance.get('/ebooks');
            setEbooks(response.data)
        } catch (error) {
            console.error('failed to fetch Ebooks', error)
        }
    };
    // Get Syllabus Data
    const fetchDataSyllabus = async () => {
        try {
            const response = await axiosInstance.get('/syllabuses');
            setSyllabuses(response.data)
            console.log(response.data)
        } catch (error) {
            console.error('failed to fetch Syllabus', error)
        }
    };
    const fetchDataLillahBoardingImage = async () => {
        try {
            const response = await axiosInstance.get('/lillahBoardingimages');
            setLillahImages(response.data)
            console.log(response.data)
        } catch (error) {
            console.error('failed to fetch Lillah Image', error)
        }
    };

    // Delete...
    const handleDeleteCampusImage = (deleteCampusImageId) => {
        setCampusImages((prevCampusImage) => prevCampusImage.filter((campusimage) => campusimage._id !== deleteCampusImageId))
        fetchDataCampusImage();
    };
    const handleDeleteHeadline = (deleteHeadlineId) => {
        setHeadline((prevHeadline) => prevHeadline.filter((headline) => headline.id !== deleteHeadlineId))
        fetchDataHeadline();
    };
    const handleDeleteEbook = (deleteEbooksId) => {
        setEbooks((prevEbooks) => prevEbooks.filter((ebook) => ebook.id !== deleteEbooksId))
        fetchDataEbook();
    };
    const handleDeleteSyllabus = (deleteEbooksId) => {
        setSyllabuses((prevSyllabus) => prevSyllabus.filter((syllabus) => syllabus.id !== deleteEbooksId))
        fetchDataSyllabus();
    };
    const handleDeleteLillahImage = (lillahImageId) => {
        setLillahImages((lillahimages) => lillahimages.filter((lillah) => lillah.id !== lillahImageId))
        fetchDataLillahBoardingImage();
    };
    return (
        <div>
            <div className='grid grid-cols-3 gap-5'>
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

                <form onSubmit={handleHeadlineSubmit} className="admin col-span-2 bg-white p-8 rounded shadow-md w-full">
                    <h2 className="text-2xl font-bold mb-4 text-center">Add Headline</h2>


                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-600 mb-1">Headline</label>
                        <textarea
                            name="headline"
                            rows="10"
                            className="w-full px-4 py-2 text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded resize-none"
                            placeholder="Enter Headline Here..."
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="bg-[#DAA520] text-white px-4 py-2 rounded-md hover:bg-[#DAC520] duration-300"
                    >
                        Add Headline
                    </button>
                </form>
                <form onSubmit={handleEBookSubmit} className="admin bg-white p-8 rounded shadow-md ">
                    <h2 className="text-2xl font-bold mb-4 text-center">Add E-BOOK</h2>
                    <div className="relative border-dashed border-2 border-gray-300 bg-gray-50 rounded-md p-6 group mb-5">
                        <input
                            encType="multipart/form-data"
                            type="file"
                            name='imageEbook'
                            className="hidden"
                            id="fileInput2"
                            onChange={handleFileChangeEbookImage}
                            required
                            accept='.jpg,.png, .gif, .jpeg'
                        />
                        <label
                            htmlFor="fileInput2"
                            className="cursor-pointer block text-gray-500 hover:text-gray-700 duration-300"
                        >
                            <div className="flex justify-center items-center">
                                <CiSquarePlus className='text-xl mr-2' />
                                <span>Choose a image file</span>
                            </div>
                        </label>
                        <p className="text-xs text-center text-gray-500 mt-2">PNG, JPG, GIF up to 5MB</p>

                        {selectedFileEbookImage && (
                            <div className="mt-4">
                                <span className="text-sm font-medium text-gray-700">
                                    Selected file:
                                </span>
                                <p className="text-sm text-gray-500">{selectedFileEbookImage.name}</p>
                            </div>
                        )}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="result" className="block text-sm font-medium text-gray-600 mb-2">
                            Book (PDF)
                        </label>
                        <input
                            encType="multipart/form-data"
                            type="file"
                            id="inputPdf"
                            name="pdf"
                            accept=".pdf"
                            onChange={handleFileChangeEbookPdf}
                            required
                            className="w-full px-4 py-2 text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded"
                            
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-semibold text-gray-600 mb-1">Book Name</label>
                        <input
                            type="text"
                            name="book_name"
                            className="w-full px-4 py-2 text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded"
                            placeholder="Enter Ebook title"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#DAA520] text-white px-4 py-2 rounded-md hover:bg-[#DAC520] duration-300"
                    >
                        Add E-BOOK
                    </button>
                </form>
                <form onSubmit={handleSyllabusSubmit} className="admin bg-white p-8 rounded shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-center">Add Syllabus</h2>

                    <div className="mb-6">
                        <label htmlFor="result" className="block text-sm font-medium text-gray-600 mb-2">
                            Syllabus (PDF)
                        </label>
                        <input
                            encType="multipart/form-data"
                            type="file"
                            id="inputPdf"
                            name="pdf"
                            accept=".pdf"
                            onChange={handleFileChangeSyllabusPdf}
                            required
                            className="w-full px-4 py-2 text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-semibold text-gray-600 mb-1">Name</label>
                        <input
                            type="text"
                            name="syllabus_name"
                            className="w-full px-4 py-2 text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded"
                            placeholder="Enter syllabus title"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#DAA520] text-white px-4 py-2 rounded-md hover:bg-[#DAC520] duration-300"
                    >
                        Add Syllabus
                    </button>
                </form>
                <form onSubmit={handleLillahBoardingImageSubmit} className="admin bg-white p-8 rounded shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-center">Add Lillah Boarding Image</h2>
                    <div className="relative h-40 border-dashed border-2 border-gray-300 bg-gray-50 rounded-md p-6 group mb-5">
                        <input
                            encType="multipart/form-data"
                            type="file"
                            name='image'
                            className="hidden"
                            id="fileInputLillah"
                            onChange={handleFileChangeLillah}
                            accept='.jpg, .png, gif'
                            required
                        />
                        <label
                            htmlFor="fileInputLillah"
                            className="cursor-pointer block text-gray-500 hover:text-gray-700 duration-300"
                        >
                            <div className="flex justify-center items-center">
                                <CiSquarePlus className='text-xl mr-2' />
                                <span>Choose a image file</span>
                            </div>
                        </label>
                        <p className="text-xs text-center text-gray-500 mt-2">PNG, JPG, GIF up to 5MB</p>

                        {selectedFileLillahBoardingImage && (
                            <div className="mt-4">
                                <span className="text-sm font-medium text-gray-700">
                                    Selected file:
                                </span>
                                <p className="text-sm text-gray-500">{selectedFileLillahBoardingImage.name}</p>
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#DAA520] text-white px-4 py-2 rounded-md hover:bg-[#DAC520] duration-300"
                    >
                        Add Image
                    </button>
                </form>
                <form onSubmit={handleCampusImageSubmit} className="admin bg-white p-8 rounded shadow-md w-96">
                    <h2 className="text-2xl font-bold mb-4 text-center">Add Campus Image</h2>
                    <div className="relative h-40 border-dashed border-2 border-gray-300 bg-gray-50 rounded-md p-6 group mb-5">
                        <input
                            encType="multipart/form-data"
                            type="file"
                            name='image'
                            className="hidden"
                            id="fileInput"
                            onChange={handleFileChangeCampus}
                            accept='.jpg, .png, gif'
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

                        {selectedFileCampusImage && (
                            <div className="mt-4">
                                <span className="text-sm font-medium text-gray-700">
                                    Selected file:
                                </span>
                                <p className="text-sm text-gray-500">{selectedFileCampusImage.name}</p>
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#DAA520] text-white px-4 py-2 rounded-md hover:bg-[#DAC520] duration-300"
                    >
                        Add Image
                    </button>
                </form>
            </div>
            <div>
                
                <div className='grid grid-cols-3 gap-5 '>
                    <div className='col-span-3'>
                        <div className='bg-gray-800 mt-5 p-5 text-white rounded-t-md'>
                            <h1 className='text-xl font-bold uppercase '>Added cHeadline: {headline.length}</h1>
                        </div>
                        <div className=' w-full  rounded-b-md bg-lime-500 p-2 h-96 overflow-y-auto space-y-2 gap-5'>
                            {
                                headline.map(singleHeadline => <HeadlineCard
                                    key={singleHeadline._id}
                                    headlineData={singleHeadline}
                                    onDelete={handleDeleteHeadline}
                                ></HeadlineCard>)
                            }
                        </div>
                    </div>

                    <div>
                        <div className='bg-gray-800 mt-5 p-5 text-white rounded-t-md'>
                            <h1 className='text-xl font-bold uppercase '>Added campus image: {campusImages.length}</h1>
                        </div>
                        <div className=' w-full rounded-b-md bg-amber-300 p-2 h-96 overflow-y-auto grid grid-cols-3 gap-5'>
                            {
                                campusImages.map(campusimage => <CampusImageCard
                                    key={campusimage._id}
                                    campusData={campusimage}
                                    onDelete={handleDeleteCampusImage}
                                ></CampusImageCard>)
                            }
                        </div>
                    </div>

                    <div>
                        <div className='bg-gray-800 mt-5 p-5 text-white rounded-t-md'>
                            <h1 className='text-xl font-bold uppercase '>Added Ebooks: {ebooks.length}</h1>
                        </div>
                        <div className=' w-full rounded-b-md bg-[#8917f4] p-2 h-96 overflow-y-auto grid grid-cols-2 gap-5'>
                            {
                                ebooks.map(ebook => <EbookCard
                                    key={ebook._id}
                                    ebookData={ebook}
                                    onDelete={handleDeleteEbook}
                                ></EbookCard>)
                            }
                        </div>
                    </div>
                    <div>
                        <div className='bg-gray-800 mt-5 p-5 text-white rounded-t-md'>
                            <h1 className='text-xl font-bold uppercase '>Added Lillah Boarding Images: {lillahImages.length}</h1>
                        </div>
                        <div className=' w-full rounded-b-md bg-orange-500 p-2 h-96 overflow-y-auto grid grid-cols-3 gap-5'>
                            {
                                lillahImages.map(lillahImage => <LillahBoardingCard
                                    key={lillahImage._id}
                                    lillahImage={lillahImage}
                                    onDelete={handleDeleteLillahImage}
                                >

                                </LillahBoardingCard>)
                            }
                        </div>
                    </div>
                    <div className='col-span-3'>
                        <div className='bg-gray-800 mt-5 p-5 text-white rounded-t-md'>
                            <h1 className='text-xl font-bold uppercase '>Added Syllabuses: {syllabuses.length}</h1>
                        </div>
                        <div className=' w-full rounded-b-md bg-lime-500 p-2 h-96  overflow-y-auto space-y-3 gap-5'>
                            {
                                syllabuses.map(syllabus => <SyllabusCard
                                    key={syllabus._id}
                                    syllabus={syllabus}
                                    onDelete={handleDeleteSyllabus}
                                >

                                </SyllabusCard>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Others;