import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import {Dropdown} from "primereact/dropdown";
import {MAIN_URLS, NEW_SALE_FORM_URLS} from "../../utils/constants";
import {useNavigate} from "react-router-dom";

export function VehicleColour({step, setStep}) {

    let navigate = useNavigate();

    const previousPage = () => {
        setStep(step - 1)
        navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.OWNER)
    }

    const nextPage = () => {
        setStep(step + 1)
        navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.VEHICLE_STATE)
    }

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
                    <h2>¿Qué color?</h2>
                    <p>TODO: definir colores mas importantes</p>
                    <Button label="Rojo"
                            className="p-button-raised p-button-sm p-button-rounded p-button-secondary m-1"/>
                    <Button label="Azul"
                            className="p-button-raised p-button-sm p-button-rounded p-button-secondary m-1"/>
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