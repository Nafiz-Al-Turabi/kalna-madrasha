import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';
import MadrashaName from '../Components/MadrashaName/MadrashaName';
import Footer from '../Shared/Footer/Footer';

const Main = () => {
    return (
        <div>
            <MadrashaName></MadrashaName>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;