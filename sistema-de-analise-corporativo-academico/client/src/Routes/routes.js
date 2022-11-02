import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "../Components/Dashboard/Dashboard";
import Home from "../Components/Home/Home";
import LoginAdmin from "../Components/LoginAdmin/LoginAdmin";
import NotFound from "../Components/NotFound/NotFound";
import Quest from "../Components/Quest/Quest";
import Register from "../Components/Register/Register";
import { RequireAuth } from "../Services/auth";

const Rotas = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/quest" element={<Quest/>}/>
                <Route path="/admin" element={<LoginAdmin/>}/>
                <Route path="/dashboard" element={<RequireAuth to="/admin"><Dashboard/></RequireAuth>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas