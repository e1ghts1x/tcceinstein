import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Axios from "axios";
import { config } from "../../../Services/api";

export default () => {
    const [perguntas, setPerguntas] = useState(null)

    useEffect(() => {
        Axios.get(`http://localhost:3001/api/formeditor`, config)
            .then((res) => {
                const mapa = res.data.result.map(pergunta => {
                    return (
                        <div key={pergunta.id_pergunta}>
                            <a>{'['}{pergunta.id_pergunta}{'] '}</a>
                            <a>{pergunta.pergunta}</a>
                        </div>)
                })
                console.log(mapa)
                setPerguntas(mapa)
            })
    }, [])


    return (
        <div className="homeForm">
            <div className="leftForm">
                <div className="cardForm">
                    {perguntas}
                </div>
            </div>
        </div>
    )
}