import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

import { MAIN_URLS, NEW_SALE_FORM_URLS } from "../../utils/constants";
import roundedIcon from "../../utils/assets/icons";
import { InputNumber } from "primereact/inputnumber";
import { InputMask } from "primereact/inputmask";

export function VehicleColour({ step, setStep }) {
  const [selectedColour, setSelectedColour] = useState(null);
  const [madeKilometers, setMadeKilometers] = useState(null);
  const [licencePlateType, setLicencePlateType] = useState(null);
  const [licensePlate, setLicensePlate] = useState(null);

  const [vehicleState, setVehicleState] = useState(null);
  const [comments, setComments] = useState(null);

  const colourOpts = [
    { label: "BLANCO", value: "BLANCO", hex: "#FFFFFF" },
    { label: "GRIS OSCURO", value: "GRIS OSCURO", hex: "#5D5C62" },
    { label: "GRIS CLARO", value: "GRIS CLARO", hex: "#5D5C62" },
    { label: "ROJO", value: "ROJO", hex: "#D91430" },
    { label: "NEGRO", value: "NEGRO", hex: "#000000" },
    { label: "PLATEADO", value: "PLATEADO", hex: "#BFC7CA" },
    { label: "AZUL", value: "AZUL", hex: "#1860A8" },
    { label: "BORDÓ", value: "BORDÓ", hex: "#BE182C" },
    { label: "VERDE", value: "VERDE", hex: "#22AA86" },
    { label: "BEIGE", value: "BEIGE", hex: "#CDB390" },
    { label: "OTRO", value: "OTRO", hex: null },
  ];

  const licensePlateOpts = [
    { label: "Modelo de 1995 (AAA 000)", value: 1 },
    { label: "Modelo de 2016 (AA 000 AA)", value: 2 },
  ];

  const stateOpts = [
    { emoji: "💀", label: "Con muchos detalles", value: "Con muchos detalles" },
    { emoji: "😕", label: "Con pocos detalles", value: "Con pocos detalles" },
    { emoji: "👍", label: "Aceptable", value: "Aceptable" },
    { emoji: "😉", label: "Bueno", value: "Bueno" },
    { emoji: "🤩", label: "Excelente", value: "Excelente" },
  ];

  let navigate = useNavigate();

  const previousPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.SIGN_IN);
  };

  const nextPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.SALE);
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
        <div className="p-2">
          {option.emoji} {option.label}
        </div>
      </div>
    );
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
          <h2>Color, kilometraje y patente</h2>
          {JSON.stringify({ selectedColour, licensePlate, madeKilometers, vehicleState, comments })}
          <div className="p-fluid grid mt-5">
            {/* Colour */}
            <div className="field col-12 md:col-3">
              <span className="p-float-label">
                <Dropdown
                  inputId="colour"
                  value={selectedColour}
                  options={colourOpts}
                  onChange={($event) => setSelectedColour($event.value)}
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
                  value={madeKilometers}
                  suffix=" km"
                  onValueChange={(e) => setMadeKilometers(e.value)}
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

          <h2>Estado y comentarios adicionales</h2>
          <div className="p-fluid grid mt-5">
            {/* State */}
            <div className="field col-12 md:col-4">
              <span className="p-float-label">
                <Dropdown
                  inputId="vehicleState"
                  value={vehicleState}
                  options={stateOpts}
                  onChange={($event) => setVehicleState($event.value)}
                  itemTemplate={stateItemsTemplate}
                  className="w-100"
                  placeholder="Seleccioná el estado del vehículo"
                />
                <label htmlFor="vehicleState">Estado del vehículo</label>
              </span>
            </div>
            {/* Aditional comments */}
            <div className="field col-12 md:col-8">
              <span className="p-float-label">
                <InputTextarea
                  inputId="additionalComments"
                  rows={3}
                  value={comments}
                  onChange={($event) => setComments($event.target.value)}
                  autoResize
                />
                <label htmlFor="additionalComments">Comentarios adicionales</label>
              </span>
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
