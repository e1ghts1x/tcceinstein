import React, {useState} from "react";
import FormEditor from "./FormEditor/FormEditor";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartSimple } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import "./Sidebar.css"
import image from "../../res/saci-white.png"

export default function () {

    const [ showEditForm, setShowEditForm ] = useState(false);
    const [ showAnalysis, setShowAnalysis ] = useState(false);
    const [ showConfig, setShowConfig ] = useState(false);


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

    return (
        <div>
            <div id="sidebar" className="sidebar">
                <img src={image} />
                <a href="#" id="first" onClick={handleAnalysisClick}><FontAwesomeIcon icon={faChartSimple} /> Análise</a>
                <a href="#" onClick={handleFormClick}><FontAwesomeIcon icon={faPenToSquare} /> Editar Formulário</a>
                <a href="#" onClick={handleConfigClick}><FontAwesomeIcon icon={faGear} /> Configurações</a>
            </div>
            {showEditForm && <FormEditor/>}
            
        </div>
    )
}