import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../routes/home";
import Aliexpress from "../routes/aliexpress";
import Bolivia from "../routes/bolivia";

const router = createBrowserRouter([
    {
        path:'/',
        element: <Home />,
        errorElement: <h1>Error</h1>
    },
    {
        path:'/Bolivia',
        element: <Bolivia />,
    },
    {
        path:'/Aliexpress',
        element:  <Aliexpress />,
    },
]);

export default function Menu(){
    return (
        <RouterProvider router={router}/>
    );
}

