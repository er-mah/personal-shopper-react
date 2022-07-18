import {Dropdown} from "primereact/dropdown";
import {useState} from "react";
import {InputText} from "primereact/inputtext";

export function PersonalRequirements() {

    const [currency, setCurrency] = useState(null);
    const [urgency, setUrgency] = useState(null);

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

            <h2>¿Cuánto esperás recibir?</h2>

            <div className="p-inputgroup">
                <Dropdown value={currency} options={currencyOpts} onChange={(e) => setCurrency(e.value)}/>
                <InputText placeholder="Ingresá el monto que esperás recibir" />
            </div>
            <h2>¿En cuánto tiempo lo querés vender?</h2>
            <div className="p-inputgroup">
                <Dropdown value={urgency} options={urgencyOpts} onChange={(e) => setUrgency(e.value)}/>
            </div>
        </>
    );
}