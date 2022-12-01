import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import Axios from "axios";
import jwtdecode from "jwt-decode"
import { config } from "../../Services/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Dashboard from "./Dashboard.module.css"
import Sidebar from "./Sidebar";

export default () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token");
    const decodedToken = jwtdecode(token)
    const User = decodedToken.username
    const capitalizedUser = User.charAt(0).toUpperCase() + User.slice(1)

    const handleLogout = () => {
        localStorage.removeItem("token")
        delete Axios.defaults.headers.common['Authorization']
        navigate("/admin") //Aprimorar
    }

    return (
        <div>
            <div className={Dashboard["dashboard"]}>
                <div className={Dashboard["rightDash"]}>
                    <div className={Dashboard["container"]}>
                        <h4><FontAwesomeIcon icon={faUser} /> Usuário atual: {capitalizedUser}</h4>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
                <div className={Dashboard["leftDash"]}>
                    <Sidebar />
                </div>
            </div>
        </div>
    )
}