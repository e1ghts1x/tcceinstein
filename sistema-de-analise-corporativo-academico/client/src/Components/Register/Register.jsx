import React, { useState } from "react";
import Register from "./Register.module.css"
import Axios from "axios";
import { baseURL } from "../../Services/api";
import image from "../../res/saci-white.png"
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import Modal from "../Modal/Modal";
import IsLoading from "../isLoading/IsLoading";

export default () => {
    const [showModal, setShowModal] = useState();
    const [titulo, setTitulo] = useState();
    const [body, setBody] = useState();
    const [pathToLocation, setPathToLocation] = useState();
    const [btnTitle, setBtnTitle] = useState();
    const [isLoading, setIsLoading] = useState(false)


    const formik = useFormik({
        initialValues: {
            user: "",
            password: "",
        },
        validationSchema: yup.object({
            user: yup.string().required("O campo usuário não pode ser vazio."),
            email: yup.string().email("O email precisa ser válido").required("O campo email não pode ser vazio."),
            password: yup.string().required("O campo senha não pode ser vazio."),
        }),
        onSubmit: (values) => {
            setIsLoading(true)
            Axios.post(`${baseURL}/register`, {
                login: values.user,
                email: values.email,
                password: values.password,
            }).then((res) => {
                setIsLoading(false)
                setShowModal(true)
                setTitulo("Alerta!")
                setBtnTitle("Login")
                setBody(res.data.msg)
                setPathToLocation("/login")
            }).catch((err) => {
                setIsLoading(false)
                setShowModal(true)
                setTitulo("Erro!")
                setBody(err.response.data.msg)
                setPathToLocation("")
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
        <div className={Register["homeRegister"]}>
            {isLoading && <div><IsLoading /></div>}
            <Modal onClose={() => setShowModal(false)} pathToLocation={pathToLocation} btnTitle={btnTitle} show={showModal} titulo={titulo} body={body} />
            <div className={Register["leftRegister"]}>
                <img src={image} alt="Logo"></img>
            </div>
            <div className={Register["rightRegister"]}>
                <div className={Register["cardRegister"]}>
                    <Formik>
                        <form onSubmit={formik.handleSubmit}>
                            <h2>Bem vindo ao nosso sistema de NPS</h2>
                            <h2>Registrar-se: </h2>
                            <input placeholder="Usuário" name="user" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.user} />
                            {formik.touched.user && formik.errors.user ? (
                                <div className="error-message">{formik.errors.user}</div>
                            ) : null}
                            <input placeholder="Nome Completo"/>
                            {formik.touched.user && formik.errors.user ? (
                                <div className="error-message">{formik.errors.user}</div>
                            ) : null}
                            <input placeholder="email@exemplo.com" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="error-message">{formik.errors.email}</div>
                            ) : null}
                            <input placeholder="Senha" name="password" id="password" type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="error-message">{formik.errors.password}</div>
                            ) : null}
                            <button type="submit">Registrar-se</button>
                        </form>
                    </Formik>
                    <button onClick={mostrarSenha}>Exibir Senha</button>
                    <a href="/login">Logar</a>
                </div>
            </div>
        </div>
    )
}