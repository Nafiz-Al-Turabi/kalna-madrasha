import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { FaGg } from 'react-icons/fa';
import axiosInstance from '../../Global/Axios/AxiosInstance';

const Headline = () => {
    const [headline, setHeadline] = useState([]);

    useEffect(() => {
        fetchDataHeadline();
    }, []);

    const fetchDataHeadline = async () => {
        try {
            const response = await axiosInstance.get('/headline');
            setHeadline(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('failed to fetch Headline', error);
        }
    };

    return (
        <div className='py-2'>
            <Marquee speed={100}>
                {headline.map((single, index) => (
                    <p key={index} className='flex items-center'>
                        <FaGg className='text-3xl mx-5 text-[#DAA520]' /> {single.headline}
                    </p>
                ))}
            </Marquee>
        </div>
    );
};

export default Headline;
