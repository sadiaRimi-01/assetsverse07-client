import React, { useState } from 'react';
import { Link } from 'react-router';
import ImgLogo from '../../assets/Blue and Black Minimalist Brand Logo.png';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg fixed w-full z-50">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">

                {/* Logo */}
                <Link to="/" className="flex items-center font-bold text-2xl md:text-3xl hover:text-white transition-colors">
                    ◆ AssetVerse
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center gap-6 font-medium text-lg">
                    <Link to="/" className="hover:text-indigo-200 transition-colors">Home</Link>
                    <Link to="/auth/registerEmploye" className="hover:text-indigo-200 transition-colors">Join as Employee</Link>
                    <Link to="/auth/registerHR" className="hover:text-indigo-200 transition-colors">Join as HR</Link>
                </ul>

                {/* Login Button */}
                <div className="hidden md:block">
                    <Link to="/login" className="bg-white text-indigo-600 font-semibold py-2 px-6 rounded-lg hover:bg-white/90 transition-all">
                        Login
                    </Link>
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="focus:outline-none"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 px-6 pb-4">
                    <ul className="flex flex-col gap-3 font-medium">
                        <Link to="/" className="hover:text-indigo-200 transition-colors" onClick={() => setMenuOpen(false)}>Home</Link>
                        <Link to="/employee" className="hover:text-indigo-200 transition-colors" onClick={() => setMenuOpen(false)}>Join as Employee</Link>
                        <Link to="/hr" className="hover:text-indigo-200 transition-colors" onClick={() => setMenuOpen(false)}>Join as HR</Link>
                        <Link to="/login" className="bg-white text-indigo-600 font-semibold py-2 px-6 rounded-lg mt-2 inline-block text-center hover:bg-white/90 transition-all" onClick={() => setMenuOpen(false)}>Login</Link>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
