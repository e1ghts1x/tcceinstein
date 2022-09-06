import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function() {
    return(
        <div>
            <h1>Formulário de Login</h1>
            <Formik
                initialValues={{user: '', password: ''}}
                validate={values => {
                    const errors = {};
                    if (!values.user){
                        errors.user = "Campo Necessário";
                    }
                    if(!values.password){
                        errors.password = "Campo necessário"
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() =>{
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ isSubmitting })=> (
                    <Form>
                        <Field type="text" name="user"/>
                        <ErrorMessage name="user" component="div"/>
                        <Field type="password" name="password" />
                        <ErrorMessage name="password" component="div"/>
                        <button type="submit" disabled={isSubmitting} >tomanocu</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}