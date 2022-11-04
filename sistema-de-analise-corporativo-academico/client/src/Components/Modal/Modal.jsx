import React from "react"
import { Link } from "react-router-dom"
import "./Modal.css"

const Modal = props => {

    if(!props.show){
        return null
    }

    return (
        <div className="modal">
            <div className="modalConteudo">
                <div className="modalHeader">
                    <h4 className="modalTitle">{props.titulo || "Erro!"}</h4>
                </div>
                <div className="modalBody">{props.body || "Ocorreu um erro!"}</div>
                <div className="modalFooter">
                <Link to={props.pathToLocation || ''}><button className="modalButton" onClick={props.onClose}>{props.btnTitle || "Fechar"}</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Modal