import { createBrowserRouter } from "react-router-dom";

import React from 'react'
import Home from "../pages/Home";
import HomeA from "../pages/HomeA";



const router = createBrowserRouter([
    {
        path: "/",
        element: Home(),
    },
    {
        path: "/HomeA",
        element: HomeA()
    }
])

export {router}