import React from "react";
import image from "../../res/saci-white.png";
import "./Home.css"
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import Axios from "axios";

export default function () {

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
                user: values.user,
                password: values.password,
            }).then((response) => {
                localStorage.setItem("@user", JSON.stringify(response.config.data));
                window.location.reload();
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
                    {/*todo*/}<a>Cadastrar-se</a>
                </div>
            </div>
        </div>
    )
}