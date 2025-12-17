import { createBrowserRouter } from "react-router";
import HomePageLayout from "../Layouts/HomePageLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import JoinAsHR from "../Pages/JoinAsHR";
import JoinAsEmploye from "../Pages/JoinAsEmploye";
import AuthLayout from "../Layouts/AuthLayout";
import PrivateRoute from "../Components/PrivateRoute";
import Profile from "../Pages/Profile";
import DashboardLayout from "../dashboard/DashboardLayout";
import HrDashboard from "../dashboard/HR/HrDashboard";
import EmployeDashboard from "../dashboard/Employee/EmployeDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageLayout></HomePageLayout>,
    children:[
        {
            index:true,
           element:<Home></Home>
        }

    ]
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      { path: "login", element: <Login></Login>},
      { path: "registerHR", element: <JoinAsHR></JoinAsHR> },
      
      { path: "registerEmploye", element: <JoinAsEmploye></JoinAsEmploye> },
      
    ],
  },
 {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      { path: "hr", element: <HrDashboard /> },
      { path: "employee", element: <EmployeDashboard /> },
      { path: "hr/profile", element: <Profile /> },
      { path: "employee/profile", element: <Profile /> },
    ],
  },


]);