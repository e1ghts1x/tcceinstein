import React, { useState, useEffect } from "react";
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
    const [admins, setAdmins] = useState()

    const formik = useFormik({
        initialValues: {
            admin: "",
            password: ""
        },
        validationSchema: yup.object({
            admin: yup.string().required("O campo admin não pode ser vazio."),
            password: yup.string().required("O campo senha não pode ser vazio.")
        }),
        onSubmit: (values) => {
            Axios.post(`${baseURL}/addadminuser`, { admins: values.admin, password: values.password }, config)
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

    const deleteAdmin = (idLogin) => {
        Axios.post(`${baseURL}/deleteadminuser`, { id_login: idLogin}, config)
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
        Axios.get(`${baseURL}/configadminuser`, config)
            .then((res) => {
                const mapa = res.data.result.map(admin => {
                    
                    return (
                        <div key={admin.id_login}>
                            <input name="inputAdmin" key={admin.id_login} value={admin.admins}></input>
                            <button type="button" onClick={() => deleteAdmin(admin.id_login)}>Excluir</button>
                            <button type="button" onClick={() => console.log(admin.id_login)}>Alterar</button>
                        </div>
                    )
                })
                console.log(mapa)
                setAdmins(mapa)
            }).catch((err) => {
                setShowModal(true)
                setTitulo("Erro!")
                setBody(err.response.data.msg || "Ocorreu um erro!")
                setAdmins()
                console.log(err.response.data.msg)
            })
    }, [reload])


    return (
        <div>
            <div id="homeForm" className={ConfigUser["homeForm"]}>
                <div id="leftForm" className={ConfigUser["leftForm"]}>
                    <div id="cardForm" className={ConfigUser["cardForm"]}>
                        <Formik>
                            <form onSubmit={formik.handleSubmit}>
                                <h2>Adicionar Administrador No Sistema</h2>
                                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.admin} name="admin" placeholder="Admin" enableReinitialize={true}></input>
                                {formik.touched.admin && formik.errors.admin ? (
                                    <div className={"error-message"}>{formik.errors.admin}</div>
                                ) : null}
                                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} name="password" type="password" placeholder="Senha" enableReinitialize={true}></input>
                                {formik.touched.password && formik.errors.password ? (
                                    <div className={"error-message"}>{formik.errors.password}</div>
                                ) : null}
                                <button type="submit">Adicionar</button>
                            </form>
                        </Formik>
                    </div>
                    <div id="cardForm" className={ConfigUser["cardForm"]}>
                        <h2>Lista de Usuários Administradores</h2>
                        {admins}
                    </div>
                    
                </div>
            </div>
            <Modal onClose={() => { { setShowModal(false) } }} show={showModal} titulo={titulo} body={body} />
        </div>
    )
}
