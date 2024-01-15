import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Global/Axios/AxiosInstance';
import pdfImage from '../../assets/pdf.png';

const AcademicResult = () => {
    const [results, setResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        resultData();
    }, []);

    const resultData = async () => {
        try {
            const response = await axiosInstance.get('/results');
            setResults(response.data);
            setFilteredResults(response.data); // Initialize filteredResults with all results
        } catch (error) {
            console.error('Error fetching results:', error);
        }
    };

    const downloadPdf = async (result) => {
        try {
            const response = await fetch(`http://localhost:5000/getimage?path=${result.filePath}`);
            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${result.title}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up after the download
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };

    const viewPdf = (result) => {
        try {
            const viewerUrl = `http://localhost:5000/getimage?path=${result.filePath}`;
            window.open(viewerUrl, '_blank');
        } catch (error) {
            console.error('Error viewing PDF:', error);
        }
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
      
        // Reset filteredResults to include all results when "All Categories" is selected
        if (category === '') {
          setFilteredResults(results);
        } else {
          // Filter results based on the selected category
          const filtered = results.filter((result) => result.class_name === category);
          setFilteredResults(filtered);
        }
      };

    const handleSearch = (term) => {
        setSearchTerm(term);
        // Filter results based on the search term
        const filtered = results.filter(
            (result) =>
                result.title.toLowerCase().includes(term.toLowerCase()) ||
                result.class_name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredResults(filtered);
    };
    return (
        <div className='max-w-7xl mx-auto'>
            <div className='flex flex-row-reverse md:flex-row justify-end gap-2'>
                <div className='flex items-center gap-5 p-2 rounded-lg'>
                    <input
                        type='text'
                        placeholder='Search...'
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        className='px-2 w-full md:w-64 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                    />
                </div>
                <div className='flex items-center gap-5 p-2 rounded-lg'>
                    <select
                        value={selectedCategory}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className='px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                    >
                        <option value=''>All Categories</option>
                        {/* Add options dynamically based on available categories */}
                        {Array.from(new Set(results.map((result) => result.class_name))).map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10'>

                {filteredResults.map((result, index) => (
                    <div key={index} className='flex mx-2 items-center gap-5 shadow-inner p-2 rounded-lg border border-[#DAA520]'>
                        <img src={pdfImage} className='h-28' alt='' />
                        <div>
                            <h1 className='text-xl font-bold'>{result.title}</h1>
                            <p className='text-lg text-[#DAA520]'>{result.class_name}</p>
                            <div>
                                <button
                                    className='text-lg font-semibold bg-red-500 text-white px-5 mr-5'
                                    onClick={() => downloadPdf(result)}
                                >
                                    Download
                                </button>
                                <button className='text-lg font-semibold bg-cyan-500 text-white px-5 md:my-2' onClick={() => viewPdf(result)}>
                                    View PDF
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AcademicResult;
