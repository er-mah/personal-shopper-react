import {useState} from "react";
import {Slider} from "primereact/slider";
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";
import {Chip} from "primereact/chip";
import {useNavigate} from "react-router-dom";
import {MAIN_URLS, NEW_SALE_FORM_URLS} from "../../utils/constants";

export function VehicleState({step, setStep}) {

    let navigate = useNavigate();

    const [vehicleState, setVehicleState] = useState(0);
    const [comments, setCommentState] = useState(null);
    /*
    const stateItems = [
        {emoji: '💀', text: 'Muy malo', step: 1},
        {emoji: '😕', text: 'Malo', step: 2},
        {emoji: '👍', text: 'Aceptable', step: 3},
        {emoji: '😉', text: 'Bueno', step: 4},
        {emoji: '🤩', text: 'Excelente', step: 5},
    ];
    */

    const previousPage = () => {
        setStep(step - 1)
        navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.VEHICLE_COLOUR)
    }

    const nextPage = () => {
        setStep(step + 1)
        navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.LICENCE_PLATE)
    }


    return (<>

            <div className="grid">
                <div className="col-1 flex justify-content-center">
                    <Button icon="pi pi-angle-left"
                            className="p-button-rounded p-button-text p-button-danger"
                            aria-label="Back"
                            onClick={() => previousPage()}/>
                </div>
                <div className="col-10">
                    <h2>¿En qué estado está tu vehículo?</h2>
                    <Slider className="my-4 py-2" id="slider" list="tickmarks"
                            value={vehicleState} onChange={(e) => setVehicleState(e.value)} step={25}/>

                    <datalist id="tickmarks" className="mb-5">
                        <option value="0" label="💀 Muy malo"></option>
                        <option value="25" label="😕 Malo"></option>
                        <option value="50" label="👍 Aceptable"></option>
                        <option value="75" label="😉 Bueno"></option>
                        <option value="100" label="🤩 Excelente"></option>
                    </datalist>

                    <h4 className="mt-5">Comentarios adicionales</h4>
                    <InputTextarea rows={5} cols={100} value={comments}
                                   onChange={(e) => setCommentState(e.target.value)} autoResize/>

                </div>
                <div className="col-1 flex justify-content-center">
                    <Button icon="pi pi-angle-right"
                            className="p-button-rounded p-button-text p-button-danger"
                            aria-label="Next"
                            onClick={() => nextPage()}/>
                </div>
            </div>
        </>);
}