import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import Dashboard from "../Components/Dashboard/Dashboard";
import Home from "../Components/Home/Home";
import LoginAdmin from "../Components/LoginAdmin/LoginAdmin";

const usuarioLogado = localStorage.getItem("@user");
const adminLogado = localStorage.getItem("@admin")

const Rotas = () => {
    return(
        <BrowserRouter>
            <Routes>
                {!usuarioLogado && <Route path='/' element={<Home logado={usuarioLogado}/>}/>}
                {adminLogado && <Route path='/admin' exact element={<Dashboard/>}/>}
                {!adminLogado && <Route path='/admin' element={<LoginAdmin adminLogado={adminLogado}/>}/>}
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas