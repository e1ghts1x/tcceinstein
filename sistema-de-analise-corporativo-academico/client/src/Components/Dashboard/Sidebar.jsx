import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartSimple } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import "./Sidebar.css"
import image from "../../res/saci-white.png"

export default function () {
    return (
        <div>
            <div id="sidebar" className="sidebar">
                <img src={image} />
                <a href="#analise" id="first"><FontAwesomeIcon icon={faChartSimple} /> Análise</a>
                <a href="#editarform"><FontAwesomeIcon icon={faPenToSquare} /> Editar Formulário</a>
                <a href="#config"><FontAwesomeIcon icon={faGear} /> Configurações</a>
            </div>
        </div>
    )
}