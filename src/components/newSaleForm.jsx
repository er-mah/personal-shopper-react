import { useState } from "react";
import { ProgressBar } from "primereact/progressbar";
import {
  Model,
  FormComplete,
  Start,
  Quotation,
  VehicleDetails,
  VehicleSpecs,
  VehicleRevision,
} from "./sale-form-steps";
import { SellCarProvider } from "../contexts";
import { Navigate, Route, Routes } from "react-router-dom";

import {
  MAH_RED_COLOUR,
  MAIN_URLS,
  NEW_SALE_FORM_URLS,
} from "../utils/constants";

export function NewSaleForm() {
  const [currentStep, setCurrentStep] = useState(0); // Persist actual step

  return (
    <SellCarProvider>
      <>
        <ProgressBar
          className="mb-2"
          showValue={false}
          value={(currentStep * 100) / Object.keys(NEW_SALE_FORM_URLS).length}
          color={MAH_RED_COLOUR}
        />
        <Routes>
          <Route
            path={"/"}
            element={
              <Navigate
                to={MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.START}
                replace
              />
            }
          />
          <Route
            path={NEW_SALE_FORM_URLS.START}
            element={<Start step={currentStep} setStep={setCurrentStep} />}
          />
          <Route
            path={NEW_SALE_FORM_URLS.MODEL}
            element={<Model step={currentStep} setStep={setCurrentStep} />}
          />
          <Route
            path={NEW_SALE_FORM_URLS.VEHICLE_SPECS}
            element={
              <VehicleSpecs step={currentStep} setStep={setCurrentStep} />
            }
          />
          <Route
            path={NEW_SALE_FORM_URLS.VEHICLE_DETAILS}
            element={
              <VehicleDetails step={currentStep} setStep={setCurrentStep} />
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
