import React from 'react';
import bg from '../../assets/bg3.jpg';
import logo from '../../assets/logo.png'
import logo2 from '../../assets/logo2.png'

const MadrashaName = () => {
    return (
        <div className='hidden md:block text-gray-700 text-center  py-5 bg-cover'
            style={{ backgroundImage: `url(${bg})` }}>
            <div className='flex justify-between items-center px-5'>
                <img className='h-48' src={logo} alt="" />
                <div className='space-y-3'>
                    <p className=' text-2xl font-semibold'>ربِّ زِدْنِي عِلْماً</p>
                    <h1 className='text-3xl font-extrabold'>কালনা আমিনিয়া ফাজিল (ডিগ্রী) মাদরাসা</h1>
                    <h2 className='text-2xl font-extrabold'>KALNA AMINIA FAZIL (DEGREE) MADRASAH</h2>
                    <h3 className='text-xl font-bold'>স্থাপিত (১৯৩৫) || EIIN:117213 </h3>
                    <h3 className='text-xl font-bold'>পোস্টঃ অন্তাবুনিয়া, উপজেলাঃ কয়রা, জেলাঃ খুলনা।</h3>
                </div>
                <img className='h-48' src={logo2} alt="" />
            </div>

        </div>
    );
};

export default MadrashaName;
