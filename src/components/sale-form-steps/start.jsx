import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import {MAIN_URLS, NEW_SALE_FORM_URLS} from "../../utils/constants";
import {useEffect} from "react";

export function Start({setStep}) {
    let navigate = useNavigate();

    const nextPage = () => {
        navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.MODEL);
    };

    // When component is rendered
    useEffect(() => {
        setStep(1); // Set progress bar status
    }, []);

    return (
        <>
            <div className={"px-5"}>
                <h2>Necesitamos que inicies sesion completar información adicional</h2>
                <p>Insertar componente de inicio de sesión</p>
            </div>



            <Button
                icon="pi pi-angle-left"
                className="p-button-rounded p-button-danger left-button"
                aria-label="Back"
            />

            <Button
                icon="pi pi-angle-right"
                className="p-button-rounded p-button-danger right-button"
                aria-label="Next"
                onClick={() => nextPage()}
            />

        </>
    );
}