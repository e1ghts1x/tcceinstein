import React, {useState} from "react";
import Login from "./Login.css"
import image from "../res/logo.png"


export default function(){
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    function validaForm(){
        return user.length > 0 && password.length > 0;
    }

    function handleEnvio(evento){
        evento.preventDefault();
    }

    function mostrarSenha(){
        var senha = document.getElementById("senha");
        if (senha.type === "password"){
            senha.type = "text";
        }
        else{
            senha.type = "password";
        }
    }
    
    return(
        <div className="formulario">
            <form onSubmit={handleEnvio}>
                <img src={image} alt="Logo"></img>
                <h2>Login</h2>
                <label forhtml="user">Usuário: </label><br></br>
                <input autoFocus value={user} onChange={(e) => setUser(e.target.value)} id="user" name="user"></input><br></br>
                <label forHtml="password">Senha: </label><br></br>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="senha" name="senha"></input><br></br>
                <button type="submit" /*value={}*/>Enviar</button>
            </form>
            <button onClick={mostrarSenha}>Exibir Senha</button>
        </div>
    )
}