import React from "react";
import Login from "./Login.css"
import image from "../../res/logo.png"
//import axios from "axios";
import {ErrorMessage, Field, Formik} from "formik";


export default function(){
    /*const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function validaForm(){
        return user.length > 0 && password.length > 0;
    }

    function handleEnvio(evento){
        evento.preventDefault();
    }*/

    function mostrarSenha(){
        var senha = document.getElementById("password");
        if (senha.type === "password"){
            senha.type = "text";
        }
        else{
            senha.type = "password";
        }
    }
    
    return(
        <div className="formulario">
            <Formik 
                initialValues={{user: '', password: ''}}
                validate={values => {
                    const errors = {};
                    if (!values.user){
                        errors.user = "O usuário não pode ser vazio.";
                    } 
                    if (!values.password){
                        errors.password = "A senha não pode ser vazia."
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() =>{
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ isSubmitting })=> (
                    <form>
                        <img src={image} alt="Logo"></img>
                        <h2>Login</h2>
                        <label for="user">Usuário: </label>
                        <Field type="text" name="user" />
                        <ErrorMessage name="user" component="div" className="error-message"/>
                        <label for="user">Senha: </label>
                        <Field type="password" name="password" id="password"/>
                        <ErrorMessage name="password" component="div" className="error-message"/>
                        <button type="submit" disabled={isSubmitting}>Enviar</button>
                    </form>
                )}
            </Formik>
            <button onClick={mostrarSenha}>Exibir Senha</button>
        </div>
    )
}

        /*<div className="formulario">
            <form onSubmit={handleEnvio}>
                <img src={image} alt="Logo"></img>
                <h2>Login</h2>
                <label forhtml="user">Usuário: </label><br></br>
                <input autoFocus value={user} onChange={(e) => setUser(e.target.value)} id="user" name="user"></input><br></br>
                <label forHtml="password">Senha: </label><br></br>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="senha" name="senha"></input><br></br>
                <button type="submit" /*value={}>Enviar</button>
            </form>
            <button onClick={mostrarSenha}>Exibir Senha</button>
        </div>*/