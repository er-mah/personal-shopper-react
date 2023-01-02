import { useState } from "react";
import { ProgressBar } from "primereact/progressbar";
import {
  FormComplete,
  Model,
  NextSteps,
  Owner,
  Quotation,
  Start,
  VehicleDetails,
  VehicleRevision,
  VehicleSpecs,
} from "./sale-form-steps";
import { SellCarProvider } from "../contexts";
import { Navigate, Route, Routes } from "react-router-dom";

import {
  TECHMO_COLOUR,
  MAIN_URLS,
  NEW_SALE_FORM_URLS,
} from "../utils/constants";

export function NewSaleForm() {
  const [currentStep, setCurrentStep] = useState(0); // Persist actual step

  return (
    <SellCarProvider>
      <>
        <ProgressBar
          className=""
          showValue={false}
          value={(currentStep * 100) / Object.keys(NEW_SALE_FORM_URLS).length}
          color={TECHMO_COLOUR}
        />
        <div>
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
              path={NEW_SALE_FORM_URLS.OWNER}
              element={<Owner step={currentStep} setStep={setCurrentStep} />}
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
              element={
                <Quotation step={currentStep} setStep={setCurrentStep} />
              }
            />
            <Route
              path={NEW_SALE_FORM_URLS.REVISION}
              element={
                <VehicleRevision step={currentStep} setStep={setCurrentStep} />
              }
            />
            <Route
              path={NEW_SALE_FORM_URLS.NEXT_STEPS}
              element={
                <NextSteps step={currentStep} setStep={setCurrentStep} />
              }
            />
            <Route
              path={NEW_SALE_FORM_URLS.FORM_COMPLETE}
              element={
                <FormComplete step={currentStep} setStep={setCurrentStep} />
              }
            />
          </Routes>
        </div>
      </>
    </SellCarProvider>
  );
}
