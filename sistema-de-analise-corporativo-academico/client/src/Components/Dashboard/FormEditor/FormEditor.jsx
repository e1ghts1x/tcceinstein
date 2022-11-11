import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import Modal from "../../Modal/Modal";
import "./FormEditor.css"
import { config } from "../../../Services/api";

export default () => {
    const [showModal, setShowModal] = useState()
    const [titulo, setTitulo] = useState()
    const [body, setBody] = useState()
    const [perguntas, setPerguntas] = useState()
    const [reload, setReload] = useState(0)
    const [ alter, setAlter ] = useState()

    const handleAlter = (e) => {
        e.preventDefault()
        setAlter(e.target.value)
    }

    const formik = useFormik({
        initialValues: {
            question: ""
        },
        validationSchema: yup.object({
            question: yup.string().required("O campo pergunta não pode ser vazio.")
        }),
        onSubmit: (values) => {
            Axios.post(`http://localhost:3001/api/addquestion`, {pergunta: values.question,}, config)
            .then((res) =>{
                setShowModal(true)
                setTitulo("Sucesso!")
                setBody(res.data.msg)
                console.log(res)
                setReload(1)
                values.question = ""
            }).catch((err) => {
                setShowModal(true)
                setTitulo("Erro!")
                setBody(err.response.data.msg)
                console.log(err)
            })
            setReload(0)
        }
    })
 
    const deleteQuestion = (questionId) => {
        Axios.post(`http://localhost:3001/api/deletequestion`, { id_pergunta: questionId }, config)
            .then((res) => {
                setShowModal(true)
                setTitulo("Sucesso!")
                setBody(res.data.msg)
                console.log(res)
                setReload(1)
            }).catch((err) => {
                console.log(err)
                setShowModal(true)
                setTitulo("Erro!")
                setBody(err.response.data.msg)
            })
        setReload(0)
    }

    const updateQuestion = (pergunta, questionId) => {
        Axios.post(`http://localhost:3001/api/updatequestion`, {pergunta: pergunta, id_pergunta: questionId}, config)
            .then((res) =>{
                setShowModal(true)
                setTitulo("Sucesso!")
                setBody(res.data.msg)
                setReload(1)
            }).catch((err) =>{
                setShowModal(true)
                setTitulo("Erro!")
                setBody(err.response.data.msg)
            })
            setReload(0)
    }

    useEffect(() => {
        Axios.get(`http://localhost:3001/api/formeditor`, config)
            .then((res) => {
                const mapa = res.data.result.map(pergunta => {
                    return (
                        <div key={pergunta.id_pergunta}>
                            <input name="inputPergunta" key={pergunta.id_pergunta} value={pergunta.pergunta} onChange={(e) => handleAlter(e)}></input>
                            <button type="button" onClick={() => { deleteQuestion(pergunta.id_pergunta) }}>Excluir</button>
                            <button type="button">Alterar</button>
                        </div>
                    )
                })
                console.log(mapa)
                setPerguntas(mapa)
            }).catch((err) => {
                setPerguntas()
                console.log(err.response.data.msg)
            })
    }, [reload])


    return (
        <div>
            <div className="homeForm">
                <div className="leftForm">
                    <div className="cardForm">
                        <Formik>
                            <form onSubmit={formik.handleSubmit}>
                                {perguntas}
                                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.question} name="question" placeholder="Pergunta..."></input>
                                {formik.touched.question && formik.errors.question ? (
                                <div className="error-message">{formik.errors.question}</div>
                                ) : null}
                                <button type="submit">Adicionar</button>
                            </form>
                        </Formik>
                    </div>
                </div>
            </div>
            <Modal onClose={() => {{setShowModal(false)}}} show={showModal} titulo={titulo} body={body} />
        </div>
    )
}