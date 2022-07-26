import {createContext, useState} from 'react';

// Context
export const SellCarContext = createContext({});

// Provider
export const SellCarProvider = ({children}) => {

    // Shared vars in context
    const [formData, setFormData] = useState({}); // State to store unsaved form data

    return (
        <SellCarContext.Provider value={[formData, setFormData]}>
            {children}
        </SellCarContext.Provider>
    );
};