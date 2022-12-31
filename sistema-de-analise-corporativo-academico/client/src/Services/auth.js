import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { baseURL, config } from "./api";

export const RequireAuth = (props) => {
    const [pass, setPass] = useState(false)
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    useEffect(() => {
        Axios.get(`${baseURL}/${props.verifyUrl}`, {
            headers: {
                Authorization: 'Bearer ' + token
            },
            token: token
        })
        .then((res) =>{
            console.log("PROPSSSSS", res)
            setPass(true)
        }).catch((err) =>{
            console.log("EROOOO", err)
            setPass(false)
            navigate(props.to)
        })
    }, [])
        
    return pass ? props.children : null
};
