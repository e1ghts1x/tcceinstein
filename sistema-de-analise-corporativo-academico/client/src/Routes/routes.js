import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ConfirmEmail from "../Components/ConfirmEmail/ConfirmEmail";

import Dashboard from "../Components/Dashboard/Dashboard";
import Home from "../Components/Home/Home";
import IsLoading from "../Components/isLoading/IsLoading";
import LoginAdmin from "../Components/LoginAdmin/LoginAdmin";
import NotFound from "../Components/NotFound/NotFound";
import Quest from "../Components/Quest/Quest";
import Register from "../Components/Register/Register";
import ResendEmailConfirmation from "../Components/Register/ResendEmailConfirmation/ResendEmailConfirmation";
import Welcome from "../Components/Welcome/Welcome";
import { RequireAuth } from "../Services/auth";

const Rotas = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome/>}/>
                <Route path="/login" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path ="/email/confirmation/:token" element={<ConfirmEmail/>}/>
                <Route path = "/email/resend" element={<ResendEmailConfirmation/>}/>
                <Route path="/quest" element={<RequireAuth to="/login" verifyUrl="verifyuser"><Quest/></RequireAuth>}/>
                <Route path="/admin" element={<LoginAdmin/>}/>
                <Route path="/dashboard" element={<RequireAuth to="/admin" verifyUrl="verifyadmin"><Dashboard/></RequireAuth>}/>
                <Route path="*" element={<NotFound/>}/>
                <Route path="/testar" element={<IsLoading/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas