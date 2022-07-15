import {Button} from "primereact/button";
import {useState, useContext, useEffect} from "react";
import {getModels} from "../../../services/mah.service";
import {SellCarContext} from "../../../contexts";

export function VehicleModel() {

    // Get information from context
    const [formData, setFormData] = useContext(SellCarContext);

    // Persist brands from api
    const [modelsFromApi, setModelsFromApi] = useState([]);
    const [isLoading, setLoading] = useState(true);

    // When component is created, get brands
    useEffect(() => {
        getModels(formData.vehicleBrand, formData.vehicleYear).then((res) => {
            setModelsFromApi(res.data.data);
            setLoading(false);
        })
    }, []);

    const selectModel = (modelId) => {
        setFormData({...formData, vehicleModel: modelId})
    }

    return (<>
            <h2>¿Qué modelo?</h2>
            {isLoading ? <p>Cargando...</p> : (<>
                {modelsFromApi.map((data) => (<Button key={data.id}
                                                      label={data.name}
                                                      onClick={() => selectModel(data.id)}
                                                      className="p-button-raised p-button-sm p-button-rounded m-1"/>))}
            </>)}
        </>);
}