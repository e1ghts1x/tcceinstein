import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import Axios from "axios";
import { config } from "../../Services/api";
import "./Dashboard.css"
import Sidebar from "./Sidebar";
import FormEditor from "./FormEditor/FormEditor";

export default () => {
    const navigate = useNavigate()
    const [resultado, setResultado] = useState()

    const handleTest = () => {
        Axios.get(`http://localhost:3001/api/dashboard`, config)
            .then((res) => {
                setResultado(res.data)
                console.log(res.data)
            })
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/admin") //Aprimorar
    }


    return (
        <div className="dashboard">
            <div className="leftDash">
                <Sidebar />
            </div>
            <div className="rightDash">
                <div className="container">
                    <button onClick={handleLogout}>Logout</button>
                    <button onClick={handleTest}>Testar</button>
                </div>
                <FormEditor></FormEditor>
            </div>
        </div>
    )
}