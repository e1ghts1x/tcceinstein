import React, { useState } from "react";
import "./LoginAdmin.css"
import Axios from "axios";
import { useNavigate } from "react-router-dom"
import image from "../../res/saci-admin-white.png"
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import Modal from "../Modal/Modal";

export default () => {
    const [showModal, setShowModal] = useState()
    const [titulo, setTitulo] = useState()
    const [body, setBody] = useState()

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            user: "",
            password: "",
        },
        validationSchema: yup.object({
            user: yup.string().required("O campo usuário não pode ser vazio."),
            password: yup.string().required("O campo senha não pode ser vazio.")
        }),
        onSubmit: (values) => {
            Axios.post(`http://localhost:3001/api/loginadmin`, {
                username: values.user,
                password: values.password,
            }).then((res) => {
                console.log(res.data.msg)
                localStorage.setItem('token', res.data.token)
                Axios.defaults.headers.common['Auth'] = 'Bearer' + res.data.token
                navigate("/dashboard")
            }).catch((err) => {
                setShowModal(true)
                setTitulo("Erro")
                setBody(err.response.data.msg)
            });
        }
    })

    function mostrarSenha() {
        var senha = document.getElementById("password");
        if (senha.type === "password") {
            senha.type = "text";
        }
        else {
            senha.type = "password";
        }
    }

    return (
        <div className="homeAdmin">
            <Modal onClose={() => setShowModal(false)} redirect="/login" show={showModal} titulo={titulo} body={body}/>
            <div className="leftAdmin">
                <img src={image} alt="Logo"></img>
            </div>
            <div className="rightAdmin">
                <div className="cardAdmin">
                    <Formik>
                        <form onSubmit={formik.handleSubmit}>
                            <h2>Acesso ao dashboard</h2>
                            <h2>Login: </h2>
                            <input placeholder="Usuário" name="user" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.user} />
                            {formik.touched.user && formik.errors.user ? (
                                <div className="error-message">{formik.errors.user}</div>
                            ) : null}
                            <input placeholder="Senha" name="password" id="password" type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="error-message">{formik.errors.password}</div>
                            ) : null}
                            <button type="submit">Login</button>
                        </form>
                    </Formik>
                    <button onClick={mostrarSenha}>Exibir Senha</button>
                </div>
            </div>
        </div>
    )
}