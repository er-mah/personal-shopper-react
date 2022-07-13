import {Button} from "primereact/button";
import {Chip} from "primereact/chip";

export function Year() {
    return (
        <>
            <h2>¿Qué año?</h2>
            <Button label="2007" className="p-button-raised p-button-rounded"/>
            <Button label="2008" className="p-button-raised p-button-rounded"/>
        </>
    );
}