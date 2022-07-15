import {createContext, useState} from 'react';

// Context
export const SellCarContext = createContext({});

// Provider
export const SellCarProvider = ({children}) => {

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

    // Shared vars in context
    const [formData, setFormData] = useState({}); // State to store unsaved form data
    const [proceedNext, setProceedNext] = useState(false); // Manage 'next' button within each component


    return (<SellCarContext.Provider value={[formData, setFormData, proceedNext, setProceedNext]}>
            {children}
        </SellCarContext.Provider>);
};