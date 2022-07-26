import React from 'react';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useAuth} from "../contexts/authentication.context";
import {useRef, useState} from "react";
import {Toast} from "primereact/toast";
import {Link, useNavigate} from "react-router-dom";

export default function SignIn() {

    let navigate = useNavigate();

    // Import signUp method from auth context
    const {signIn} = useAuth();

    // Form variables
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const toast = useRef(null);

    // Form error validation
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    async function onFormSubmit(e) {

        e.preventDefault()

        try {
            setErrorMsg('')
            setLoading(true)

            await signIn(emailRef.current.value, passwordRef.current.value, setErrorMsg)
            navigate("/")
        } catch (e) {
            setErrorMsg(e)
        }

        setLoading(false)
    }

    function showToast(severity, title, msg) {

        return toast.current.show({
            severity: severity, summary: title, detail: msg, life: 3000
        });
    }

    return (<>
        <Toast ref={toast} position="top-right"/>
        {errorMsg && showToast('error', 'Creación de cuenta', errorMsg)}
        <div className="flex align-items-center justify-content-center mt-5">
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                    <div className="text-900 text-3xl font-medium mb-3">Bienvenido</div>
                    <span className="text-600 font-medium line-height-3">¿No tenés cuenta?</span>
                    <Link to="/registrarme"
                          className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Creá una</Link>
                </div>

                <form onSubmit={onFormSubmit}>
                    <label htmlFor="email" className="block text-900 font-medium mb-2">Correo electrónico</label>
                    <InputText id="email" type="text" className="w-full mb-3" ref={emailRef}
                               autoComplete="current-email"/>

                    <label htmlFor="password" className="block text-900 font-medium mb-2">Contraseña</label>
                    <InputText id="password" type="password" className="w-full mb-3" ref={passwordRef}
                    autoComplete="current-password"/>

                    <div className="flex align-items-center justify-content-between mb-6">
                        {/* TODO: Reestablish password */}
                        <a className="font-medium no-underline text-blue-500 text-right cursor-pointer">¿Olvidaste
                            tu contraseña?</a>
                    </div>


                    <Button label="Iniciá sesión" icon="pi pi-user" className="w-full" disabled={loading}/>
                </form>
            </div>
        </div>

    </>);
}