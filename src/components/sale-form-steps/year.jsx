import {Button} from "primereact/button";
import {useContext, useEffect, useState} from "react";
import {getYears} from "../../services/mah.service";
import {SellCarContext} from "../../contexts";
import {MAIN_URLS, NEW_SALE_FORM_URLS} from "../../utils/constants";
import {useNavigate} from "react-router-dom";

export function Year({step, setStep}) {

    let navigate = useNavigate();

    // Get information from context
    const [formData, setFormData] = useContext(SellCarContext);

    // Persist brands from api
    const [yearsFromApi, setYearsFromApi] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState(null);

    // When component is created, get years
    useEffect(() => {
        if (formData.vehicleBrand === undefined) {
            setStep(2)
            navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.BRAND)
        }
        if (formData.vehicleYear !== undefined) {
            setSelectedYear(formData.vehicleYear)
        }
        getYears(formData.vehicleBrand)
            .then((res) => {
            setYearsFromApi(res.data.data);
            setLoading(false);
        })
    }, [formData]);

    const selectYear = (year) => {
        setFormData({...formData, vehicleYear: year})
        setStep(step + 1)
        navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.MODEL)
    }


    const previousPage = () => {
        setStep(step - 1)
        navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.BRAND)
    }

    const nextPage = () => {
        setStep(step + 1)
        navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.MODEL)
    }


    return (
        <>
            <div className="grid">
                <div className="col-1 flex justify-content-center">
                    <Button icon="pi pi-angle-left"
                            className="p-button-rounded p-button-text p-button-danger"
                            aria-label="Back"
                            onClick={() => previousPage()}/>
                </div>
                <div className="col-10">
                    <h2>¿Qué año?</h2>
                    {
                        isLoading ?
                            <p>Cargando...</p> :
                            (<>
                                {yearsFromApi.map((data) => (
                                    <Button key={data.id}
                                            label={data.anio}
                                            onClick={() => selectYear(data.id)}
                                            disabled={selectedYear === data.id}
                                            className="p-button-raised p-button-sm p-button-rounded p-button-secondary m-1"/>
                                ))}
                            </>)
                    }
                </div>
                <div className="col-1 flex justify-content-center">
                    <Button icon="pi pi-angle-right"
                            className="p-button-rounded p-button-text p-button-danger"
                            aria-label="Next"
                            disabled={!selectedYear}
                            onClick={() => nextPage()}/>
                </div>
            </div>
        </>
    );
}