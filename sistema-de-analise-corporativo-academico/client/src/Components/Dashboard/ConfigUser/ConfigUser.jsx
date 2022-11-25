import React,  { useState, useEffect } from "react";
import Axios from "axios";
import Modal from "../../Modal/Modal";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import ConfigUser from "./ConfigUser.module.css"
import { config, baseURL } from "../../../Services/api";

export default () => {
    const [reload, setReload] = useState(0)
    const [showModal, setShowModal] = useState()
    const [titulo, setTitulo] = useState()
    const [body, setBody] = useState()
    const [perguntas, setPerguntas] = useState()



    return(
        <div id="homeForm" className={ConfigUser["homeForm"]}>
            <div id="leftForm" className={ConfigUser["leftForm"]}>
                <div id="cardForm" className={ConfigUser["cardForm"]}>
                    <h2>Configurações de usuário administrador</h2>
                    <input placeholder="Usuário"></input>
                    <input placeholder="***********"></input>
                    <button>Trocar</button>
                </div>
                <div id="cardForm" className={ConfigUser["cardForm"]}>
                    <h2>Lista de usuários administradores</h2>
                </div>
            </div>
        </div>
    )
}
