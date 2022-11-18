import React, { useState, useEffect } from "react";
import Axios from "axios";
import Analysis from "./Analysis.module.css"
import Modal from "../../Modal/Modal";
import { config } from "../../../Services/api";

export default () => {
    const [showModal, setShowModal] = useState()
    const [titulo, setTitulo] = useState()
    const [body, setBody] = useState()

    return (
        <div>
            <div className={Analysis["homeForm"]}>
                <div className={Analysis["leftForm"]}>
                    <div className={Analysis["cardForm"]}>
                        <h1>Teste</h1>
                    </div>
                </div>
            </div>
            <Modal onClose={() => {{setShowModal(false)}}} show={showModal} titulo={titulo} body={body} />
        </div>
    )
}