import {createContext, useState} from 'react';

// Context
export const SellCarContext = createContext({});

// Provider
export const SellCarProvider = ({children}) => {

    // Shared vars in context
    const [formData, setFormData] = useState({
        vehicleBrandID: null,
        vehicleYear: null,
        vehicleModelID: null,
        vehicleVersionCodiaID: null
    }); // State to store unsaved form data

    return (
        <SellCarContext.Provider value={[formData, setFormData]}>
            {children}
        </SellCarContext.Provider>
    );
};