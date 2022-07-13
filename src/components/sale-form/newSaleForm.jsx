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
} from "./steps";
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
            <ProgressBar showValue={false} value={(currentStep * 100 / (componentList.length - 1))}/>

            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
                    <h3 className="text-xl font-bold text-gray-600">Vendé tu auto</h3>
                </div>
            </header>
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


            <Button icon="pi pi-angle-left"
                    className="p-button-rounded p-button-primary"
                    aria-label="Back"
                    disabled={!(currentStep > 0)}
                    onClick={() => previousStep()}/>

            <Button icon="pi pi-angle-right"
                    className="p-button-rounded p-button-primary"
                    aria-label="Next"
                    disabled={!(currentStep < componentList.length - 1)}
                    onClick={() => nextStep()}/>

        </>
    );
}