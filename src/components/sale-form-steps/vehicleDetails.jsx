import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { SellCarContext } from "../../contexts";
import {
  VEHICLE_DETAILS_OPTIONS,
  MAIN_URLS,
  NEW_SALE_FORM_URLS,
} from "../../utils/constants";

export function VehicleDetails({ _step, setStep }) {
  let navigate = useNavigate();

  const [formData, setFormData, quotationInfo, setQuotationInfo] =
    useContext(SellCarContext);

  const [colourCategory, setColourCategory] = useState(null);
  const [stateCategory, setStateCategory] = useState(null);
  const [urgencyCategory, setUrgencyCategory] = useState(null);

  const [kilometersValue, setKilometersValue] = useState(null);
  const [licensePlate, setLicensePlate] = useState(null);
  const [comments, setComments] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [requiredAmount, setRequiredAmount] = useState(null);

  const isNextPageValid =
    colourCategory &&
    stateCategory &&
    urgencyCategory &&
    kilometersValue &&
    licensePlate &&
    currency &&
    requiredAmount;

  const previousPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.VEHICLE_SPECS);
  };

  const nextPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.QUOTATION);
  };

  // When component is rendered
  useEffect(() => {
    setStep(5); // Set progress bar status

    if (formData.brandId == null) {
      navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.MODEL)
    }

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

  function setColourFromDropdown(e) {
    let value = e.target.value;
    let label = e.originalEvent.target.textContent;

    setColourCategory(value);
    setFormData({ ...formData, colour: label });
    setQuotationInfo({ ...quotationInfo, colourCategory: value });
  }

  function setKms(value) {
    setKilometersValue(value);
    setFormData({ ...formData, kilometers: value });
    if (value > 200000) {
      setQuotationInfo({ ...quotationInfo, kmsCategory: "+200k" });
    } else if (value > 150000 && value < 200000) {
      setQuotationInfo({ ...quotationInfo, kmsCategory: "150k-200k" });
    } else if (value > 100000 && value < 150000) {
      setQuotationInfo({ ...quotationInfo, kmsCategory: "100k-150k" });
    } else if (value > 50000 && value < 100000) {
      setQuotationInfo({ ...quotationInfo, kmsCategory: "50k-100k" });
    } else {
      setQuotationInfo({ ...quotationInfo, kmsCategory: "-50k" });
    }
  }

  function setLicensePlateFromInput(value) {
    setLicensePlate(value);
    setFormData({ ...formData, licensePlate: value });
  }

  function setStateFromDropdown(e) {
    let value = e.target.value;
    let label = e.originalEvent.target.textContent;

    setStateCategory(value);
    setFormData({ ...formData, state: label });
    setQuotationInfo({ ...quotationInfo, stateCategory: value });
  }

  function setCommentsFromInput(text) {
    setComments(text);
    setFormData({ ...formData, comments: text });
  }

  function setRequiredAmountFromInput(e) {
    const amount = e.originalEvent.target.value;
    const value = e.value;

    setRequiredAmount(value);
    setFormData({ ...formData, amount: amount });
  }

  function setUrgencyFromDropdown(e) {
    let value = e.target.value;
    let label = e.originalEvent.target.textContent;

    setUrgencyCategory(value);
    setFormData({ ...formData, urgency: label });
    setQuotationInfo({ ...quotationInfo, urgencyCategory: value });
  }

  return (
    <div className="px-5">
      <div className="flex my-3">
        <div className="flex-1 sm:flex align-items-center justify-content-start hidden">
          <Button
            icon="pi pi-angle-left"
            className="p-button-rounded p-button-sm p-button-danger "
            aria-label="Back"
            onClick={() => previousPage()}
            label={"Atrás"}
          />
        </div>

        <div className="flex-1 sm:flex align-items-center justify-content-center hidden">
          <h2>Datos adicionales de tu auto</h2>
        </div>
        <div className="flex-1 sm:flex align-items-center justify-content-end hidden">
          <Button
            icon="pi pi-angle-right"
            className="p-button-rounded p-button-sm p-button-danger"
            aria-label="Next"
            onClick={() => nextPage()}
            disabled={!isNextPageValid}
            label={"Siguiente"}
          />
        </div>
        <div className="flex-1 flex align-items-center justify-content-start sm:hidden">
          <Button
            icon="pi pi-angle-left"
            className="p-button-rounded p-button-sm p-button-danger"
            aria-label="Back"
            onClick={() => previousPage()}
          />
        </div>
        <div className="flex-1 flex align-items-center justify-content-center sm:hidden">
          <h3>Datos extra</h3>
        </div>
        <div className="flex-1 flex align-items-center justify-content-end sm:hidden">
          <Button
            icon="pi pi-angle-right"
            className="p-button-rounded p-button-sm p-button-danger"
            aria-label="Next"
            onClick={() => nextPage()}
            disabled={!isNextPageValid}
          />
        </div>
      </div>
      <div>
        <div className="p-fluid grid">
          {/* Colour */}
          <div className="field col-6 md:col-3">
            <span className="p-float-label">
              <Dropdown
                inputId="colour"
                value={colourCategory}
                options={VEHICLE_DETAILS_OPTIONS.colourOpts}
                onChange={($event) => setColourFromDropdown($event)}
                itemTemplate={coloursItemsTemplate}
                className="w-100"
                placeholder="Seleccioná el color"
              />
              <label htmlFor="colour">Color</label>
            </span>
          </div>

          {/* License plate */}
          <div className="field col-6 md:col-3">
            <span className="p-float-label">
              <InputText
                autoComplete={"off"}
                id="licensePlate"
                value={licensePlate}
                onChange={($event) =>
                  setLicensePlateFromInput($event.target.value)
                }
              />
              <label htmlFor="licensePlate">Patente</label>
            </span>
          </div>

          {/* Kilometers */}
          <div className="field col-6 md:col-3">
            <span className="p-float-label">
              <InputNumber
                inputId="kms"
                autoComplete={"off"}
                value={kilometersValue}
                suffix=" km"
                onValueChange={($event) => setKms($event.value)}
              />

              <label htmlFor="kms">Kilometraje</label>
            </span>
          </div>

          <div className="field col-6 md:col-3 ">
            {/* State */}
            <span className="p-float-label">
              <Dropdown
                inputId="state"
                value={stateCategory}
                options={VEHICLE_DETAILS_OPTIONS.stateOpts}
                onChange={($event) => setStateFromDropdown($event)}
                itemTemplate={stateItemsTemplate}
                className="w-100"
                placeholder="Seleccioná el estado del vehículo"
              />
              <label htmlFor="state">Estado del vehículo</label>
            </span>
          </div>

          <div className="field col-12 md:col-6">
            {/* Aditional comments */}
            <span className="p-float-label">
              <InputTextarea
                autoComplete={"off"}
                inputId="additionalComments"
                rows={3}
                value={comments}
                onChange={($event) => setCommentsFromInput($event.target.value)}
                autoResize
              />
              <label htmlFor="additionalComments">
                Comentarios adicionales
              </label>
            </span>
          </div>
        </div>
        <div className="p-fluid grid"></div>
        <h3>Con respecto a la venta</h3>
        <div className={"p-fluid grid"}>
          <div className="col-6">
            {/* To-receive amount */}
            <div className="field">
              <label htmlFor="amount" className="block">
                ¿Cuánto querés recibir?
              </label>
              <div className="p-inputgroup">
                <Dropdown
                  id="amount"
                  value={currency}
                  options={VEHICLE_DETAILS_OPTIONS.currencyOpts}
                  onChange={(e) => setCurrency(e.value)}
                  placeholder={"Seleccioná la moneda"}
                />
                <InputNumber
                  disabled={!currency}
                  prefix={"$ "}
                  suffix={" " + currency}
                  placeholder="Ingresá el monto a recibir"
                  autoComplete={"off"}
                  value={requiredAmount}
                  onChange={($event) => setRequiredAmountFromInput($event)}
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            {/* Urgency */}
            <div className="field ">
              <label htmlFor="urgency" className="block">
                ¿En cuánto tiempo lo querés vender?
              </label>
              <Dropdown
                id="urgency"
                value={urgencyCategory}
                options={VEHICLE_DETAILS_OPTIONS.urgencyOpts}
                onChange={($event) => setUrgencyFromDropdown($event)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
