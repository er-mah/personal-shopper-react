import { useNavigate } from "react-router-dom";
import { MAIN_URLS, NEW_SALE_FORM_URLS } from "../../utils/constants";
import { Button } from "primereact/button";
import {useContext, useEffect, useState} from "react";
import { SellCarContext } from "../../contexts";
import VehicleService from "../../services/vehicle.service";

export function Quotation({ step, setStep }) {
  let service = new VehicleService();

  const [formData, setFormData, quotationInfo, setQuotationInfo] = useContext(SellCarContext);
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);

  let navigate = useNavigate();

  const previousPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.VEHICLE_DETAILS);
  };

  const nextPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.REVISION);
  };

  // When component is rendered
  useEffect(() => {
    setStep(5); // Set progress bar status

    const payload = {
      colour: quotationInfo.colorCategory,
      kilometers: quotationInfo.kmsCategory,
      sellingTime: quotationInfo.urgency,
      state: quotationInfo.stateCategory,
      versionId: quotationInfo.codia,
      year: quotationInfo.year,
    };

    service.getQuotation(payload).then(
        (res) => {
          setMinValue(res.data.data.minValue)
          setMaxValue(res.data.data.maxValue)
        }
    );
  }, []);

  return (
    <>
      <div className="grid">
        <div className="col-1 flex justify-content-center">
          <Button
            icon="pi pi-angle-left"
            className="p-button-rounded p-button-text p-button-danger"
            aria-label="Back"
            onClick={() => previousPage()}
          />
        </div>
        <div className="col-10">
          {JSON.stringify(quotationInfo)}
          <h2>Conocé la cotización de tu vehículo</h2>
          <p>Si lo vendes con nosotros, recibís:</p>
          <div className="card">
            <div className="flex flex-wrap align-items-center justify-content-center card-container">
              <div className="surface-overlay border-round border-1 p-3 m-3 w-16rem min-h-full">
                $ {minValue} - $ {maxValue}
              </div>
            </div>
          </div>
          <p>Otras agencias te lo pueden recibir a:</p>
          <div className="card">
            <div className="flex flex-wrap align-items-center justify-content-center card-container">
              <div className="surface-overlay border-round border-1 p-3 m-3 w-16rem min-h-full">
                $ 700.000
              </div>
              <br />
              <div className="surface-overlay border-round border-1 p-3 m-3 w-16rem min-h-full">
                $ 650.000
              </div>
            </div>
          </div>
        </div>
        <div className="col-1 flex justify-content-center">
          <Button
            icon="pi pi-angle-right"
            className="p-button-rounded p-button-text p-button-danger"
            aria-label="Next"
            onClick={() => nextPage()}
          />
        </div>
      </div>
    </>
  );
}
