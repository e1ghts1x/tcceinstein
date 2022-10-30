import React from "react";
import "./LoginAdmin.css"
import Axios from "axios";
import {useNavigate} from "react-router-dom"
import image from "../../res/saci1.png"
import { Formik, useFormik } from "formik";
import * as yup from "yup";

export default () => {
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
            Axios.post(`http://192.168.0.160:3001/api/loginadmin`, {
                username: values.user,
                password: values.password,
            }).then((res) => {
                console.log(res)
                localStorage.setItem('token', res.data.token)
                Axios.defaults.headers.common['Auth'] = 'Bearer'+ res.data.token
                navigate("/dashboard")
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
        <div className="admin-login-page">
            <div className="formulario">
                <Formik>
                    <form onSubmit={formik.handleSubmit}>
                        <img src={image} alt="Logo"></img>
                        <h2>Login</h2>
                        <label htmlFor="user">Usuário: </label>
                        <input type="text" name="user" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.user} />
                        {formik.touched.user && formik.errors.user ? (
                            <div className="error-message">{formik.errors.user}</div>
                        ) : null}
                        <label htmlFor="user">Senha: </label>
                        <input type="password" name="password" id="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="error-message">{formik.errors.password}</div>
                        ) : null}
                        <button type="submit">Entrar</button>
                    </form>
                </Formik>
                <button onClick={mostrarSenha}>Exibir Senha</button>
            </div>
        </div>
    )
}