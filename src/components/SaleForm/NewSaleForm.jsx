import {useState} from "react";
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
} from "./Steps";
import {ProgressBar} from "primereact/progressbar";
import {Button} from "primereact/button";
import React from "react";

export function NewSaleForm({proceedNext = true}) {

    // STATES
    // Persist actual step
    const [currentStep, setCurrentStep] = useState(0);

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

    // Go forward to the next step
    const nextStep = () => {
        setCurrentStep(currentStep + 1)
    };
    // Go backward to the prev step
    const previousStep = () => {
        setCurrentStep(currentStep - 1)
    };
    return (
        <>
            <ProgressBar showValue={false} value={(currentStep * 100 / componentList.length)}/>

            {/* Stepper
            <ProgressBar currentStep={currentStep} totalNoSteps={componentList.length}/>*/}
            {/* Form body */}

            <div className="row form-container">
                <div className="col-lg-12">{componentList[currentStep].component}</div>
            </div>

            {/* Navigation control

            <FormControls
                nextStep={nextStep}
                previousStep={previousStep}
                proceedNext={proceedNext}
            />*/}


            {currentStep > 0 ?
                <Button icon="pi pi-angle-left"
                        className="p-button-rounded p-button-primary"
                        aria-label="Back"
                        onClick={() => previousStep()}/>
                : <></>
            }

            {currentStep < componentList.length - 1 ?
                <Button icon="pi pi-angle-right"
                        className="p-button-rounded p-button-primary"
                        aria-label="Next"
                        onClick={() => nextStep()}/>
                : <></>
            }

        </>
    );
}