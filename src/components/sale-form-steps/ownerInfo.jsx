import {InputText} from "primereact/inputtext";
import {useState} from "react";
import {Dropdown} from "primereact/dropdown";
import {InputNumber} from "primereact/inputnumber";
import {Button} from "primereact/button";
import {MAIN_URLS, NEW_SALE_FORM_URLS} from "../../utils/constants";
import {useNavigate} from "react-router-dom";

export function OwnerInfo({step, setStep}) {

    let navigate = useNavigate();

    const contact = useState(null);
    const ContactItems = [{label: 'Mensaje de WhatsApp', value: 'WhatsApp'}, {
        label: 'Correo electrónico',
        value: 'Email'
    }];

    function setContact(value) {
        console.log(value)
    }

    const previousPage = () => {
        setStep(step - 1)
        navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.SIGN_IN)
    }

    const nextPage = () => {
        setStep(step + 1)
        navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.VEHICLE_COLOUR)
    }


    return (<>

        <div className="grid">
            <div className="col-1 flex justify-content-center">
                <Button icon="pi pi-angle-left"
                        className="p-button-rounded p-button-text p-button-danger"
                        aria-label="Back"
                        onClick={() => previousPage()}/>
            </div>
            <div className="col-10">

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
                    <Dropdown value={contact} options={ContactItems}
                              onChange={(e) => setContact(e.value)}
                              placeholder="Seleccioná una forma de contacto"/>
                    <small id="comWay-help" className="block">Decinos por qué medio preferís que te
                        contactemos</small>
                </div>
            </div>
            <div className="col-1 flex justify-content-center">
                <Button icon="pi pi-angle-right"
                        className="p-button-rounded p-button-text p-button-danger"
                        aria-label="Next"
                        onClick={() => nextPage()}/>
            </div>
        </div>

    </>);
}