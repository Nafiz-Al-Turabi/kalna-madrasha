import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { CiMenuBurger } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
import './Navbar.css'
import AdminLogin from '../../Components/AdminLogin/AdminLogin';
import { useAuth } from '../../Provider/AuthProvider';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { isLoggedIn } = useAuth();


    const toggleLoginPopup = () => {
        setIsLoginOpen(!isLoginOpen);
    };

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

    const toggleMenu = (event) => {
        event.stopPropagation();
        setIsOpen(!isOpen);
        setActiveDropdown(null);
    };
    const toggleDropdown = (dropdown) => {
        if (activeDropdown === dropdown) {
            setActiveDropdown(null); // Close the current dropdown if it's already open
        } else {
            setActiveDropdown(dropdown);
        }
    };

    const closeDropdownOnOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setActiveDropdown(null);
        }
    };

    useEffect(() => {
        document.addEventListener('click', closeDropdownOnOutsideClick);

        return () => {
            document.removeEventListener('click', closeDropdownOnOutsideClick);
        };
    }, []);

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
        <nav className={`p-4 z-40 transition-all duration-300 bg-[#DAA520] ease-in-out ${isSticky ? 'navbar md:fixed  top-0 w-full lg:bg-[#DAA520] shadow-lg' : ''}`}>
            <div className="max-w-7xl mx-auto flex justify-between md:justify-center ">
                {/* Logo */}
                <div className="md:hidden text-white text-lg font-bold uppercase">
                    <Link onClick={() => toggleDropdown('')} to="/"  >কালনা আমিনিয়া ফাজিল মাদরাসা</Link>
                </div>

                {/* Mobile Menu Toggler */}
                <div className="block lg:hidden">
                    <button
                        onClick={(event) => toggleMenu(event)}
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
                    <Link onClick={() => toggleDropdown('')} to="/" className="text-white hover:text-gray-300">
                        মূল পাতা
                    </Link>
                    {/* Services with dropdown */}
                    <div className="relative group">
                        <span
                            onClick={() => toggleDropdown('services')}
                            className="flex items-center  text-white hover:text-gray-300 cursor-pointer select-none"
                        >
                            বিদ্যালয়ের তথ্য <IoIosArrowDown />
                        </span>
                        {/* Dropdown Menu */}

                        <div className={`absolute z-50 w-60 top-full left-0 bg-[#DAA520] shadow-xl rounded-lg origin-top text-white py-2 mt-2 space-y-2 ${activeDropdown === 'services' ? 'scale-y-full duration-300' : 'scale-y-0 duration-300'}`}>
                            <Link onClick={() => toggleDropdown('')} to="/teachers" className="block px-4 py-2 hover:text-gray-300">
                                শিক্ষক শিক্ষিকার তথ্য
                            </Link>
                            <Link onClick={() => toggleDropdown('')} to="/studentsInformation" className="block px-4 py-2 hover:text-gray-300">
                                ছাত্র-ছাত্রীর তথ্য
                            </Link>
                            <Link onClick={() => toggleDropdown('')} to="/committe" className="block px-4 py-2 hover:text-gray-300">
                                ম্যানেজিং কমিটি
                            </Link>
                        </div>

                    </div>
                    {/* End of Dropdown */}
                    <div className="relative group">
                        <span
                            onClick={() => toggleDropdown('intro')}
                            className="flex items-center  text-white hover:text-gray-300 cursor-pointer select-none"
                        >
                            পরিচিতি <IoIosArrowDown />
                        </span>
                        {/* Dropdown Menu */}

                        <div className={`absolute z-50 w-60 top-full left-0 bg-[#DAA520] shadow-xl rounded-lg origin-top text-white py-2 mt-2 space-y-2 ${activeDropdown === 'intro' ? 'scale-y-full duration-300' : 'scale-y-0 duration-300'}`}>
                            <Link onClick={() => toggleDropdown('')} to="/introduction" className="block px-4 py-2 hover:text-gray-300">
                                এক নজরে মাদরাসা
                            </Link>
                            <Link onClick={() => toggleDropdown('')} to="/principalSpeech" className="block px-4 py-2 hover:text-gray-300">
                                অধ্যক্ষের বাণী
                            </Link>
                            <Link onClick={() => toggleDropdown('')} to="/" className="block px-4 py-2 hover:text-gray-300">
                                কমপ্লেক্স
                            </Link>
                        </div>

                    </div>
                    {/* End of Dropdown */}
                    <div className="relative group">
                        <span
                            onClick={() => toggleDropdown('academic')}
                            className="flex items-center  text-white hover:text-gray-300 cursor-pointer select-none"
                        >
                            একাডেমিক  <IoIosArrowDown />
                        </span>
                        {/* Dropdown Menu */}

                        <div className={`absolute z-50 w-60 top-full left-0 bg-[#DAA520] shadow-xl rounded-lg origin-top text-white py-2 mt-2 space-y-2 ${activeDropdown === 'academic' ? 'scale-y-full duration-300' : 'scale-y-0 duration-300'}`}>

                            <Link onClick={() => toggleDropdown('')} to="/syllabuses" className="block px-4 py-2 hover:text-gray-300">
                                পাঠক্রম
                            </Link>
                            <Link onClick={() => toggleDropdown('')} to="/academicResult" className="block px-4 py-2 hover:text-gray-300">
                                ফলাফল
                            </Link>
                            
                            <Link onClick={() => toggleDropdown('')} to="/routines" className="block px-4 py-2 hover:text-gray-300">
                                পরীক্ষার রুটিন
                            </Link>
                        </div>

                    </div>
                    {/* End of Dropdown */}
                    <Link onClick={() => toggleDropdown('')} to="http://admission.iau.edu.bd/" target='blank' className="text-white hover:text-gray-300">
                        ভর্তি
                    </Link>
                    <Link onClick={() => toggleDropdown('')} to="/lillahBoarding" className="text-white hover:text-gray-300">
                        লিল্লাহ বোর্ডিং
                    </Link>

                    <Link onClick={() => toggleDropdown('')} to="/elibrary" className="text-white hover:text-gray-300">
                        ই-লাইব্রেরী
                    </Link>
                    <Link onClick={() => toggleDropdown('')} to="/contact" className="text-white hover:text-gray-300">
                        যোগাযোগ
                    </Link>
                    {isLoggedIn ?
                        <Link to='/admin/dashboard' className="text-white bg-yellow-500 px-5 py-0.5 rounded cursor-pointer">Admin Dashbord</Link>
                        :
                        <buttom onClick={toggleLoginPopup} className="text-white bg-yellow-500 px-5 py-0.5 rounded cursor-pointer">
                            লগইন
                        </buttom>
                    }
                </div>

                {/* Mobile Menu */}
                <div
                    className={`lg:hidden h-full absolute z-50 top-[61px] left-0  w-full bg-black  transform origin-top transition-transform ${isOpen ? 'scale-y-100' : 'scale-y-0'
                        }`}
                >
                    <Link onClick={toggleMenu} to="/" className="block text-xl my-5 bg-gray-500/30 mx-3  px-4 py-2 text-white hover:text-gray-300" >
                        মূল পাতা
                    </Link>


                    {/* Services with dropdown */}
                    <div className="relative group ">
                        <span
                            onClick={() => toggleDropdown('services')}
                            className="flex items-center text-xl bg-gray-500/30 mx-3 my-5 px-4 py-2 text-white hover:text-gray-300 cursor-pointer select-none"
                        >
                            বিদ্যালয়ের তথ্য <IoIosArrowDown />
                        </span>
                        {/* Dropdown Menu */}

                        <div className={`absolute z-50  top-full left-0 bg-black rounded-lg origin-top text-white py-2 mt-2 space-y-2 ${activeDropdown === 'services' ? 'scale-y-full duration-300' : 'scale-y-0 duration-300'}`}>
                            <Link onClick={toggleMenu} to="/teachers" className="block text-xl my-5 mx-3  px-4 py-2 hover:text-gray-300">
                                শিক্ষক শিক্ষিকার তথ্য
                            </Link>
                            <Link onClick={toggleMenu} to="/studentsInformation" className="block text-xl my-5 mx-3  px-4 py-2 hover:text-gray-300">
                                ছাত্র-ছাত্রীর তথ্য
                            </Link>
                            <Link onClick={toggleMenu} to="/committe" className="block text-xl my-5 mx-3  px-4 py-2 hover:text-gray-300">
                                ম্যানেজিং কমিটি
                            </Link>
                        </div>

                    </div>
                    <div className="relative group ">
                        <span
                            onClick={() => toggleDropdown('intro')}
                            className="flex items-center text-xl bg-gray-500/30 mx-3 my-5 px-4 py-2 text-white hover:text-gray-300 cursor-pointer select-none"
                        >
                            পরিচিতি <IoIosArrowDown />
                        </span>
                        {/* Dropdown Menu */}

                        <div className={`absolute z-50   top-full left-0 bg-black rounded-lg origin-top text-white py-2 mt-2 space-y-2 ${activeDropdown === 'intro' ? 'scale-y-full duration-300' : 'scale-y-0 duration-300'}`}>
                            <Link onClick={toggleMenu} to="/introduction" className="block text-xl my-5 mx-3  px-4 py-2 hover:text-gray-300">
                                এক নজরে মাদরাসা
                            </Link>
                            <Link onClick={toggleMenu} to="/principalSpeech" className="block text-xl my-5 mx-3  px-4 py-2 hover:text-gray-300">
                                অধ্যক্ষের বাণী
                            </Link>
                            <Link onClick={toggleMenu} to="/" className="block text-xl my-5 mx-3  px-4 py-2 hover:text-gray-300">
                                কমপ্লেক্স
                            </Link>
                        </div>

                    </div>
                    <div className="relative group ">
                        <span
                            onClick={() => toggleDropdown('academic')}
                            className="flex items-center text-xl bg-gray-500/30 mx-3 my-5 px-4 py-2 text-white hover:text-gray-300 cursor-pointer select-none"
                        >
                            একাডেমিক  <IoIosArrowDown />
                        </span>
                        {/* Dropdown Menu */}

                        <div className={`absolute z-50   top-full left-0 bg-black rounded-lg origin-top text-white py-2 mt-2 space-y-2 ${activeDropdown === 'academic' ? 'scale-y-full duration-300' : 'scale-y-0 duration-300'}`}>

                            <Link onClick={toggleMenu} to="/" className="block text-xl my-5 mx-3  px-4 py-2 hover:text-gray-300">
                                পাঠক্রম
                            </Link>
                            <Link onClick={toggleMenu} to="/academicResult" className="block text-xl my-5 mx-3  px-4 py-2 hover:text-gray-300">
                                পরিক্ষার ফলাফল
                            </Link>
                            <Link onClick={toggleMenu} to="/routines" className="block text-xl my-5 mx-3  px-4 py-2 hover:text-gray-300">
                                পরীক্ষার রুটিন
                            </Link>
                        </div>

                    </div>
                    <Link onClick={toggleMenu} to="http://admission.iau.edu.bd/" target='blank' className="block text-xl my-5 bg-gray-500/30 mx-3  px-4 py-2 text-white hover:text-gray-300">
                        ভর্তি
                    </Link>
                    <Link onClick={toggleMenu} to="/lillahBoarding" className="block text-xl my-5 bg-gray-500/30 mx-3  px-4 py-2 text-white hover:text-gray-300">
                        লিল্লাহ বোর্ডিং
                    </Link>


                    {/* End of Dropdown */}
                    <Link onClick={toggleMenu} to="/" className="block text-xl my-5 bg-gray-500/30 mx-3  px-4 py-2 text-white hover:text-gray-300">
                        পাঠ্যসূচী(রুটিন)
                    </Link>
                    <Link onClick={toggleMenu} to="/elibrary" className="block text-xl my-5 bg-gray-500/30 mx-3  px-4 py-2 text-white hover:text-gray-300">
                        ই-লাইব্রেরী
                    </Link>
                    <Link onClick={toggleMenu} to="/contact" className="block text-xl my-5 bg-gray-500/30 mx-3  px-4 py-2 text-white hover:text-gray-300">
                        যোগাযোগ
                    </Link>
                </div>
            </div>
            <AdminLogin isOpen={isLoginOpen} onClose={toggleLoginPopup} />
        </nav>
    );
};

export default Navbar;
