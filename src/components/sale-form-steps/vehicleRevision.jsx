import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import {MAIN_URLS, NEW_SALE_FORM_URLS} from "../../utils/constants";

export function VehicleRevision({step, setStep}) {

    let navigate = useNavigate();

    const previousPage = () => {
        setStep(step - 1)
        navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.QUOTATION)
    }

    const nextPage = () => {
        setStep(step + 1)
        navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.FORM_COMPLETE)
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
                    <h2>Programá la revisión de tu auto</h2>
                    <p>Embeber calendly</p>
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