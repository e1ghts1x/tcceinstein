import React from "react";
import image from "../../res/saci-white.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import "./Home.css"

export default function () {
    return (
        <div className="home">
            <div id="navbar" className="navbar">
                <img src={image} alt="logo"/>
                <a href="#login" id="first"><FontAwesomeIcon icon={faUser} /> Login</a>
            </div>
            <div className="contato">
            </div>
        </div>
    )
}