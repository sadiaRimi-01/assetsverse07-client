import React, { useEffect } from 'react';
import error from '../assets/error-404.png'
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navber/Navber';
import Footer from '../Components/Footer/Footer';


const ErrorPage = () => {
    useEffect(() => {
        document.title = 'Error';
    }, []);

    return (
        <div className="">
         <Navbar></Navbar>
            <div className='bg-amber-50 min-h-screen flex flex-col justify-center items-center text-center'>
                <img className='max-w-3/12 items-center' src={error} alt="" />
                <div className='text-center'>
                    <h1 className='text-6xl font-bold text-blue-700'>Oops, page not found!</h1>
                    <p className='mt-5 text-gray-500'>The page you are looking for is not available.</p>
                </div>
                <Link
                    to="/"
                    className="btn mt-4 text-white w-[145px] p-2 bg-linear-to-bl from-violet-500 to-fuchsia-500 hover:scale-105 hover:bg-red-600"
                >
                    Back Home
                </Link>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default ErrorPage;