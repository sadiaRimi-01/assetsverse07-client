import React from 'react';
import HeroBanner from '../Components/Banner/HeroBanner';
import AboutSection from '../Components/Banner/AboutSection';
import BannerShow from '../Components/Banner/BannerShow';
import Testimonial from '../Components/Banner/Testimonial';
import ExtraSection from '../Components/Banner/ExtraSection';

const Home = () => {
    return (
        <div>
           <HeroBanner></HeroBanner>
           <AboutSection></AboutSection>
           <BannerShow></BannerShow>
           <Testimonial></Testimonial>
           <ExtraSection></ExtraSection>
        </div>
    );
};

export default Home;