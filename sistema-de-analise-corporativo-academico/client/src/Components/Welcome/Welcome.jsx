import React from "react";
import { Link } from "react-router-dom";
import WelcomeCss from "./Welcome.module.css";
import Feedback from "../../res/quiz.svg"


const Welcome = () => {

  return (
    <div className={WelcomeCss["welcome"]}>
      <div className={WelcomeCss["welcomeCenter"]}>
        <h2>Seja bem-vindo ao Saci!</h2>
        <p>Selecione uma opção: </p>
        <Link to="/login"><button>Cliente</button></Link>
        <Link to="/admin"><button>Admin</button></Link>
        <img src={Feedback} alt="Início do Quiz" />
      </div>
    </div>
  );
};

export default Welcome;