import {NewSaleForm} from "./sale-form";
import {useState} from "react";
import SellCarContext from "../contexts/sellCarForm.context";


function SellCar() {

    // Form data is persisted in an object
    const initialFormValues = {
        vehicle: {
            brand: null,
            year: null,
            model: null,
            colour: null,
            state: null,
            licensePlate: null,
            sellPrice: null,
            sellTime: null
        }, owner: {
            fullName: null, email: null, address: null, phoneNumber: null
        }, inspection: {
            date: null, time: null
        }
    }

    // State to store unsaved form data at component switch.
    const [formData, setFormData] = useState(initialFormValues);

    // Enable/disable 'next' button within each component
    const [proceedNext, setProceedNext] = useState(false);

    return (<>
        <SellCarContext.Provider value={[formData, setFormData, proceedNext, setProceedNext]}>
            <NewSaleForm/>
        </SellCarContext.Provider>
    </>);
}

export default SellCar;