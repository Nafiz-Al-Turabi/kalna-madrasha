import React from 'react';
import CampusImage from '../../Components/CampusImage/CampusImage';
import Description from '../../Components/Description/Description';
import News from '../../Components/News/News';
import Headline from '../../Components/Marquee/Marquee';
import MadrashaName2 from '../../Components/MadrashaName/MadrashaName2';

const Home = () => {
    return (
        <div className=' '>
            <div className=''>
                <MadrashaName2></MadrashaName2>
                <Headline></Headline>
                <CampusImage></CampusImage>
                <Description></Description>
                <News></News>
            </div>
        </div>
    );
};

export default Home;