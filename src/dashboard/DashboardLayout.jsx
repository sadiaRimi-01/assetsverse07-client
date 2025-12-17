import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const { role } = useRole();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="drawer md:drawer-open min-h-screen bg-base-200">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* MAIN CONTENT */}
      <div className="drawer-content flex flex-col">
        {/* TOP NAVBAR */}
        <div className="navbar bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6">
          <label htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden">☰</label>
          <div className="flex-1 text-xl font-bold">◆ AssetVerse</div>

          {/* PROFILE */}
          <div className="relative">
            <img
              onClick={() => setOpen(!open)}
              src={user?.photoURL || "https://i.ibb.co/ZxYp1Yv/user.png"}
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
            />
            {open && (
              <div className="absolute right-0 mt-2 w-44 bg-white text-black shadow rounded">
                <NavLink to="profile" className="block px-4 py-2 hover:bg-gray-100">
                  My Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 bg-base-100">
          <li className="menu-title">Dashboard</li>

          {role === "hr" ? (
            <>
              <li><NavLink to="/dashboard/hr">Asset List</NavLink></li>
              <li><NavLink to="/dashboard/hr/add-asset">Add Asset</NavLink></li>
              <li><NavLink to="/dashboard/hr/requests">All Requests</NavLink></li>
              <li><NavLink to="/dashboard/hr/employees">My Employee List</NavLink></li>
              <li><NavLink to="/dashboard/hr/upgrade">Upgrade Package</NavLink></li>
              <li><NavLink to="/dashboard/hr/profile">My Profile</NavLink></li>
            </>
          ) : (
            <>
              <li><NavLink to="/dashboard/employee">My Assets</NavLink></li>
              <li><NavLink to="/dashboard/employee/request">Request Asset</NavLink></li>
              <li><NavLink to="/dashboard/employee/team">My Team</NavLink></li>
              <li><NavLink to="/dashboard/employee/profile">My Profile</NavLink></li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
