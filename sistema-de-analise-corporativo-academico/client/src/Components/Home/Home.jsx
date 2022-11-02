import React from "react";
import { useNavigate } from "react-router-dom";
import image from "../../res/saci-white.png";
import "./Home.css"
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import Axios from "axios";
import { Link } from "react-router-dom";

export default function () {
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
            Axios.post("http://localhost:3001/api/login", {
                username: values.user,
                password: values.password,
            }).then((res) => {
                console.log(res.data.msg)
                localStorage.setItem('token', res.data.token)
                Axios.defaults.headers.common['Auth'] = 'Bearer' + res.data.token
                navigate("/quest")
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
        <div className="home">
            <div className="left">
                <img src={image} alt="Logo"></img>
            </div>
            <div className="right">
                <div className="card">
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
                    <Link to="/register"><a>Registrar-se</a></Link>
                </div>
            </div>
        </div>
    )
}