import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import "./Modal.css"

const Modal = props => {

    const escapeClose = (e) => {
        if((e.charCode || e.keyCode) === 27) {
            props.onClose()
        }
    }

    useEffect(() =>{
        document.body.addEventListener('keydown', escapeClose)
        return function cleanup() {
            document.body.removeEventListener('keydown', escapeClose)
        }
    }, [])

    if(!props.show){
        return null
    }

    return (
        <div className="modal" onClick={props.onClose}>
            <div className="modalConteudo" onClick={e => e.stopPropagation()}>
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