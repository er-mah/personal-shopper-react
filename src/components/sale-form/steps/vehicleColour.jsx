import {Button} from "primereact/button";

export function VehicleColour() {
    return (
        <>
            <h2>¿Qué color?</h2>
            <Button label="Rojo" className="p-button-raised p-button-rounded"/>
            <Button label="Azul" className="p-button-raised p-button-rounded"/>
        </>
    );
}