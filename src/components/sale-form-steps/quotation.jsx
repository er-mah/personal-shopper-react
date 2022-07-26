import {useNavigate} from "react-router-dom";
import {MAIN_URLS, NEW_SALE_FORM_URLS} from "../../utils/constants";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import {InputText} from "primereact/inputtext";

export function Quotation({step, setStep}) {

    let navigate = useNavigate();

    const previousPage = () => {
        setStep(step - 1)
        navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.SALE)
    }

    const nextPage = () => {
        setStep(step + 1)
        navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.REVISION)
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
                    <h2>Conocé la cotización de tu vehículo</h2>
                    <p>Si lo vendes con nosotros, recibís:</p>
                    <div className="card">
                        <div className="flex flex-wrap align-items-center justify-content-center card-container">
                            <div className="surface-overlay border-round border-1 p-3 m-3 w-16rem min-h-full">
                                $ 900.000 - $ 1.200.000
                            </div>
                        </div>
                    </div>
                    <p>Otras agencias te lo pueden recibir a:</p>
                    <div className="card">
                        <div className="flex flex-wrap align-items-center justify-content-center card-container">
                            <div className="surface-overlay border-round border-1 p-3 m-3 w-16rem min-h-full">
                                $ 700.000
                            </div>
                            <br/>
                            <div className="surface-overlay border-round border-1 p-3 m-3 w-16rem min-h-full">
                                $ 650.000
                            </div>
                        </div>
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