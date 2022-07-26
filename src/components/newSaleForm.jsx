import {cloneElement, useState} from "react";
import {ProgressBar} from "primereact/progressbar";
import {
    Brand, FormCompleted,
    LicencePlate,
    Login,
    PersonalInfo, PersonalRequirements, Quotation,
    VehicleColour,
    VehicleInfo,
    VehicleModel, VehicleRevision,
    VehicleState,
    Year
} from "./sale-form-steps";
import {SellCarProvider} from "../contexts";
import {Route, Routes} from "react-router-dom";

import {MAH_RED_COLOUR, NEW_SALE_FORM_URLS} from "../utils/constants";

export function NewSaleForm() {

    const [currentStep, setCurrentStep] = useState(0); // Persist actual step

    // Stores each component that is involved in the form
    const componentList = [
        {name: "Marca", component: <Brand/>},
        {name: "Año", component: <Year/>},
        {name: "Modelo", component: <VehicleModel/>},
        {name: "Tu auto", component: <VehicleInfo/>},
        {name: "Login", component: <Login/>},
        {name: "Información personal", component: <PersonalInfo/>},
        {name: "Color", component: <VehicleColour/>},
        {name: "Estado", component: <VehicleState/>},
        {name: "Patente", component: <LicencePlate/>},
        {name: "Dinero y tiempo de venta", component: <PersonalRequirements/>},
        {name: "Cotización", component: <Quotation/>},
        {name: "Inspección", component: <VehicleRevision/>},
        {name: "Finalización", component: <FormCompleted/>}
    ]

    return (
        <SellCarProvider>
            <div className="row">
                <ProgressBar className="mb-2"
                             showValue={false}
                             value={(currentStep * 100 / (componentList.length - 1))}
                             color={MAH_RED_COLOUR}/>
                <Routes>
                    <Route path={NEW_SALE_FORM_URLS.BRAND} element={<Brand step={currentStep} setStep={setCurrentStep}/>}/>
                    <Route path={NEW_SALE_FORM_URLS.YEAR} element={<Year step={currentStep} setStep={setCurrentStep}/>}/>
                    <Route path={NEW_SALE_FORM_URLS.MODEL} element={<VehicleModel step={currentStep} setStep={setCurrentStep}/>}/>
                    <Route path={NEW_SALE_FORM_URLS.VEHICLE_DETAILS} element={<VehicleInfo step={currentStep} setStep={setCurrentStep}/>}/>
                    <Route path={NEW_SALE_FORM_URLS.SIGN_IN} element={<Login step={currentStep} setStep={setCurrentStep}/>}/>
                    <Route path={NEW_SALE_FORM_URLS.OWNER} element={<PersonalInfo step={currentStep} setStep={setCurrentStep}/>}/>
                    <Route path={NEW_SALE_FORM_URLS.VEHICLE_COLOUR} element={<VehicleColour step={currentStep} setStep={setCurrentStep}/>}/>
                    <Route path={NEW_SALE_FORM_URLS.VEHICLE_STATE} element={<VehicleState step={currentStep} setStep={setCurrentStep}/>}/>
                    <Route path={NEW_SALE_FORM_URLS.LICENCE_PLATE} element={<LicencePlate step={currentStep} setStep={setCurrentStep}/>}/>
                    <Route path={NEW_SALE_FORM_URLS.SALE} element={<PersonalRequirements step={currentStep} setStep={setCurrentStep}/>}/>
                    <Route path={NEW_SALE_FORM_URLS.QUOTATION} element={<Quotation step={currentStep} setStep={setCurrentStep}/>}/>
                    <Route path={NEW_SALE_FORM_URLS.REVISION} element={<VehicleRevision step={currentStep} setStep={setCurrentStep}/>}/>
                    <Route path={NEW_SALE_FORM_URLS.DONE} element={<FormCompleted step={currentStep} setStep={setCurrentStep}/>}/>
                </Routes>
            </div>
        </SellCarProvider>
    );


}