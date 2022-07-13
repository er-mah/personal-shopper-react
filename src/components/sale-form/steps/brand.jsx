import {Button} from "primereact/button";

export function Brand() {
    return (
        <>
            <h2>¿Qué marca?</h2>
            <Button label="VW" className="p-button-raised p-button-rounded"/>
            <Button label="Ford" className="p-button-raised p-button-rounded"/>
        </>
    );
}