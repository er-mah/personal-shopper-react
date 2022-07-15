import {Button} from "primereact/button";
import {useContext, useEffect, useState} from "react";
import {getBrands, getYears} from "../../../services/mah.service";
import {SellCarContext} from "../../../contexts";

export function Year() {

    // Get information from context
    const [formData, setFormData] = useContext(SellCarContext);

    // Persist brands from api
    const [yearsFromApi, setYearsFromApi] = useState([]);
    const [isLoading, setLoading] = useState(true);

    // When component is created, get years
    useEffect(() => {
        getYears(formData.vehicleBrand).then((res) => {
            setYearsFromApi(res.data.data);
            setLoading(false);
        })
    }, []);

    const selectYear = (year) => {
        setFormData({...formData, vehicleYear: year})
    }

    return (
        <>
            <h2>¿Qué año?</h2>
            {
                isLoading ?
                    <p>Cargando...</p> :
                    (<>
                        {yearsFromApi.map((data) => (
                            <Button key={data.id}
                                    label={data.anio}
                                    onClick={() => selectYear(data.id)}
                                    className="p-button-raised p-button-sm p-button-rounded m-1"/>
                        ))}
                    </>)
            }
        </>
    );
}