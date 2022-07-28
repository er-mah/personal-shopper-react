import { useState } from "react";
import { ProgressBar } from "primereact/progressbar";
import {
  Brand,
  FormComplete,
  Login,
  SaleRequirements,
  Quotation,
  VehicleColour,
  VehicleDetails,
  VehicleRevision,
} from "./sale-form-steps";
import { SellCarProvider } from "../contexts";
import { Route, Routes } from "react-router-dom";

import { MAH_RED_COLOUR, NEW_SALE_FORM_URLS } from "../utils/constants";

export function NewSaleForm() {
  const [currentStep, setCurrentStep] = useState(0); // Persist actual step

  return (
    <SellCarProvider>
      <>
        <ProgressBar
          className="mb-2"
          showValue={false}
          value={
            (currentStep * 100) / (Object.keys(NEW_SALE_FORM_URLS).length - 1)
          }
          color={MAH_RED_COLOUR}
        />
        <Routes>
          <Route
            path={NEW_SALE_FORM_URLS.BRAND}
            element={<Brand step={currentStep} setStep={setCurrentStep} />}
          />
          <Route
            path={NEW_SALE_FORM_URLS.VEHICLE_DETAILS}
            element={
              <VehicleDetails step={currentStep} setStep={setCurrentStep} />
            }
          />
          <Route
            path={NEW_SALE_FORM_URLS.SIGN_IN}
            element={<Login step={currentStep} setStep={setCurrentStep} />}
          />
          <Route
            path={NEW_SALE_FORM_URLS.VEHICLE_COLOUR}
            element={
              <VehicleColour step={currentStep} setStep={setCurrentStep} />
            }
          />
          <Route
            path={NEW_SALE_FORM_URLS.SALE}
            element={
              <SaleRequirements step={currentStep} setStep={setCurrentStep} />
            }
          />
          <Route
            path={NEW_SALE_FORM_URLS.QUOTATION}
            element={<Quotation step={currentStep} setStep={setCurrentStep} />}
          />
          <Route
            path={NEW_SALE_FORM_URLS.REVISION}
            element={
              <VehicleRevision step={currentStep} setStep={setCurrentStep} />
            }
          />
          <Route
            path={NEW_SALE_FORM_URLS.FORM_COMPLETE}
            element={
              <FormComplete step={currentStep} setStep={setCurrentStep} />
            }
          />
        </Routes>
      </>
    </SellCarProvider>
  );
}
