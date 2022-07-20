import {InputText} from "primereact/inputtext";
import {useState} from "react";
import {Dropdown} from "primereact/dropdown";
import {InputNumber} from "primereact/inputnumber";

export function PersonalInfo() {

    const contact =  useState(null);
    const ContactItems = [
        {label: 'Mensaje de WhatsApp', value: 'WhatsApp'},
        {label: 'Correo electrónico', value: 'Email'}
    ];

    function setContact(value) {
        console.log(value)
    }

    return (
        <>
            <h2>Tus datos de contacto</h2>
            <div className="field">
                <label htmlFor="nombre" className="block">Nombre completo</label>
                <InputText id="nombre" className="block"/>
            </div>
            <div className="field">
                <label htmlFor="email" className="block">Correo electrónico</label>
                <InputText id="email" aria-describedby="email-help" className="block"/>
            </div>
            <div className="field">
                <label htmlFor="addr" className="block">Dirección</label>
                <InputText id="addr" aria-describedby="addr-help" className="block"/>
            </div>
            <div className="field">
                <label htmlFor="tel" className="block">Teléfono</label>
                <InputNumber id="tel" aria-describedby="tel-help" className="block"/>
            </div>
            <div className="field">
                <label htmlFor="comWay" className="block">Medio de contacto de preferencia</label>
                {/*
                <Dropdown value={city} options={ContactItems} onChange={(e) => setCity(e.value)} placeholder="Select a City"/> */}
                <Dropdown value={contact} options={ContactItems}
                          onChange={(e) => setContact(e.value)}
                          placeholder="Seleccioná una forma de contacto"/>
                <small id="comWay-help" className="block">Decinos por qué medio preferís que te contactemos</small>
            </div>
        </>
    );
}