import React from 'react';
import {Menubar} from 'primereact/menubar';
import logoConTexto from "../utils/assets/institutional";
import "../utils/styles/components.css";
import {useNavigate} from "react-router-dom";
import {MAIN_URLS, NEW_SALE_FORM_URLS} from "../utils/constants";

export const Header = () => {

    let navigate = useNavigate();

    const items = [{
        label: 'Inicio', command: () => {
            navigate(MAIN_URLS.HOME);
        }
    }, {label: 'Usados'}, {
        label: 'Cotizá tu auto', command: () => {
            navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.BRAND);
        }
    }];

    const start = <img alt="logo" src={logoConTexto} className="ml-5 px-4 h-2rem w-auto"></img>;
    const end = <div role="none" className="p-menuitem">
        <a role="menuitem"
           className="p-button-rounded p-menuitem-link mr-5"
           aria-haspopup="false"
           onClick={() => {
               navigate(MAIN_URLS.SIGN_IN)
           }}
        >
            <span className="p-menuitem-text">Iniciar sesión</span>
        </a>
    </div>;

    return (<>
        <Menubar className="py-3" model={items} start={start} end={end}/>
    </>);
}