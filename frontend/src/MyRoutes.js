import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadImage from "./core/UploadImage";

const MyRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact Component={UploadImage}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes;