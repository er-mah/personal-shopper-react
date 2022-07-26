import React from 'react';
import {Menubar} from 'primereact/menubar';
import logo from '../utils/assets/institutional/logo-con-texto.svg';
import "../utils/styles/components.css";
import {useNavigate} from "react-router-dom";
import {MAIN_URLS, NEW_SALE_FORM_URLS} from "../utils/constants";

export const Header = () => {

    let navigate = useNavigate();

    const items = [
        {
            label: 'Inicio',
            command: () => {
                navigate(MAIN_URLS.HOME);
            }
        },
        {
            label: 'Usados'
        },
        {
            label: 'Cotizá tu auto',
            command: () => {
                navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.BRAND);
            }
        },
        {
            label: 'Iniciar sesión',
            command: () => {
                navigate(MAIN_URLS.SIGN_IN);
            }
        }
    ];

    const start = <img alt="logo" src={logo} className="px-3 h-2rem w-auto"></img>;

    return (
        <>
            <Menubar className="py-3" model={items} start={start}/>
        </>
    );
}