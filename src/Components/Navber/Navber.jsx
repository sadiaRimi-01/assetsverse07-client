import React from 'react';
import ImgLogo from '../../assets/Blue and Black Minimalist Brand Logo.png'
import { Link } from 'react-router';
const Navber = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <Link to={""} className="hover:text-green-400 transition">Home</Link>
                        <Link to={""} className="hover:text-green-400 transition">Join as Employee</Link>
                        <Link to={""} className="hover:text-green-400 transition">Join as HR</Link>
                    </ul>
                </div>
                <Link className="logo text-[16px]  md:mx-4 font-semibold md:font-bold md:text-2xl lg:text-4xl">◆ AssetVerse

                </Link>
            </div>
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal gap-3 px-1">
                    <Link to={""} className="hover:text-blue-500 text-[17px] text-black logo transition">Home</Link>
                    <Link to={""} className="hover:text-blue-500 text-[17px] text-black logo transition">Join as Employee</Link>
                    <Link to={""} className="hover:text-blue-500 text-[17px] text-black logo transition">Join as HR</Link>
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Login</a>
            </div>
        </div>
    );
};

export default Navber;