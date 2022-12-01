import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../../res/saci-white.png";
import Home from "./Home.module.css"
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import Axios from "axios";
import { baseURL } from "../../Services/api";
import Modal from "../Modal/Modal";
import IsLoading from "../isLoading/IsLoading";

export default function () {
    const [showModal, setShowModal] = useState()
    const [titulo, setTitulo] = useState()
    const [body, setBody] = useState()
    const [isLoading, setIsLoading] = useState(false)
    
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
            setIsLoading(true)
            Axios.post(`${baseURL}/login`, {
                username: values.user,
                password: values.password,
            }).then((res) => {
                localStorage.setItem('token', res.data.token)
                Axios.defaults.headers.common['Authorization'] = 'Bearer' + res.data.token
                setTimeout(function() {
                    setIsLoading(false)
                    window.location.replace("/quest")
                }, 1000)
            }).catch((err) =>{
                setIsLoading(false)
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
        <div className={Home["home"]}>
            {isLoading && <div><IsLoading /></div>}
            <div className={Home["left"]}>
                <img src={image} alt="Logo"></img>
            </div>
            <div className={Home["right"]}>
                <Modal onClose={() =>{setShowModal(false); navigate("/login")}} show={showModal} titulo={titulo}  body={body}/>
                <div className={Home["card"]}>
                    <Formik>
                        <form onSubmit={formik.handleSubmit}>
                            <h2>Bem-vindo ao sistema de avaliação NPS</h2>
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
                    <a href="/register">Registrar-se</a>
                </div>
            </div>
        </div>
    )
}