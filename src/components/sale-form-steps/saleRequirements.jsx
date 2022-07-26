import {Dropdown} from "primereact/dropdown";
import {useState} from "react";
import {InputText} from "primereact/inputtext";
import {useNavigate} from "react-router-dom";
import {MAIN_URLS, NEW_SALE_FORM_URLS} from "../../utils/constants";
import {Button} from "primereact/button";

export function SaleRequirements({step, setStep}) {

    const [currency, setCurrency] = useState(null);
    const [urgency, setUrgency] = useState(null);

    let navigate = useNavigate();

    const previousPage = () => {
        setStep(step - 1)
        navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.LICENCE_PLATE)
    }

    const nextPage = () => {
        setStep(step + 1)
        navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.QUOTATION)
    }

    const currencyOpts = [
        {label: '', value: '-'},
        {label: 'ARS', value: 'Pesos argentinos'},
        {label: 'USD', value: 'Dólares estadounidenses'},
    ];

    const urgencyOpts = [
        {label: 'en menos de 1 semana', value: '< 1 sem'},
        {label: 'en 2 semanas', value: '2 sem'},
        {label: 'en 3 semanas', value: '3 sem'},
        {label: 'en 4 semanas', value: '4 sem'},
        {label: 'no tengo apuro', value: 'no es urgente'},
    ];

    return (
        <>
            <div className="grid">
                <div className="col-1 flex justify-content-center">
                    <Button icon="pi pi-angle-left"
                            className="p-button-rounded p-button-text p-button-danger"
                            aria-label="Back"
                            onClick={() => previousPage()}/>
                </div>
                <div className="col-10">
                    <h2>¿Cuánto esperás recibir?</h2>
                    <div className="p-inputgroup">
                        <Dropdown value={currency} options={currencyOpts} onChange={(e) => setCurrency(e.value)}/>
                        <InputText placeholder="Ingresá el monto que esperás recibir" />
                    </div>
                    <h2>¿En cuánto tiempo lo querés vender?</h2>
                    <div className="p-inputgroup">
                        <Dropdown value={urgency} options={urgencyOpts} onChange={(e) => setUrgency(e.value)}/>
                    </div>
                </div>
                <div className="col-1 flex justify-content-center">
                    <Button icon="pi pi-angle-right"
                            className="p-button-rounded p-button-text p-button-danger"
                            aria-label="Next"
                            onClick={() => nextPage()}/>
                </div>
            </div>
        </>
    );
}