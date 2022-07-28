import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MAIN_URLS, NEW_SALE_FORM_URLS } from "../../utils/constants";
import { Button } from "primereact/button";
import { useEffect } from "react";
import { InputNumber } from "primereact/inputnumber";

export function SaleRequirements({ step, setStep }) {
  const [currency, setCurrency] = useState(null);
  const [requiredAmount, setRequiredAmount] = useState(null);
  const [urgency, setUrgency] = useState(null);

  let navigate = useNavigate();

  const previousPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.VEHICLE_COLOUR);
  };

  const nextPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.QUOTATION);
  };

  const currencyOpts = [
    { value: "ARS", label: "Pesos argentinos" },
    { value: "USD", label: "Dólares estadounidenses" },
  ];

  const urgencyOpts = [
    { label: "En menos de 1 semana", value: "< 1 sem" },
    { label: "En 2 semanas", value: "2 sem" },
    { label: "En 3 semanas", value: "3 sem" },
    { label: "No tengo apuro", value: "No es urgente" },
  ];

  // When component is rendered
  useEffect(() => {
    setStep(5); // Set progress bar status
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
          <h2>¿Cuánto esperás recibir?</h2>
          {JSON.stringify({ currency, requiredAmount, urgency })}
          <div className="p-fluid grid mt-5">
            {/* Required amount */}
            <div className="field col-12 md:col-6">
              <div className="p-inputgroup">
                <Dropdown
                  value={currency}
                  options={currencyOpts}
                  onChange={(e) => setCurrency(e.value)}
                />
                <InputNumber
                  disabled={!currency}
                  prefix={"$ "}
                  suffix={" " + currency}
                  placeholder="Ingresá el monto a recibir"
                  value={requiredAmount}
                  onChange={($event) => setRequiredAmount($event.value)}
                />
              </div>
            </div>
          </div>
          <h2>¿En cuánto tiempo lo querés vender?</h2>

          <div className="field col-12 md:col-6">
            <div className="p-inputgroup">
              <Dropdown
                  value={urgency}
                  options={urgencyOpts}
                  onChange={(e) => setUrgency(e.value)}
              />
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
