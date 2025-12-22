
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

