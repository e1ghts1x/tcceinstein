import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import Modal from "../../Modal/Modal";
import FormEditor from "./FormEditor.module.css"
import { config, baseURL } from "../../../Services/api";

export default () => {
    const [showModal, setShowModal] = useState()
    const [titulo, setTitulo] = useState()
    const [body, setBody] = useState()
    const [perguntas, setPerguntas] = useState()
    const [reload, setReload] = useState(0)

    const formik = useFormik({
        initialValues: {
            question: ""
        },
        validationSchema: yup.object({
            question: yup.string().required("O campo pergunta não pode ser vazio.")
        }),
        onSubmit: (values) => {
            Axios.post(`${baseURL}/addquestion`, { pergunta: values.question, }, config)
                .then((res) => {
                    setShowModal(true)
                    setTitulo("Sucesso!")
                    setBody(res.data.msg)
                    setReload(1)
                    values.question = ""
                }).catch((err) => {
                    setShowModal(true)
                    setTitulo("Erro!")
                    setBody(err.response.data.msg || "Ocorreu um erro!")
                })
            setReload(0)
        }
    })

    const deleteQuestion = (questionId) => {
        Axios.post(`${baseURL}/deletequestion`, { id_pergunta: questionId }, config)
            .then((res) => {
                setShowModal(true)
                setTitulo("Sucesso!")
                setBody(res.data.msg || "Sucesso!")
                setReload(1)
            }).catch((err) => {
                setShowModal(true)
                setTitulo("Erro!")
                setBody(err.response.data.msg || "Sucesso!")
            })
        setReload(0)
    }

    const updateQuestion = (pergunta, questionId) => {
        Axios.post(`${baseURL}/updatequestion`, { pergunta: pergunta, id_pergunta: questionId }, config)
            .then((res) => {
                setShowModal(true)
                setTitulo("Sucesso!")
                setBody(res.data.msg || "Sucesso!")
                setReload(1)
            }).catch((err) => {
                setShowModal(true)
                setTitulo("Erro!")
                setBody(err.response.data.msg || "Ocorreu um erro!")
            })
        setReload(0)
    }

    useEffect(() => {
        Axios.get(`${baseURL}/formeditor`, config)
            .then((res) => {
                const mapa = res.data.result.map(pergunta => {
                    const perguntaField = `pergunta-${pergunta.id_pergunta}`
                    console.log(pergunta);
                    return (
                        <Formik
                            initialValues={{
                                [perguntaField]: pergunta.pergunta
                            }}
                            validationSchema= {yup.object({
                                [perguntaField]: yup.string().required("Para alterar a pergunta, o campo não pode ser vazio.")
                            })}
                        >
                            {props => (
                                <form>
                                    <div key={pergunta.id_pergunta}>
                                        <input key={pergunta.id_pergunta} onChange={props.handleChange} onBlur={props.handleBlur} value={props.values[perguntaField]} name={perguntaField}></input>
                                        {props.touched[perguntaField] && props.errors[perguntaField] ? (
                                            <div className={"error-message"}>{props.errors[perguntaField]}</div>
                                        ) : null}
                                        <button type="button" onClick={() => { deleteQuestion(pergunta.id_pergunta) }}>Excluir</button>
                                        <button type="button" disabled={!(props.isValid)} onClick={() => { updateQuestion(props.values[perguntaField], pergunta.id_pergunta) }}>Alterar</button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    )
                })
                setPerguntas(mapa)
            }).catch((err) => {
                setShowModal(true)
                setTitulo("Erro!")
                setBody(err.response.data.msg || "Ocorreu um erro!")
                setPerguntas()
                console.log(err.response.data.msg)
            })
    }, [reload])

    return (
        <div>
            <div id="homeForm" className={FormEditor["homeForm"]}>
                <div className={FormEditor["leftForm"]}>
                    <div className={FormEditor["cardForm"]}>
                        <Formik>
                            <form onSubmit={formik.handleSubmit}>
                                {perguntas}
                                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.question} name="question" placeholder="Pergunta..."></input>
                                {formik.touched.question && formik.errors.question ? (
                                    <div className={"error-message"}>{formik.errors.question}</div>
                                ) : null}
                                <button type="submit" disabled={!(formik.isValid)}>Adicionar</button>
                            </form>
                        </Formik>
                    </div>
                </div>
            </div>
            <Modal onClose={() => { { setShowModal(false) } }} show={showModal} titulo={titulo} body={body} />
        </div>
    )
}