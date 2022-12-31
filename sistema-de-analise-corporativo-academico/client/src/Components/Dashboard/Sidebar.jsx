import React from "react";
import Sidebar from "./Sidebar.module.css"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import jwtdecode from "jwt-decode";
import Axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartSimple } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faBars } from "@fortawesome/free-solid-svg-icons";
import sidebar from "./Sidebar.module.css"
import Analysis from "./Analysis/Analysis";
import FormEditor from "./FormEditor/FormEditor";
import ConfigUser from "./ConfigUser/ConfigUser";
import sacibanner from "../../res/saci-admin-white.png"

export default () => {
    const [showEditForm, setShowEditForm] = useState(false);
    const [showAnalysis, setShowAnalysis] = useState(false);
    const [showConfig, setShowConfig] = useState(false);

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

    const handleFormClick = () => {
        setShowEditForm(true)
        setShowAnalysis(false)
        setShowConfig(false)
    }

    const handleAnalysisClick = () => {
        setShowEditForm(false)
        setShowAnalysis(true)
        setShowConfig(false)
    }

    const handleConfigClick = () => {
        setShowEditForm(false)
        setShowAnalysis(false)
        setShowConfig(true)
    }

    useEffect(() => {
        handleAnalysisClick()
    }, [])


    return (
        <div>
            <div className={Sidebar["sidenav"]} id="sidenav">
                <img src={sacibanner} />
                <button onClick={handleAnalysisClick}><FontAwesomeIcon icon={faChartSimple} /><span> Análise</span></button>
                <button onClick={handleFormClick}><FontAwesomeIcon icon={faPenToSquare} /><span> Editor</span></button>
                <button onClick={handleConfigClick}><FontAwesomeIcon icon={faGear} /><span> Configurações</span></button>
            </div>
            <div className={Sidebar["main"]} id="main">
                <div className={Sidebar["navbarMain"]}>
                    <div className={Sidebar["logout"]}>
                        <h4> Usuário atual: {capitalizedUser}</h4>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
                <div className={Sidebar["cards"]}>
                    {showAnalysis && <Analysis />}
                    {showEditForm && <FormEditor />}
                    {showConfig && <ConfigUser />}
                </div>
            </div>
        </div>
    )
}