import React, {useRef, useState} from 'react';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";
import * as Yup from "yup"
import {useFormik} from "formik";

import {useAuth} from "../contexts/authentication.context";


export default function SignUp() {

    // Import signUp method from auth context
    const {signUp} = useAuth();

    // Form variables
    const toast = useRef(null);


    const registerForm = useFormik({
        initialValues: {
            email: "", password: "", dni: "", passwordConfirm: ""
        },
        onSubmit: async (values) => {
            if (values.password !== values.passwordConfirm) {
                setErrorMsg('Las contraseñas no coinciden')
                return
            }
            try {
                setErrorMsg('')
                setLoading(true)

                await signUp(values.email, values.password, setErrorMsg)

                showToast('success', 'Registro en miautohoy.com', 'Satisfactorio')
                return toast.current.show({
                    severity: 'success', summary: 'Registro en miautohoy.com', detail: 'Satisfactorio', life: 3000
                });

            } catch (e) {
                setErrorMsg(e)
                setLoading(false)
            }
            setLoading(false)
        }
    })


    // Form error validation
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);


    function showToast(severity, title, msg) {

        return toast.current.show({
            severity: severity, summary: title, detail: msg, life: 3000
        });
    }

    console.log(registerForm.values)

    return (<>
        <Toast ref={toast} position="top-right"/>
        {errorMsg && showToast('error', 'Creación de cuenta', errorMsg)}
        <div className="flex align-items-center justify-content-center mt-5">
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                    <div className="text-900 text-3xl font-medium mb-3">Crear una cuenta</div>
                </div>

                <form onSubmit={registerForm.handleSubmit}>
                    <label htmlFor="email" className="block text-900 font-medium mb-2">Correo electrónico</label>
                    <InputText id="email" type="text"
                               className="w-full mb-3"
                               autoComplete="new-email" required
                               onChange={registerForm.handleChange}
                               value={registerForm.values.email}/>

                    <label htmlFor="dni" className="block text-900 font-medium mb-2">Documento nacional de identidad</label>
                    <InputText id="dni" type="text"
                               className="w-full mb-3"
                               required
                               key={"dni"}
                               onChange={registerForm.handleChange}
                               value={registerForm.values.dni}/>

                    <label htmlFor="password" className="block text-900 font-medium mb-2">Contraseña</label>
                    <InputText
                        id="password" type="password"
                        className="w-full mb-3"
                        autoComplete="new-password" required
                        onChange={registerForm.handleChange}
                        value={registerForm.values.password}/>

                    <label htmlFor="passwordConfirm" className="block text-900 font-medium mb-2">Confirmá tu
                        contraseña</label>
                    <InputText id="passwordConfirm" type="password"
                               className="w-full mb-6"
                               autoComplete="new-password" required
                               onChange={registerForm.handleChange}
                               value={registerForm.values.passwordConfirm}/>

                    <Button label="Registrarme" type="submit" icon="pi pi-user" className="w-full"
                            disabled={loading}/>
                </form>
            </div>
        </div>
    </>);
}