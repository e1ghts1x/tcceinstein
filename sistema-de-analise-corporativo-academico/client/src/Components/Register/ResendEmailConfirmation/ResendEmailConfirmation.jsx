import React, {useState} from "react";
import { Formik, useFormik } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";
import Axios from "axios";
import { baseURL } from "../../../Services/api";
import IsLoading from "../../isLoading/IsLoading";
import Modal from "../../Modal/Modal";
import image from "../../../res/saci-white.png"
import ResendEmailConfirmation from "./ResendEmailConfirmation.module.css"

export default () => {
    const [showModal, setShowModal] = useState();
    const [titulo, setTitulo] = useState();
    const [body, setBody] = useState();
    const [pathToLocation, setPathToLocation] = useState();
    const [btnTitle, setBtnTitle] = useState();
    const [isLoading, setIsLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            user: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().email("O email precisa ser válido").required("O campo email não pode ser vazio."),
        }),
        onSubmit: (values) => {
            setIsLoading(true)
            Axios.post(`${baseURL}/confirmation/resend`, {
                email: values.email,
            }).then((res) => {
                setIsLoading(false)
                setShowModal(true)
                setTitulo("Alerta!")
                setBtnTitle("Login")
                setBody(res.data.msg)
                setPathToLocation("/login")
            }).catch((err) => {
                setIsLoading(false)
                setShowModal(true)
                setTitulo("Erro!")
                setBody(err.response.data.msg)
                setPathToLocation("")
            });
        }
    })

    return (
        <div className={ResendEmailConfirmation["homeResendEmailConfirmation"]}>
            {isLoading && <div><IsLoading /></div>}
            <Modal onClose={() => setShowModal(false)} pathToLocation={pathToLocation} btnTitle={btnTitle} show={showModal} titulo={titulo} body={body} />
            <div className={ResendEmailConfirmation["leftResendEmailConfirmation"]}>
                <img src={image} alt="Logo"></img>
            </div>
            <div className={ResendEmailConfirmation["rightResendEmailConfirmation"]}>
                <div className={ResendEmailConfirmation["cardResendEmailConfirmation"]}>
                    <Formik>
                        <form onSubmit={formik.handleSubmit}>
                            <h2>Insira o email abaixo para reenviar o email de verificação:</h2>
                            <input placeholder="email@exemplo.com" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="error-message">{formik.errors.email}</div>
                            ) : null}
                            <button type="submit">Reenviar</button>
                            <Link to="/login"><button>Voltar</button></Link>
                        </form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}