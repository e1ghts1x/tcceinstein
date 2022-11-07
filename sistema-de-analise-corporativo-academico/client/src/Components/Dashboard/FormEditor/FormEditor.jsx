import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Axios from "axios";
import Modal from "../../Modal/Modal";
import "./FormEditor.css"
import { config } from "../../../Services/api";

export default () => {
    const [showModal, setShowModal] = useState()
    const [titulo, setTitulo] = useState()
    const [body, setBody] = useState()
    const [perguntas, setPerguntas] = useState()

    const deleteQuestion = (questionId) => {
        Axios.post(`http://localhost:3001/api/deletequestion`, { id_pergunta: questionId }, config)
            .then((res) => {
                setShowModal(true)
                setTitulo("Sucesso!")
                setBody(res.data.msg)
                console.log(res)
            }).catch((err) => {
                console.log(err)
                setShowModal(true)
                setTitulo("Erro!")
                setBody(err.response.data.msg)
            })
    }

    useEffect(() => {
        Axios.get(`http://localhost:3001/api/formeditor`, config)
            .then((res) => {
                const mapa = res.data.result.map(pergunta => {
                    return (
                        <div key={pergunta.id_pergunta}>
                            <input name="input" key={pergunta.id_pergunta} value={pergunta.pergunta}></input>
                            <button onClick={() => { deleteQuestion(pergunta.id_pergunta) }}>Excluir</button>
                            <button>Alterar</button>
                        </div>
                    )
                })
                console.log(mapa)
                setPerguntas(mapa)
            }).catch((err) => {
                setShowModal(true)
                setTitulo("Erro!")
                setBody(err.response.data.msg)
            })
    }, [])


    return (
        <div>
            <div className="homeForm">
                <div className="leftForm">
                    <div className="cardForm">
                        {perguntas}
                        <input placeholder="Pergunta..."></input>
                        <button>Adcionar</button>
                    </div>
                </div>
            </div>
            <Modal onClose={() => { setShowModal(false) }} show={showModal} titulo={titulo} body={body} />
        </div>
    )
}