import {Button} from "primereact/button";
import {useState, useContext, useEffect} from "react";
import {getModels} from "../../services/mah.service";
import {SellCarContext} from "../../contexts";
import {MAIN_URLS, NEW_SALE_FORM_URLS} from "../../utils/constants";
import {useNavigate} from "react-router-dom";

export function VehicleModel({step, setStep}) {

    let navigate = useNavigate();

    // Get information from context
    const [formData, setFormData] = useContext(SellCarContext);

    // Persist brands from api
    const [modelsFromApi, setModelsFromApi] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [selectedModel, setSelectedModel] = useState(null);

    // When component is created, get brands
    useEffect(() => {
        setStep(3)
        // If the data from the previous component is none, redirect to the component to set it
        if (formData.vehicleYear === undefined) {
            setStep(step - 1)
            navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.YEAR)
        }
        // If the
        if (formData.vehicleModel !== undefined) {
            setSelectedModel(formData.vehicleModel)
        }
        getModels(formData.vehicleBrand, formData.vehicleYear).then((res) => {
            setModelsFromApi(res.data.data);
            setLoading(false);
        })
    }, [formData]);

    const selectModel = (modelId) => {
        setFormData({...formData, vehicleModel: modelId})
        setStep(step + 1)
        navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.VEHICLE_DETAILS)
    }

    const previousPage = () => {
        setStep(step - 1)
        navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.YEAR)
    }

    const nextPage = () => {
        setStep(step + 1)
        navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.VEHICLE_DETAILS)
    }

    return <>
        <div className="grid">
            <div className="col-1 flex justify-content-center">
                <Button icon="pi pi-angle-left"
                        className="p-button-rounded p-button-text p-button-danger"
                        aria-label="Back"
                        onClick={() => previousPage()}/>
            </div>
            <div className="col-10">
                <h2>¿Qué modelo?</h2>
                {isLoading ? <p>Cargando...</p> : (<>
                    {modelsFromApi.map((data) => (<Button key={data.id}
                                                          label={data.name}
                                                          onClick={() => selectModel(data.id)}
                                                          disabled={selectedModel === data.id}
                                                          className="p-button-raised p-button-sm p-button-rounded p-button-secondary m-1"/>))}
                </>)}

            </div>
            <div className="col-1 flex justify-content-center">
                <Button icon="pi pi-angle-right"
                        className="p-button-rounded p-button-text p-button-danger"
                        aria-label="Next"
                        disabled={!selectedModel}
                        onClick={() => nextPage()}/>
            </div>
        </div>
    </>
}