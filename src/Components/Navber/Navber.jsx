// import React, { useState } from 'react';
// import { Link } from 'react-router';
// import ImgLogo from '../../assets/Blue and Black Minimalist Brand Logo.png';

// const Navbar = () => {
//     const [menuOpen, setMenuOpen] = useState(false);

//     return (
//         <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg fixed w-full z-50">
//             <div className="container mx-auto flex justify-between items-center py-4 px-6">

//                 {/* Logo */}
//                 <Link to="/" className="flex items-center font-bold text-2xl md:text-3xl hover:text-white transition-colors">
//                     ◆ AssetVerse
//                 </Link>

//                 {/* Desktop Menu */}
//                 <ul className="hidden md:flex items-center gap-6 font-medium text-lg">
//                     <Link to="/" className="hover:text-indigo-200 transition-colors">Home</Link>
//                     <Link to="/auth/registerEmploye" className="hover:text-indigo-200 transition-colors">Join as Employee</Link>
//                     <Link to="/auth/registerHR" className="hover:text-indigo-200 transition-colors">Join as HR</Link>
//                 </ul>

//                 {/* Login Button */}
//                 <div className="hidden md:block">
//                     <Link to="/auth/login" className="bg-white text-indigo-600 font-semibold py-2 px-6 rounded-lg hover:bg-white/90 transition-all">
//                         Login
//                     </Link>
//                 </div>

//                 {/* Mobile Hamburger */}
//                 <div className="md:hidden">
//                     <button
//                         onClick={() => setMenuOpen(!menuOpen)}
//                         className="focus:outline-none"
//                     >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
//                         </svg>
//                     </button>
//                 </div>
//             </div>

//             {/* Mobile Menu */}
//             {menuOpen && (
//                 <div className="md:hidden bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 px-6 pb-4">
//                     <ul className="flex flex-col gap-3 font-medium">
//                         <Link to="/" className="hover:text-indigo-200 transition-colors" onClick={() => setMenuOpen(false)}>Home</Link>
//                         <Link to="/employee" className="hover:text-indigo-200 transition-colors" onClick={() => setMenuOpen(false)}>Join as Employee</Link>
//                         <Link to="/hr" className="hover:text-indigo-200 transition-colors" onClick={() => setMenuOpen(false)}>Join as HR</Link>
//                         <Link to="/login" className="bg-white text-indigo-600 font-semibold py-2 px-6 rounded-lg mt-2 inline-block text-center hover:bg-white/90 transition-all" onClick={() => setMenuOpen(false)}>Login</Link>
//                     </ul>
//                 </div>
//             )}
//         </nav>
//     );
// };

// export default Navbar;





import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import useRole from "../../hooks/useRole";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { role } = useRole();

  return (
    <div className="navbar bg-base-100 shadow-sm fixed w-full z-50">
      
      {/* NAVBAR START */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><Link to="/">Home</Link></li>

            {!user && (
              <>
                <li><Link to="/auth/registerEmploye">Join as Employee</Link></li>
                <li><Link to="/auth/registerHR">Join as HR</Link></li>
                <li><Link to="/auth/login">Login</Link></li>
              </>
            )}

            {user && (
              <>
                <li>
                  <Link to={role === "hr" ? "/dashboard/hr" : "/dashboard/employee"}>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="btn btn-ghost text-xl font-bold">
          ◆ AssetVerse
        </Link>
      </div>

      {/* NAVBAR CENTER (Desktop Menu) */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>

          {!user && (
            <>
              <li><Link to="/auth/registerEmploye">Join as Employee</Link></li>
              <li><Link to="/auth/registerHR">Join as HR</Link></li>
            </>
          )}

          {user && (
            <li>
              <Link to={role === "hr" ? "/dashboard/hr" : "/dashboard/employee"}>
                Dashboard
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* NAVBAR END */}
      <div className="navbar-end">
        {!user && (
          <Link to="/auth/login" className="btn btn-primary">
            Login
          </Link>
        )}

        {user && (
          <button onClick={logout} className="btn btn-error">
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;

