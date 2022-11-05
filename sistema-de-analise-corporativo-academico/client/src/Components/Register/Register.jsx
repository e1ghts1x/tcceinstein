import React, { useState } from "react";
import "./Register.css"
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom"
import image from "../../res/saci-white.png"
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import Modal from "../Modal/Modal";

export default () => {
    const [showModal, setShowModal] = useState();
    const [titulo, setTitulo] = useState();
    const [body, setBody] = useState();
    const [pathToLocation, setPathToLocation] = useState();
    const [btnTitle, setBtnTitle] = useState();

    const navigate = useNavigate()

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
            Axios.post(`http://localhost:3001/api/register`, {
                username: values.user,
                email: values.email,
                password: values.password,
            }).then((res) => {
                setShowModal(true)
                setTitulo("Alerta!")
                setBtnTitle("Login")
                setBody(res.data.msg)
                setPathToLocation("/login")
            }).catch((err) => {
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
        <div className="homeRegister">
            <Modal onClose={() => setShowModal(false)} pathToLocation={pathToLocation} btnTitle={btnTitle} show={showModal} titulo={titulo} body={body} />
            <div className="leftRegister">
                <img src={image} alt="Logo"></img>
            </div>
            <div className="rightRegister">
                <div className="cardRegister">
                    <Formik>
                        <form onSubmit={formik.handleSubmit}>
                            <h2>Bem vindo ao nosso sistema de NPS</h2>
                            <h2>Registrar-se: </h2>
                            <input placeholder="Usuário" name="user" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.user} />
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
                    <Link to="/login"><a>Logar</a></Link>
                </div>
            </div>
        </div>
    )
}