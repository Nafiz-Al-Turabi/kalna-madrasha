import React from 'react';
import CampusImage from '../../Components/CampusImage/CampusImage';
import Description from '../../Components/Description/Description';
import News from '../../Components/News/News';
import Headline from '../../Components/Marquee/Marquee';

const Home = () => {
    return (
        <div className=' '>
            <div className=''>
                <Headline></Headline>
                <CampusImage></CampusImage>
                <Description></Description>
                <News></News>
            </div>
        </div>
    );
};

export default Home;