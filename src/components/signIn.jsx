import React from 'react';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";

export default function SignIn() {
    return (<>
        <div className="flex align-items-center justify-content-center mt-5">
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                    <div className="text-900 text-3xl font-medium mb-3">Bienvenido</div>
                    <span className="text-600 font-medium line-height-3">¿No tenés cuenta?</span>
                    <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Creá una</a>
                </div>

                <div>
                    <label htmlFor="email" className="block text-900 font-medium mb-2">Correo electrónico</label>
                    <InputText id="email" type="text" className="w-full mb-3"/>

                    <label htmlFor="password" className="block text-900 font-medium mb-2">Contraseña</label>
                    <InputText id="password" type="password" className="w-full mb-3"/>

                    <div className="flex align-items-center justify-content-between mb-6">
                        <a className="font-medium no-underline text-blue-500 text-right cursor-pointer">¿Olvidaste
                            tu contraseña?</a>
                    </div>


                    <Button label="Iniciá sesión" icon="pi pi-user" className="w-full"/>
                </div>
            </div>
        </div>

    </>);
}