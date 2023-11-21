import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadImage from "./core/UploadImage";
import Signup from "./auth/Signup";
import Notfound from "./core/Notfound";
import Signin from "./auth/Signin";
import Collection from "./core/Collection";
import Search from "./core/Search";

const MyRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact Component={UploadImage}></Route>
                <Route path="/signup" exact Component={Signup}></Route>
                <Route path="/signin" exact Component={Signin}></Route>
                <Route path="/collection" exact Component={Collection}></Route>
                <Route path="/search" exact Component={Search}></Route>
                <Route path="*" exact Component={Notfound}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes;