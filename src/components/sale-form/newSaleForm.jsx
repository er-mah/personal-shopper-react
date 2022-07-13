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
            {/* Form body */}
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

                        {/* TODO: Breadcrumbs */}
                        <ul className="list-none p-0 m-0 flex align-items-center font-medium mb-3">
                            <li>
                                <a className="text-500 no-underline line-height-3 cursor-pointer">Application</a>
                            </li>
                            <li className="px-2">
                                <i className="pi pi-angle-right text-500 line-height-3"></i>
                            </li>
                            <li>
                                <span className="text-900 line-height-3">Analytics</span>
                            </li>
                        </ul>


                        {componentList[currentStep].component}
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
        </>
    );
}