import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartSimple } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import "./Dashboard.css"
import image from "../../res/saci-white.png"
import Sidebar from "./Sidebar";

export default function () {
    return (
        <div>
            <Sidebar></Sidebar>
        </div>
    )
}