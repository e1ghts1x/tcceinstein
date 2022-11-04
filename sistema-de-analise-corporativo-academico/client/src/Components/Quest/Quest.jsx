import React from "react";
import {useNavigate} from "react-router-dom"

export default function() {
    const navigate = useNavigate();
    const handleLogout = () =>{
        localStorage.removeItem("token")
        navigate("/login")
    }

    return(
        <div>
            <h1>Formulário: </h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}