import {cloneElement, useState} from "react";
import {ProgressBar} from "primereact/progressbar";
import {Button} from "primereact/button";
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
} from "./sale-form/steps";
import {SellCarProvider} from "../contexts";

export function NewSaleForm() {

    const [currentStep, setCurrentStep] = useState(0); // Persist actual step

    // Go forward to the next step
    const nextStep = () => {
        setCurrentStep(currentStep + 1)
    };

    // Go backward to the prev step
    const previousStep = () => {
        setCurrentStep(currentStep - 1)
    };

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

    let childElement = cloneElement(componentList[currentStep].component,
        {step: currentStep, setStep: setCurrentStep});

    return (
        <SellCarProvider>
            <div className="row">
                <ProgressBar className=""
                             showValue={false}
                             value={(currentStep * 100 / (componentList.length - 1))}/>

                <div className="col-12 grid">
                    <div className="col-1 flex justify-content-center">
                        <Button icon="pi pi-angle-left"
                                className="p-button-rounded p-button-text p-button-primary"
                                aria-label="Back"
                                disabled={!(currentStep > 0)}
                                onClick={() => previousStep()}/>
                    </div>
                    <div className="col-10">
                        { childElement }
                    </div>
                    <div className="col-1 flex justify-content-center">
                        <Button icon="pi pi-angle-right"
                                className="p-button-rounded p-button-text p-button-primary"
                                aria-label="Next"
                                disabled={!(currentStep < componentList.length - 1)}
                                onClick={() => nextStep()}/>
                    </div>
                </div>
            </div>
        </SellCarProvider>
    );


}