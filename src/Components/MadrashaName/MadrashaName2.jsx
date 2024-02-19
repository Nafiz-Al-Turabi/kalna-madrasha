import bg from '../../assets/bg3.jpg';
import React from 'react'

const MadrashaName2 = () => {
    return (
        <div className='block md:hidden lg:hidden text-center py-2 bg-cover' style={{ backgroundImage: `url(${bg})` }}>
            <div className='space-y-3'>
                <p className='  font-semibold'>ربِّ زِدْنِي عِلْماً</p>
                <h1 className='text-xl font-extrabold'>কালনা আমিনিয়া ফাজিল (ডিগ্রী) মাদরাসা</h1>
                <h2 className=' font-extrabold'>KALNA AMINIA FAZIL (DEGREE) MADRASAH</h2>
                <h3 className='text-lg font-bold'>স্থাপিত (১৯৩৫) || EIIN:117213 </h3>
                <h3 className='text-base font-bold'>পোস্টঃ অন্তাবুনিয়া, উপজেলাঃ কয়রা, জেলাঃ খুলনা।</h3>
            </div>
        </div>
    );
};

export default MadrashaName2;