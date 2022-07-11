import {useState} from "react";

import {NewSaleForm} from "./SaleForm";
import SellCarFormContext from "../context/SellCarFormContext";

function SellCar() {

    // Form data is persisted in an object
    const initialFormValues = {
        vehicle: {
            brand: "",
            year: "",
            model: "",
            colour: "",
            state: "",
            licensePlate: "",
            sellPrice: "",
            sellTime: ""
        },
        owner: {
            fullName: "",
            email: "",
            address: "",
            phoneNumber: ""
        },
        inspection: {
            date: "",
            time: ""
        }
    }

    // State to store unsaved form data at component switch.
    const [formData, setFormData] = useState(initialFormValues);

    // Enable/disable 'next' button within each component
    const [proceedNext, setProceedNext] = useState(true);

    return (
        <>
            <SellCarFormContext.Provider value={{formData, setFormData, setProceedNext}}>
                <NewSaleForm proceedNext={proceedNext}/>
            </SellCarFormContext.Provider>
        </>
    );
}

export default SellCar;