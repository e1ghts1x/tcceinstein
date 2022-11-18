import React, {useState} from "react";
import FormEditor from "./FormEditor/FormEditor";
import Analysis from "./Analysis/Analysis";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartSimple } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import sidebar from "./Sidebar.module.css"
import image from "../../res/saci-white.png"
import { useEffect } from "react";

export default function () {

    const [ showEditForm, setShowEditForm ] = useState(false);
    const [ showAnalysis, setShowAnalysis ] = useState(false);
    const [ showConfig, setShowConfig ] = useState(false);

    function openNav() {
        document.getElementById("sidebar").style.display = "";
        document.getElementById("homeForm").style.marginLeft = "5vh"
        document.getElementById("homeForm").style.width = ""
    } 

    function closeNav() {
        document.getElementById("sidebar").style.display = "none";
        document.getElementById("homeForm").style.marginLeft = "0"
        document.getElementById("homeForm").style.width = "80%"
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
            <div id="sidebar" className={sidebar["sidebar"]}>
                <p className={sidebar["closebtn"]} onClick={closeNav}>&times;</p>
                <img src={image} />
                <a href="#" id="first" onClick={handleAnalysisClick}><FontAwesomeIcon icon={faChartSimple} /> Análise</a>
                <a href="#" onClick={handleFormClick}><FontAwesomeIcon icon={faPenToSquare} /> Editar Formulário</a>
                <a href="#" onClick={handleConfigClick}><FontAwesomeIcon icon={faGear} /> Configurações</a>
            </div>
            <div id="main" className={sidebar["main"]}>
                <button className={sidebar["openbtn"]} onClick={openNav}>&#9776;</button>
            </div>
            {showAnalysis && <Analysis/>}
            {showEditForm && <FormEditor/>}
            {showConfig}
        </div>
    )
}