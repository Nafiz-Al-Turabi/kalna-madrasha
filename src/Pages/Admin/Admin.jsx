import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { MdAdminPanelSettings, MdDashboard, MdOutlineTimeline } from "react-icons/md";
import { FaBuffer, FaHouse, FaNewspaper, FaRegNewspaper, FaRegNoteSticky, FaUserGraduate, FaWatchmanMonitoring } from "react-icons/fa6";
import { PiUsersFourBold } from "react-icons/pi";
import { ImUserTie } from "react-icons/im";
import ActiveAdminLink from '../../Components/ActiveAdminLink/ActiveAdminLink';
import { useAuth } from '../../Provider/AuthProvider';


const AdminPanel = () => {
    const navigate=useNavigate()
    const {logout}=useAuth();
    const [isSidebarOpen, setSidebarOpen] = useState(true); // Sidebar open by default on larger screens

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };


    return (
        <div className={`flex  h-screen bg-gray-100 ${isSidebarOpen ? 'overflow-hidden' : ''}`}>
            {/* Sidebar */}
            <aside
                className={`bg-slate-900 text-white w- md:w-64 min-h-screen p-2 transition-all duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0`}
            >
                <h1 className=' text-xl font-bold mb-10 flex items-center'><MdAdminPanelSettings className='bg-[#DAA520] w-8 h-8 p-1 mr-3 rounded-md' />Admin Panel</h1>
                <div className='space-y-2'>
                    <ActiveAdminLink to='/admin/dashboard'><MdDashboard className='mr-3' />Dashboard</ActiveAdminLink>
                    <ActiveAdminLink to='/admin/addStudent'><FaUserGraduate className='mr-3' />Add Student</ActiveAdminLink>
                    <ActiveAdminLink to='/admin/addTeacher'><ImUserTie className='mr-3' />Add Teacher</ActiveAdminLink>
                    <ActiveAdminLink to='/admin/addCommitte'><PiUsersFourBold className='mr-3' />Add Committee</ActiveAdminLink>
                    <ActiveAdminLink to='/admin/addNotice'><FaNewspaper className='mr-3' />Add Notice</ActiveAdminLink>
                    <ActiveAdminLink to='/admin/addResult'><FaRegNoteSticky className='mr-3' />Add Result</ActiveAdminLink>
                    <ActiveAdminLink to='/admin/addRoutine'><MdOutlineTimeline className='mr-3' />Add Routine</ActiveAdminLink>
                    <ActiveAdminLink to='/admin/addNews'><FaRegNewspaper className='mr-3' />Add News</ActiveAdminLink>
                    <ActiveAdminLink to='/admin/others'><FaBuffer className='mr-3' />Others</ActiveAdminLink>

                </div>
                <hr className='my-5' />
                <Link to='/' className='text-xl flex items-center p-2 bg-[#daa520]/20 rounded'><FaHouse className='mr-3' />Home</Link>
                <button  onClick={handleLogout} className='w-full mt-2 text-center text-xl flex items-center p-2 bg-[#daa520] rounded'>Logout</button>
                <button
                    className="lg:hidden text-gray-600 focus:outline-none"
                    onClick={toggleSidebar}
                >
                    &#9776; {/* Hamburger icon */}
                </button>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <header className="bg-[#DAA520] shadow-md p-4">
                    {/* Toggle Button (visible on mobile and tablet) */}
                    <button
                        className="lg:hidden text-gray-600 focus:outline-none"
                        onClick={toggleSidebar}
                    >
                        &#9776; {/* Hamburger icon */}
                    </button>
                    <span className="text-xl font-bold ml-4  text-white">কালনা আমিনিয়া ফাজিল (ডিগ্রী) মাদরাসা</span>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-x-hidden  overflow-y-auto bg-gray-200 p-4">
                    {/* Your page content goes here */}
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminPanel;
