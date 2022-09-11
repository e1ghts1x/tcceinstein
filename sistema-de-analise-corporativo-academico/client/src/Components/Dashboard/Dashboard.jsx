import React from "react";
import "./Dashboard.css"
import image from "../../res/saci-white.png"

export default function () {
    return (
        <div>
            <div id="sidebar" className="sidebar">
                <img src={image} />
                <a href="#analise">Análise</a>
                <a href="#editarform">Editar Formulário</a>
                <a href="#config">Configurações</a>
            </div>
        </div>
    )
}