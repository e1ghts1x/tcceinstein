import React from "react"
import "./Modal.css"

const Modal = props => {
    if(!props.show){
        return null
    }

    return (
        <div className="modal" onClick={props.onClose}>
            <div className="modalConteudo">
                <div className="modalHeader">
                    <h4 className="modalTitle">{props.titulo}</h4>
                </div>
                <div className="modalBody">{props.body}</div>
                <div className="modalFooter">
                    <button className="modalButton" onClick={props.onClose}>Fechar</button>
                </div>
            </div>
        </div>
    )
}

export default Modal