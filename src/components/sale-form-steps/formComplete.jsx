import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import {MAIN_URLS, NEW_SALE_FORM_URLS} from "../../utils/constants";
import {useEffect} from "react";

export function FormComplete({step, setStep}) {

    let navigate = useNavigate();

    const previousPage = () => {
        navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.QUOTATION)
    }

    // When component is rendered
    useEffect(() => {
        setStep(8); // Set progress bar status
    }, []);

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
                    <h2>Finalizaste el formulario</h2>
                    <p>En construcción... </p>
                </div>
                <div className="col-1 flex justify-content-center"></div>
            </div>
        </>
    );
}