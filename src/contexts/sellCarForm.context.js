import { createContext, useState } from "react";

// Context
export const SellCarContext = createContext({});

// Provider
export const SellCarProvider = ({ children }) => {

  // Store unsaved form data
  const [formData, setFormData] = useState({});
  // FORM VARIABLES
  // brandName  brandId         year  modelId  modelName  versionName   versionId
  // comfort    technicalInfo   engineAndTransmission     security
  // colour     kilometers      licensePlateType          licensePlate
  // state      comments        currency                  requiredAmount
  // urgency    priceRange      revisionDatetime

  // Store data to make requests to get the vehicle quotation
  const [quotationInfo, setQuotationInfo] = useState({});
  // QUOTATION VARIABLES
  // year             codia               colorCategory
  // stateCategory    urgencyCategory     kmsCategory

  // Shared vars in context
  const sharedVariables = [
    formData,
    setFormData,
    quotationInfo,
    setQuotationInfo,
  ];

  return (
    <SellCarContext.Provider value={sharedVariables}>
      {children}
    </SellCarContext.Provider>
  );
};
