import React, { useState } from "react";
import Axios from "axios";
import "./Dashboard.css"
import Sidebar from "./Sidebar";

export default  (props) => {

    const [resultado,  setResultado] = useState()
    
    const token = localStorage.getItem('token')
    const config = {
        headers:{
            Authorization: "Bearer " + token
        }
    }
    const handleTest = () => {
        console.log("aaa")
        Axios.get(`http://192.168.0.160:3001/api/dashboard`, config).then((res)=>{
            setResultado(res.data)
        })
    }


    return (
        <div>
           <button onClick={handleTest}>Testar</button>
           <h1>{resultado}</h1>
        </div>
    )
}