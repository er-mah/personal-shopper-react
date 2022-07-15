import {Button} from "primereact/button";
import {useContext, useEffect, useState} from "react";
import {getBrands} from "../../../services/mah.service";
import {SellCarContext} from "../../../contexts";

export function Brand() {

    // Get information from context
    const [formData, setFormData] = useContext(SellCarContext);

    // Persist brands from api
    const [brandsFromApi, setBrandsFromApi] = useState([]);
    const [isLoading, setLoading] = useState(true);

    // When component is created, get brands
    useEffect(() => {
        getBrands().then((res) => {
            setBrandsFromApi(res.data.data);
            setLoading(false);
        })
    }, []);

    const selectBrand = (id) => {
        setFormData({...formData, vehicleBrand: id})
    }


    return <>
        <h3>¿Qué marca?</h3>
        {
            isLoading ?
                <p>Cargando...</p> :
                (<>
                    {brandsFromApi.map((data) => (
                        <Button key={data.id}
                                label={data.name}
                                onClick={() => selectBrand(data.id)}
                                className="p-button-raised p-button-sm p-button-rounded m-1"/>
                    ))}
                </>)
        }
    </>
}