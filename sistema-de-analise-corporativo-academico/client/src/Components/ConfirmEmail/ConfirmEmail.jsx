import React from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";
import CssConfirmEmail from "./ConfirmEmail.module.css";
import IsLoading from "../isLoading/IsLoading";
import { useEffect, useState } from "react";
import { baseURL } from "../../Services/api";

export default () =>{
    const [pathToLocation, setPathToLocation] = useState();
    const [isLoading, setIsLoading] = useState(true)
    const [response, setResponse] = useState()
    const [Btn, setBtn] = useState()
    let params = useParams();
    let token = params.token;

    useEffect(()=>{
        setIsLoading(true)
        Axios.post(`${baseURL}/confirmation/${token}`)
        .then((res)=>{
            setIsLoading(false)
            setResponse(res.data.msg)
            setBtn("Login")
            setPathToLocation("/login")
        }).catch((err)=>{
            setIsLoading(false)
            setResponse(err.response.data.msg)
            setBtn("Retornar")
            setPathToLocation("/register")
        })
    }, [])


    return(
        <div className={CssConfirmEmail["ceBackground"]}>
            <div>
                {isLoading && <div><IsLoading /></div>}
                <div>
                    <div className={CssConfirmEmail["ceCard"]}>
                        <h1>{response}</h1>
                        <Link to={pathToLocation || ""}><button>{Btn}</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}