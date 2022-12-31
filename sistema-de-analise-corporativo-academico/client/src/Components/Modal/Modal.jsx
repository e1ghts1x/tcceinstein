import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import ModalCss from "./Modal.module.css"

const Modal = props => {

    const escapeClose = (e) => {
        if((e.charCode || e.keyCode) === 27) {
            props.onClose()
            console.log("cu")
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
        <div className={ModalCss["modal"]} onClick={props.onClose}> 
            <div className={ModalCss["modalConteudo"]} onClick={e => e.stopPropagation()}>
                <div className={ModalCss["modalHeader"]}>
                    <h4 className={ModalCss["modalTitle"]}>{props.titulo || "Erro!"}</h4>
                </div>
                <div className={ModalCss["modalBody"]}>{props.body || "Ocorreu um erro!"}</div>
                <div className={ModalCss["modalFooter"]}>
                <Link to={props.pathToLocation || ''}><button className={ModalCss["modalButton"]} onClick={props.onClose}>{props.btnTitle || "Fechar"}</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Modal