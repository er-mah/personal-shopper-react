import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import {MAIN_URLS, NEW_SALE_FORM_URLS} from "../../utils/constants/urls";
import {useEffect} from "react";

export function FormComplete({step, setStep}) {

    let navigate = useNavigate();

    const previousPage = () => {
        navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.REVISION)
    }

    // When component is rendered
    useEffect(() => {
        setStep(7); // Set progress bar status
    }, []);

    return (
        <>

            <div className="px-5">
                <h2>¡Finalizaste el formulario! 🥳</h2>
                <p>Has completado toda la informacion que necesitamos. En los próximos dias nos estaremos comunicando para concretar con los datos de la venta de tu vehículo.  </p>
                <Button label="Ir a mis vehículos" />
                <h3 className={'text-red-600'}>(La idea es que en el apartado mis publicaciones pueda ver el estado de la venta)</h3>
            </div>

        </>
    );
}