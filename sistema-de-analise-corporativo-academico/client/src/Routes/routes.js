import React from "react";
import { BrowserRouter, Route, Routes, Link, } from "react-router-dom";

import Dashboard from "../Components/Dashboard/Dashboard";
import Home from "../Components/Home/Home";
import LoginAdmin from "../Components/LoginAdmin/LoginAdmin";
import Quest from "../Components/Quest/Quest";

const Rotas = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/quest" element={<Quest/>}/>
                <Route path="/admin" element={<LoginAdmin/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas