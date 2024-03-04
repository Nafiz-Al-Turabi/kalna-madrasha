import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Global/Axios/AxiosInstance';
import pdfImage from '../../assets/pdf.png'

const Routine = () => {
    const [routines, setRoutines] = useState([])


    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/routines');
            setRoutines(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching Routine:', error);
        }
    };

    const downloadPdf = async (routine) => {
        try {
            const response = await fetch(`http://localhost:5000/getimage?path=${routine.filePath}`);
            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${routine.title}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up after the download
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };
    const viewPdf = (routine) => {
        try {
            const viewerUrl = `http://localhost:5000/getimage?path=${routine.filePath}`;
            window.open(viewerUrl, '_blank');
        } catch (error) {
            console.error('Error viewing PDF:', error);
        }
    };
    return (
        <div>
            <h1 className='text-3xl font-bold text-center mt-5 text-gray-700'>পরীক্ষার রুটিন</h1>
            <div className='space-y-3 max-w-7xl mx-auto my-10'>
                {
                    routines.map(routineData =>
                        <div className='flex justify-between mx-4 items-center bg-slate-200 p-2  text-gray-700 overflow-hidden shadow-md rounded-md'>
                            <div className='flex items-center gap-5'>
                                <img src={pdfImage} alt="pdf" className='h-10' />
                                <h1 className='text-lg'>{routineData.title}</h1>
                            </div>

                            <div className='space-y-1'>
                                <button
                                    className='w-32 font-semibold rounded bg-red-500 text-white px-5 mr-5'
                                    onClick={() => downloadPdf(routineData)}
                                >
                                    Download
                                </button>
                                <button className='w-32 font-semibold rounded bg-cyan-500 text-white px-5 md:my-2' onClick={() => viewPdf(routineData)}>
                                    View result
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Routine;