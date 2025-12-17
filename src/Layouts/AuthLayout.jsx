import React from 'react';
import Navbar from '../Components/Navber/Navber';
import Footer from '../Components/Footer/Footer';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div>
           <Navbar></Navbar>
            <div className='bg-base-200  mx w-full mx-auto '>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default AuthLayout;
