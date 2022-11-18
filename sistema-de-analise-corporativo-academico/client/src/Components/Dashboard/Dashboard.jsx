import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import Axios from "axios";
import { config } from "../../Services/api";
import Dashboard from "./Dashboard.module.css"
import Sidebar from "./Sidebar";

export default () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/admin") //Aprimorar
    }

    return (
        <div>
            <div className={Dashboard["dashboard"]}>
                <div className={Dashboard["rightDash"]}>
                    <div className={Dashboard["container"]}>
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