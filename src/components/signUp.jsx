import React, {useRef, useState} from 'react';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";


import {useAuth} from "../contexts/authentication.context";


export default function SignUp() {

    // Import signUp method from auth context
    const {signUp} = useAuth();

    // Form variables
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordConfirmRef = useRef(null);
    const toast = useRef(null);

    // Form error validation
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    async function onFormSubmit(e) {

        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            setErrorMsg('Las contraseñas no coinciden')
            return
        }

        try {
            setErrorMsg('')
            setLoading(true)

            await signUp(emailRef.current.value, passwordRef.current.value, setErrorMsg)

        } catch (e) {
            setErrorMsg(e)
        }

        setLoading(false)
    }

    function showError() {

        return toast.current.show({
            severity: 'error',
            summary: 'Creación de cuenta',
            detail: errorMsg,
            life: 3000
        });
    }

    return (
        <>
            <Toast ref={toast} position="top-right"/>
            {errorMsg && showError(errorMsg)}
            <div className="flex align-items-center justify-content-center mt-5">
                <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                    <div className="text-center mb-5">
                        <div className="text-900 text-3xl font-medium mb-3">Crear una cuenta</div>
                    </div>

                    <form onSubmit={onFormSubmit}>
                        <label htmlFor="email" className="block text-900 font-medium mb-2">Correo electrónico</label>
                        <InputText id="email" type="text" className="w-full mb-3" ref={emailRef} required/>

                        <label htmlFor="password" className="block text-900 font-medium mb-2">Contraseña</label>
                        <InputText id="password" type="password" className="w-full mb-3" ref={passwordRef} required/>


                        <label htmlFor="confPassword" className="block text-900 font-medium mb-2">Confirmá tu
                            contraseña</label>
                        <InputText id="confPassword" type="password" className="w-full mb-6" ref={passwordConfirmRef}
                                   required/>

                        <Button label="Registrarme" type="submit" icon="pi pi-user" className="w-full"
                                disabled={loading}/>
                    </form>
                </div>
            </div>

        </>
    );
}