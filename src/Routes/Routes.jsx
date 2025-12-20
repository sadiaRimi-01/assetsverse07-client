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
import HrRoutes from "./HrRoutes";
import AddAssets from "../dashboard/HR/AddAssets";
import UpgradePackage from "../dashboard/HR/UpgradePackage";
import MyEmployeeList from "../dashboard/HR/MyEmployeeList";
import AllRequestPage from "../dashboard/HR/AllRequestPage";
import RequestAssets from "../dashboard/Employee/RequestAssets";
import MyTeam from "../dashboard/Employee/MyTeam";
import PaymentSuccess from "../dashboard/HR/PaymentSuccess";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageLayout></HomePageLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>
      }

    ]
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      { path: "login", element: <Login></Login> },
      { path: "registerHR", element: <JoinAsHR></JoinAsHR> },

      { path: "registerEmploye", element: <JoinAsEmploye></JoinAsEmploye> },

    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      { path: "hr", element: <HrRoutes><HrDashboard /></HrRoutes> },
      { path: "hr/add-asset", element: <HrRoutes><AddAssets /></HrRoutes> },
      { path: "hr/employees", element: <HrRoutes><MyEmployeeList></MyEmployeeList></HrRoutes> },
      { path: "hr/requests", element: <HrRoutes><AllRequestPage></AllRequestPage></HrRoutes> },
      { path: "hr/upgrade", element: <HrRoutes><UpgradePackage></UpgradePackage></HrRoutes> },
      { path: "hr/payment-success", element: <HrRoutes><PaymentSuccess></PaymentSuccess></HrRoutes> },
      { path: "employee", element: <EmployeDashboard /> },
      { path: "employee/request", element: <RequestAssets></RequestAssets> },
      { path: "employee/team", element: <MyTeam></MyTeam> },

      { path: "hr/profile", element: <Profile /> },
      { path: "employee/profile", element: <Profile /> },
    ],
  },


]);