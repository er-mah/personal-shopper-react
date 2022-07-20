import React from 'react';
import {Menubar} from 'primereact/menubar';
import logo from '../utils/assets/institutional/logo-con-texto.svg';
import "../utils/styles/components.css";
import {useNavigate} from "react-router-dom";

export const Header = () => {

    let navigate = useNavigate();

    const items = [
        {
            label: 'Inicio',
            command: () => {
                navigate("/");
            }
        },
        {
            label: 'Usados',
            items: [
                {
                    label: 'Marketplace',
                },
                {
                    label: 'Cotizá tu auto',
                    command: () => {
                        navigate("/vende-tu-auto");
                    }
                }
            ]
        },
        {
            label: 'Iniciar sesión',
            command: () => {
                navigate("/iniciar-sesion");
            }
        },
        {
            label: 'Registrarme',
            command: () => {
                navigate("/registrarme");
            }
        },
    ];

    const start = <img alt="logo" src={logo} className="px-3 h-2rem w-auto"></img>;

    return (
        <>
            <Menubar className="py-3" model={items} start={start}/>
        </>
    );
}