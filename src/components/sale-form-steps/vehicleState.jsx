import {useState} from "react";
import {Slider} from "primereact/slider";
import {InputTextarea} from "primereact/inputtextarea";

export function VehicleState() {

    const [vehicleState, setVehicleState] =  useState(0);
    /*
    const stateItems = [
        {emoji: '💀', text: 'Muy malo', step: 1},
        {emoji: '😕', text: 'Malo', step: 2},
        {emoji: '👍', text: 'Aceptable', step: 3},
        {emoji: '😉', text: 'Bueno', step: 4},
        {emoji: '🤩', text: 'Excelente', step: 5},
    ];
    */

    const [comments, setCommentState] =  useState(null);

    return (
        <>
            <h2>¿En qué estado está tu vehículo?</h2>
            <Slider className="my-4 py-2" id="slider" list="tickmarks"
                value={vehicleState} onChange={(e) => setVehicleState(e.value)} step={25} />

            <datalist id="tickmarks" className="mb-5">
                <option value="0" label="💀 Muy malo"></option>
                <option value="25" label="😕 Malo"></option>
                <option value="50" label="👍 Aceptable"></option>
                <option value="75" label="😉 Bueno"></option>
                <option value="100" label="🤩 Excelente"></option>
            </datalist>

            <h4 className="mt-5">Comentarios adicionales</h4>
            <InputTextarea rows={5} cols={100} value={comments} onChange={(e) => setCommentState(e.target.value)} autoResize />
        </>
    );
}