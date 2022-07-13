import React from 'react';
import {Menubar} from 'primereact/menubar';
import {InputText} from 'primereact/inputtext';
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

    const start = <img alt="logo" src={logo} height="38px"  className="mr-2 h-27rem w-auto"></img>;

    return (
        <div>
            <div className="card">
                <Menubar model={items} start={start}/>
            </div>
        </div>
    );
}