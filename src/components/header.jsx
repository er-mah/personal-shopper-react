import React from 'react';
import {Menubar} from 'primereact/menubar';
import logo from '../utils/assets/institutional/logo-con-texto.svg';
import "../utils/styles/components.css";

export const Header = () => {
    const items = [
        {label: 'Inicio'},
        {
            label: 'Usados',
            items: [{label: 'Marketplace'}, {label: 'Cotizá tu auto'}]
        },
    ];

    const start = <img alt="logo" src={logo} className="px-3 h-2rem w-auto"></img>;

    return (
        <>
            <Menubar className="py-3" model={items} start={start}/>
        </>
    );
}