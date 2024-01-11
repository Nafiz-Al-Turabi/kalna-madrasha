import React from 'react';
import logo from '../../assets/logo.png'
import { FaPhone, FaPhoneVolume } from 'react-icons/fa6';
import { MdMailOutline } from 'react-icons/md';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white ">
            <div className="max-w-7xl mx-auto md:flex justify-between  gap-6 p-4">
                <div className='flex  md:flex items-center  gap-5 mb-5 md:mb-0'>
                    <div className='hidden md:block'>
                        <img className='w-24 md:w-64' src={logo} alt="" />
                    </div>
                    <div className='md:hidden'>
                        <h3 className=" text-lg font-bold">কালনা আমিনিয়া ফাজিল (ডিগ্রী) মাদরাসা</h3>
                        <h3 className=" text-xs font-bold">পোস্টঃ অন্তাবুনিয়া, উপজেলাঃ কয়রা, জেলাঃ খুলনা।</h3>
                    </div>
                </div>
                <div>
                    <h1 className='text-2xl font-bold mb-4'>Important Links</h1>
                    <div className='space-y-4'>
                        <a className='block hover:text-[#DAA520] duration-300 hover:translate-x-5' href="https://bmeb.gov.bd/" target='blank'>বাংলাদেশ মাদরাসা শিক্ষা বোর্ড</a>
                        <a className='block hover:text-[#DAA520] duration-300 hover:translate-x-5' href="https://dme.gov.bd/" target='blank'>মাদ্রাসা শিক্ষা অধিদপ্তর</a>
                        <a className='block hover:text-[#DAA520] duration-300 hover:translate-x-5' href="https://iau.edu.bd/" target='blank'>ইসলামি আরবি বিশ্ববিদ্যালয়</a>
                        <a className='block hover:text-[#DAA520] duration-300 hover:translate-x-5' href="https://banbeis.gov.bd/" target='blank'>বাংলাদেশ শিক্ষাতথ্য ও পরিসংখ্যান ব্যুরো (ব্যানবেইস)</a>
                        <a className='block hover:text-[#DAA520] duration-300 hover:translate-x-5' href="https://teachers.gov.bd/" target='blank'>শিক্ষক বাতায়ন</a>
                        <a className='block hover:text-[#DAA520] duration-300 hover:translate-x-5' href="https://www.iu.ac.bd/" target='blank'>ইসলামি বিশ্ববিদ্যালয়</a>
                        <a className='block hover:text-[#DAA520] duration-300 hover:translate-x-5' href="https://www.moedu.gov.bd/" target='blank'>শিক্ষা মন্ত্রণালয়</a>
                    </div>
                </div>
                <div className='space-y-3 mt-6 md:mt-0'>
                    <h1 className='text-2xl font-bold mb-4'>Contact Us</h1>
                    <div className='flex  items-center gap-5'>
                        <FaPhoneVolume className='text-xl' />
                        <div>
                            <h3 className='uppercase'>Phone</h3>
                            <p>01747206719</p>
                        </div>
                    </div>
                    <div className='flex  items-center gap-5'>
                        <FaPhoneVolume className='text-xl' />
                        <div>
                            <h3 className='uppercase'>Phone</h3>
                            <p>01747206719</p>
                        </div>
                    </div>
                    <div className='flex  items-center gap-5'>
                        <MdMailOutline className='text-xl' />
                        <div>
                            <h3 className='uppercase'>Email</h3>
                            <p>mail@gmail.com</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className="text-sm text-center bg-[#DAA520] p-2">
                <p>&copy; {new Date().getFullYear()} Kalna Amina Fazil (Degree) Madrasah. All rights reserved</p>
                <p>Developed By Mangrove Tech. </p>
            </div>
        </footer>
    );
};

export default Footer;
