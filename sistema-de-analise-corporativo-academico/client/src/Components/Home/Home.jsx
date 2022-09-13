import React from "react";
import { Formik, useFormik } from "formik";
import * as yup from "yup";

export default function(){
    
    const formik = useFormik({
        initialValues:{
            user: "",
            password: "",
        },
        validationSchema: yup.object({
            user: yup.string().required("O campo usuário não pode ser vazio."),
            password: yup.string().required("O campo senha não pode ser vazio.")
        }),
        onSubmit: (values) => {}
    })

    return(
        <div>
            <h1>Login</h1>
        </div>
    )
}