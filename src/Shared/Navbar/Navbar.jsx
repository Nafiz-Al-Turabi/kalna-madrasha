import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { CiMenuBurger } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isIntroOpen, setIntroOpen] = useState(false);
    const [isAcademicOpen, setAcademicOpen] = useState(false);
    const [isAdmissionOpen, setAdmissionOpen] = useState(false);
    const [isHallOpen, setHallOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    const handleScroll = () => {
        // Adjust the scroll threshold based on your design
        const scrollThreshold = 350;
    
        // Check if the scroll position is beyond the threshold
        setIsSticky(window.scrollY > scrollThreshold);
      };
    
      useEffect(() => {
        // Add scroll event listener to handle scroll position
        window.addEventListener('scroll', handleScroll);
    
        // Cleanup the event listener when the component is unmounted
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleServices = () => {
        setIsServicesOpen(!isServicesOpen);
    };
    const toggleIntro = () => {
        setIntroOpen(!isIntroOpen);
    };
    const toggleAcademic = () => {
        setAcademicOpen(!isAcademicOpen);
    };
    const toggleAdmission = () => {
        setAdmissionOpen(!isAdmissionOpen);
    };
    const toggleHall = () => {
        setHallOpen(!isHallOpen);
    };
    // disable scrolling for mobile menu
    useEffect(() => {
        if (isOpen) {
          // Disable scrolling when the mobile menu is open
          document.body.style.overflow = 'hidden';
        } else {
          // Enable scrolling when the mobile menu is closed
          document.body.style.overflow = 'auto';
        }
    
        // Cleanup to enable scrolling when the component is unmounted
        return () => {
          document.body.style.overflow = 'auto';
        };
      }, [isOpen]);

    return (
        <nav className={`p-4 z-40 transition-all duration-300 bg-[#DAA520] ease-in-out ${isSticky ? 'fixed top-0 w-full bg-[#DAA520] shadow-lg' : ''}`}>
            <div className="max-w-7xl mx-auto flex justify-between md:justify-center ">
                {/* Logo */}
                <div className="md:hidden text-white text-lg font-bold uppercase">
                    <Link to="/"  >কালনা আমিনিয়া ফাজিল (ডিগ্রী) মাদরাসা</Link>
                </div>

                {/* Mobile Menu Toggler */}
                <div className="block lg:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-white hover:text-gray-300 focus:outline-none"
                    >
                        {isOpen ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 transform rotate-180 transition-transform duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 transform transition-transform duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex space-x-4">
                    <Link to="/" className="text-white hover:text-gray-300">
                        মূল পাতা
                    </Link>
                    {/* Services with dropdown */}
                    <div className="relative group">
                        <span
                            onClick={toggleServices}
                            className="flex items-center  text-white hover:text-gray-300 cursor-pointer select-none"
                        >
                            বিদ্যালয়ের তথ্য <IoIosArrowDown />
                        </span>
                        {/* Dropdown Menu */}

                        <div className={`absolute z-50 w-60 top-full left-0 bg-[#DAA520] shadow-xl rounded-lg origin-top text-white py-2 mt-2 space-y-2 ${isServicesOpen ? 'scale-y-full duration-300' : 'scale-y-0'}`}>
                            <Link to="/" className="block px-4 py-2 hover:text-gray-300">
                                শিক্ষক শিক্ষিকার তথ্য
                            </Link>
                            <Link to="/" className="block px-4 py-2 hover:text-gray-300">
                                ছাত্র-ছাত্রীর তথ্য
                            </Link>
                            <Link to="/" className="block px-4 py-2 hover:text-gray-300">
                                ম্যানেজিং কমিটি
                            </Link>
                        </div>

                    </div>
                    {/* End of Dropdown */}
                    <div className="relative group">
                        <span
                            onClick={toggleIntro}
                            className="flex items-center  text-white hover:text-gray-300 cursor-pointer select-none"
                        >
                            পরিচিতি <IoIosArrowDown />
                        </span>
                        {/* Dropdown Menu */}

                        <div className={`absolute z-50 w-60 top-full left-0 bg-[#DAA520] shadow-xl rounded-lg origin-top text-white py-2 mt-2 space-y-2 ${isIntroOpen ? 'scale-y-full duration-300' : 'scale-y-0'}`}>
                            <Link to="/" className="block px-4 py-2 hover:text-gray-300">
                                এক নজরে মাদরাসা
                            </Link>
                            <Link to="/" className="block px-4 py-2 hover:text-gray-300">
                                অধ্যক্ষের বাণী
                            </Link>
                            <Link to="/" className="block px-4 py-2 hover:text-gray-300">
                                কমপ্লেক্স
                            </Link>
                        </div>

                    </div>
                    {/* End of Dropdown */}
                    <div className="relative group">
                        <span
                            onClick={toggleAcademic}
                            className="flex items-center  text-white hover:text-gray-300 cursor-pointer select-none"
                        >
                            একাডেমিক  <IoIosArrowDown />
                        </span>
                        {/* Dropdown Menu */}

                        <div className={`absolute z-50 w-60 top-full left-0 bg-[#DAA520] shadow-xl rounded-lg origin-top text-white py-2 mt-2 space-y-2 ${isAcademicOpen ? 'scale-y-full duration-300' : 'scale-y-0'}`}>

                            <Link to="/" className="block px-4 py-2 hover:text-gray-300">
                                পাঠক্রম
                            </Link>
                            <Link to="/academicResult" className="block px-4 py-2 hover:text-gray-300">
                                ফলাফল
                            </Link>
                            <Link to="/" className="block px-4 py-2 hover:text-gray-300">
                                ছুটির তালিকা
                            </Link>
                            <Link to="/" className="block px-4 py-2 hover:text-gray-300">
                                পরীক্ষার রুটিন
                            </Link>
                        </div>

                    </div>
                    {/* End of Dropdown */}
                    <Link to="http://admission.iau.edu.bd/" target='blank' className="text-white hover:text-gray-300">
                        ভর্তি
                    </Link>
                    <Link to="/" className="text-white hover:text-gray-300">
                        লিল্লাহ বোর্ডিং
                    </Link>
                    
                    <Link to="/" className="text-white hover:text-gray-300">
                        ই-লাইব্রেরী
                    </Link>
                    <Link to="/contact" className="text-white hover:text-gray-300">
                        যোগাযোগ
                    </Link>
                    <Link to="/admin/dashboard" className="text-white hover:text-gray-300">
                        লগইন
                    </Link>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`lg:hidden h-full absolute z-50 top-[61px] left-0  w-full bg-[#DAA520]  transform origin-top transition-transform ${isOpen ? 'scale-y-100' : 'scale-y-0'
                        }`}
                >
                    <Link to="/" className="block px-4 py-2 text-white hover:text-gray-300" >
                        মূল পাতা
                    </Link>


                    {/* Services with dropdown */}
                    <div className="relative group">
                        <span
                            onClick={toggleServices}
                            className="flex items-center px-4 py-2 text-white hover:text-gray-300 cursor-pointer select-none"
                        >
                            বিদ্যালয়ের তথ্য <IoIosArrowDown />
                        </span>
                        {/* Dropdown Menu */}

                        <div className={`absolute z-50  top-full left-0 bg-[#DAA520] shadow-xl rounded-lg origin-top text-white py-2 mt-2 space-y-2 ${isServicesOpen ? 'scale-y-full duration-300' : 'scale-y-0'}`}>
                            <Link to="/" className="block px-4 py-2 hover:text-gray-300">
                                শিক্ষক শিক্ষিকার তথ্য
                            </Link>
                            <Link to="/" className="block px-4 py-2 hover:text-gray-300">
                                ছাত্র-ছাত্রীর তথ্য
                            </Link>
                            <Link to="/" className="block px-4 py-2 hover:text-gray-300">
                                ম্যানেজিং কমিটি
                            </Link>
                        </div>

                    </div>
                    <div className="relative group">
                        <span
                            onClick={toggleIntro}
                            className="flex items-center px-4 py-2 text-white hover:text-gray-300 cursor-pointer select-none"
                        >
                            পরিচিতি <IoIosArrowDown />
                        </span>
                        {/* Dropdown Menu */}

                        <div className={`absolute z-50   top-full left-0 bg-[#DAA520] shadow-xl rounded-lg origin-top text-white py-2 mt-2 space-y-2 ${isIntroOpen ? 'scale-y-full duration-300' : 'scale-y-0'}`}>
                            <Link to="/" className="block px-4 py-2 hover:text-gray-300">
                                এক নজরে মাদরাসা
                            </Link>
                            <Link to="/" className="block px-4 py-2 hover:text-gray-300">
                                অধ্যক্ষের বাণী
                            </Link>
                            <Link to="/" className="block px-4 py-2 hover:text-gray-300">
                                কমপ্লেক্স
                            </Link>
                        </div>

                    </div>
                    <div className="relative group">
                        <span
                            onClick={toggleAcademic}
                            className="flex items-center px-4 py-2 text-white hover:text-gray-300 cursor-pointer select-none"
                        >
                            একাডেমিক  <IoIosArrowDown />
                        </span>
                        {/* Dropdown Menu */}

                        <div className={`absolute z-50   top-full left-0 bg-[#DAA520] shadow-xl rounded-lg origin-top text-white py-2 mt-2 space-y-2 ${isAcademicOpen ? 'scale-y-full duration-300' : 'scale-y-0'}`}>

                            <Link to="/" className="block px-4 py-2 hover:text-gray-300">
                                পাঠক্রম
                            </Link>
                            <Link to="/" className="block px-4 py-2 hover:text-gray-300">
                                পরিক্ষার ফলাফল
                            </Link>
                            <Link to="/" className="block px-4 py-2 hover:text-gray-300">
                                ছুটির তালিকা
                            </Link>
                            <Link to="/" className="block px-4 py-2 hover:text-gray-300">
                                পরীক্ষার রুটিন
                            </Link>
                        </div>

                    </div>
                    <Link to="/" className="block px-4 py-2 text-white hover:text-gray-300">
                        ভর্তি
                    </Link>
                    <Link to="/" className="block px-4 py-2 text-white hover:text-gray-300">
                        লিল্লাহ বোর্ডিং
                    </Link>


                    {/* End of Dropdown */}
                    <Link to="/" className="block px-4 py-2 text-white hover:text-gray-300">
                        পাঠ্যসূচী(রুটিন)
                    </Link>
                    <Link to="/" className="block px-4 py-2 text-white hover:text-gray-300">
                        ই-লাইব্রেরী
                    </Link>
                    <Link to="/contact" className="block px-4 py-2 text-white hover:text-gray-300">
                        যোগাযোগ
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
