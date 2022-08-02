import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

import { MAIN_URLS, NEW_SALE_FORM_URLS } from "../../utils/constants";
import { InputNumber } from "primereact/inputnumber";
import { InputMask } from "primereact/inputmask";
import { SellCarContext } from "../../contexts";

export function VehicleDetails({ step, setStep }) {
  const [formData, setFormData, quotationInfo, setQuotationInfo] =
    useContext(SellCarContext);

  const [colourCategory, setColourCategory] = useState(null);
  const [stateCategory, setStateCategory] = useState(null);
  const [urgencyCategory, setUrgencyCategory] = useState(null);
  const [kilometersCategory, setKilometersCategory] = useState(null);

  const [kilometersValue, setKilometersValue] = useState(null);
  const [licencePlateType, setLicencePlateType] = useState(null);
  const [licensePlate, setLicensePlate] = useState(null);
  const [comments, setComments] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [requiredAmount, setRequiredAmount] = useState(null);

  // TODO: CHANGE THIS
  const colourOpts = [
    { label: "BLANCO", value: "MOST_COMMON", hex: "#FFFFFF" },
    { label: "GRIS", value: "COMMON", hex: "#8C8C8C" },
    { label: "PLATA", value: "COMMON", hex: "#C6C6C6" },
    { label: "NEGRO", value: "COMMON", hex: "#000000" },
    { label: "ROJO", value: "COMMON", hex: "#D91430" },
    { label: "AZUL", value: "RARE", hex: "#1860A8" },
    { label: "MARRON", value: "RARE", hex: "#AB805E" },
    { label: "BEIGE", value: "RARE", hex: "#E6C8A4" },
    { label: "OTRO", value: "EXOTIC", hex: null },
  ];

  const licensePlateOpts = [
    { label: "Modelo de 1995 (AAA 000)", value: 1 },
    { label: "Modelo de 2016 (AA 000 AA)", value: 2 },
  ];

  const stateOpts = [
    { label: "💀  Con muchos detalles", value: "MANY_DETAILS" },
    { label: "😕  Con pocos detalles", value: "FEW_DETAILS" },
    { label: "👍  Aceptable", value: "GOOD" },
    { label: "😉  Bueno", value: "VERY_GOOD" },
    { label: "🤩  Excelente", value: "EXCELLENT" },
  ];

  const currencyOpts = [
    { value: "ARS", label: "Pesos argentinos" },
    { value: "USD", label: "Dólares estadounidenses" },
  ];

  const urgencyOpts = [
    { label: "En menos de 1 semana", value: "ONE_WEEK" },
    { label: "En 2 semanas", value: "TWO_WEEKS" },
    { label: "En 3 semanas", value: "THREE_WEEKS" },
    { label: "En 4 semanas", value: "FOUR_WEEKS" },
    { label: "No tengo apuro", value: "NO_HURRY" },
  ];

  let navigate = useNavigate();

  const previousPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.VEHICLE_SPECS);
  };

  const nextPage = () => {
    setQuotationInfo({
      ...quotationInfo,
      colorCategory: colourCategory,
      stateCategory: stateCategory,
      urgency: urgencyCategory,
      kmsCategory: kilometersCategory,
    });

    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.QUOTATION);
  };

  // When component is rendered
  useEffect(() => {
    setStep(4); // Set progress bar status
  }, []);

  const coloursItemsTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <svg
          className={`flag`}
          width="20"
          height="20"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="25"
            cy="25"
            r="25"
            stroke="black"
            strokeWidth="1"
            fill={option.hex}
          />
        </svg>
        <div className="p-2">{option.label}</div>
      </div>
    );
  };

  const stateItemsTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <span>{option.emoji}</span>
        <div className="ml-3">{option.label}</div>
      </div>
    );
  };

  const setKms = (value) => {
    setKilometersValue(value);
    if (value > 150000) {
      setKilometersCategory("INTENSIVE_USE");
    } else if (value < 100000) {
      setKilometersCategory("MINIMUM_USE");
    } else {
      setKilometersCategory("AVERAGE_USE");
    }
  };

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
          {JSON.stringify({
            colourCategory,
            kilometersCat: kilometersCategory,
            stateCategory,
            urgencyCategory,
          })}
          <h2 className={"mb-5"}>Datos adicionales de tu vehículo</h2>
          <div className="p-fluid grid">
            {/* Colour */}
            <div className="col-12 md:col-3">
              <span className="p-float-label">
                <Dropdown
                  inputId="colour"
                  value={colourCategory}
                  options={colourOpts}
                  onChange={($event) => setColourCategory($event.value)}
                  itemTemplate={coloursItemsTemplate}
                  className="w-100"
                  placeholder="Seleccioná el color"
                />
                <label htmlFor="colour">Color</label>
              </span>
            </div>

            {/* Kilometers */}
            <div className="field col-12 md:col-2">
              <span className="p-float-label">
                <InputNumber
                  inputId="kms"
                  value={kilometersValue}
                  suffix=" km"
                  onValueChange={($event) => setKms($event.value)}
                />

                <label htmlFor="kms">Kilometraje</label>
              </span>
            </div>

            {/* License plate type */}
            <div className="field col-12 md:col-4">
              <span className="p-float-label">
                <Dropdown
                  inputId="licencePlateType"
                  value={licencePlateType}
                  options={licensePlateOpts}
                  onChange={($event) => setLicencePlateType($event.value)}
                  placeholder="Seleccioná el tipo de tu patente"
                />
                <label htmlFor="licencePlateType">Tipo de patente</label>
              </span>
            </div>

            {/* License plate */}
            <div className="field col-12 md:col-3">
              <span className="p-float-label">
                {licencePlateType ? (
                  <>
                    {licencePlateType === 1 ? (
                      <>
                        <InputMask
                          mask="aaa-999"
                          id="licensePlate"
                          value={licensePlate}
                          onChange={(e) => setLicensePlate(e.value)}
                        ></InputMask>
                      </>
                    ) : (
                      <></>
                    )}
                    {licencePlateType === 2 ? (
                      <>
                        <InputMask
                          mask="aa-999-aa"
                          id="licensePlate"
                          value={licensePlate}
                          onChange={(e) => setLicensePlate(e.value)}
                        ></InputMask>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <>
                    <InputText
                      disabled={true}
                      id="licensePlate"
                      onChange={(e) => setLicensePlate(e.target.value)}
                    />
                  </>
                )}
                <label htmlFor="licensePlate">Patente</label>
              </span>
            </div>
          </div>
          <div className="p-fluid grid">
            <div className="col-3">
              <span className="p-float-label">
                <Dropdown
                  inputId="vehicleState"
                  value={stateCategory}
                  options={stateOpts}
                  onChange={($event) => setStateCategory($event.value)}
                  itemTemplate={stateItemsTemplate}
                  className="w-100"
                  placeholder="Seleccioná el estado del vehículo"
                />
                <label htmlFor="vehicleState">Estado del vehículo</label>
              </span>
            </div>
            <div className="col-9">
              {/* Aditional comments */}
              <span className="p-float-label">
                <InputTextarea
                  inputId="additionalComments"
                  rows={3}
                  value={comments}
                  onChange={($event) => setComments($event.target.value)}
                  autoResize
                />
                <label htmlFor="additionalComments">
                  Comentarios adicionales
                </label>
              </span>
            </div>
          </div>
          <h3>Con respecto a la venta</h3>
          <div className={"p-fluid grid"}>
            <div className="col-6">
              <div className="field">
                <label htmlFor="amount" className="block">
                  ¿Cuánto querés recibir?
                </label>
                <div className="p-inputgroup">
                  <Dropdown
                    id="amount"
                    value={currency}
                    options={currencyOpts}
                    onChange={(e) => setCurrency(e.value)}
                    placeholder={"Seleccioná la moneda"}
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
            <div className="col-6">
              <div className="field ">
                <label htmlFor="urgency" className="block">
                  ¿En cuánto tiempo lo querés vender?
                </label>
                <Dropdown
                  id="urgency"
                  value={urgencyCategory}
                  options={urgencyOpts}
                  onChange={(e) => setUrgencyCategory(e.value)}
                />
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
