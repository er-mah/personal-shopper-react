import {Button} from "primereact/button";
import {useContext, useEffect, useState} from "react";
import {getBrands} from "../../services/mah.service";
import {SellCarContext} from "../../contexts";
import {useNavigate} from "react-router-dom";
import {MAIN_URLS, NEW_SALE_FORM_URLS} from "../../utils/constants";

export function Brand({step, setStep}) {

    let navigate = useNavigate();

    // Get information from context
    const [formData, setFormData] = useContext(SellCarContext);

    // Persist brands from api
    const [brandsFromApi, setBrandsFromApi] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [isLoading, setLoading] = useState(true);

    // When component is rendered, get brands
    useEffect(() => {
        setStep(1)
        if (formData.vehicleBrand !== undefined) {
            setSelectedBrand(formData.vehicleBrand)
        }
        getBrands().then((res) => {
            setBrandsFromApi(res.data.data);
            setLoading(false);
        })
    }, []);

    const selectBrand = (id) => {

        setSelectedBrand(id)
        setFormData({...formData, vehicleBrand: id})
        setStep(step + 1)
        navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.YEAR)
    }

    const nextPage = () => {
        setStep(step + 1)
        navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.YEAR)
    }

    return <>
        <div className="grid">
            <div className="col-1 flex justify-content-center">
                <Button icon="pi pi-angle-left"
                        className="p-button-rounded p-button-text p-button-danger"
                        aria-label="Back"
                        disabled={true}/>
            </div>
            <div className="col-10">

                <h2>¿Qué marca?</h2>
                {
                    isLoading ?
                        <p>Cargando...</p> :
                        (<>
                            {brandsFromApi.map((data) => (
                                <Button key={data.id}
                                        label={data.name}
                                        selected={selectedBrand === data.id}
                                        onClick={() => selectBrand(data.id)}
                                        disabled={selectedBrand === data.id}
                                        className="p-button-raised p-button-sm p-button-rounded p-button-secondary m-1"/>
                            ))}
                        </>)
                }
            </div>
            <div className="col-1 flex justify-content-center">
                <Button icon="pi pi-angle-right"
                        className="p-button-rounded p-button-text p-button-danger"
                        aria-label="Next"
                        disabled={!selectedBrand}
                        onClick={() => nextPage()}/>
            </div>
        </div>
    </>
}