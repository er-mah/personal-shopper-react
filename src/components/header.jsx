import React from 'react';
import {Menubar} from 'primereact/menubar';
import {INSTITUTIONAL} from "../utils/assets/institutional";
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
        label: 'Vendé tu auto', command: () => {
            navigate(MAIN_URLS.NEW_SALE_FORM);
        }
    }];

    const start = <img alt="logo" src={INSTITUTIONAL.LOGO_CON_TEXTO} className="ml-5 px-4 h-2rem w-auto"></img>;

    return (<>
        <Menubar className="py-3" model={items} start={start}/>
    </>);
}