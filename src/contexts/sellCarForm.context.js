import {createContext, useState} from 'react';

// Context
export const SellCarContext = createContext({});

// Provider
export const SellCarProvider = ({children}) => {

    // Shared vars in context
    const [formData, setFormData] = useState({}); // State to store unsaved form data
    const [proceedNext, setProceedNext] = useState(false); // Manage 'next' button within each component

    return (
        <SellCarContext.Provider value={[formData, setFormData, proceedNext, setProceedNext]}>
            {children}
        </SellCarContext.Provider>
    );
};