import {createContext, useState} from 'react';

// Context
export const SellCarContext = createContext({});

// Provider
export const SellCarProvider = ({children}) => {

    // Shared vars in context
    const [formData, setFormData] = useState({
        //brand: null,
        year: null,
        //model: null,
        version: null,
        versionId: null,
        //codia: null,
        //comfort: null,
        //technicalInfo: null,
        //engineAndTransmission: null,
        //security: null,
        //color: null,
        //kilometers: null,
        //licensePlateType: null,
        //licensePlate: null,
        //state: null,
        //comments: null,
        //currency: null,
        //requiredAmount: null,
        //urgency: null,
        //priceRange: null,
        //revisionDatetime: null
    }); // State to store unsaved form data

    const [quotationInfo, setQuotationInfo] = useState({
        year: null,
        codia: null,
        colorCategory: null,
        stateCategory: null,
        urgencyCategory: null,
        kmsCategory: null
    });

    const sharedVariables = [formData, setFormData, quotationInfo, setQuotationInfo]

    return (
        <SellCarContext.Provider value={sharedVariables}>
            {children}
        </SellCarContext.Provider>
    );
};