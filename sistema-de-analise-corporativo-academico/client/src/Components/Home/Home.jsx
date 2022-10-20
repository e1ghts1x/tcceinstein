import React from "react";
import image from "../../res/saci-white.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import "./Home.css"

export default function () {
    return (
        <div className="home">
            <div className="left">
                <img src={image} alt="Logo"></img>
            </div>
            <div className="right">
                <div className="card">
                    <h2>Login: </h2>
                    <input placeholder="Usuário"></input>
                    <input placeholder="Senha"></input>
                    <button>Login</button>
                </div>
            </div>
        </div>
    )
}