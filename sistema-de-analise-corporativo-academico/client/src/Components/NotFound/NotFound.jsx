import React from "react";
import {Link} from "react-router-dom"
import "./NotFound.css";

export default () => {
    return(
        <div>
            <div className="center">
                <div>
                    <h1>ERRO 404</h1>
                    <Link to="/"><button>Página Inicial</button></Link>
                </div>
            </div>
        </div>
    )
}