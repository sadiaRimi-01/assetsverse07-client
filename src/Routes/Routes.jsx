import { createBrowserRouter } from "react-router";
import HomePageLayout from "../Layouts/HomePageLayout";
import Home from "../Pages/Home";

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


]);