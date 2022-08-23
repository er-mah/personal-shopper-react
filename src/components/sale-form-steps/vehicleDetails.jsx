import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { SellCarContext } from "../../contexts";
import {
  MAIN_URLS,
  NEW_SALE_FORM_URLS,
  VEHICLE_DETAILS_OPTIONS,
} from "../../utils/constants";
import FormHeader from "./formHeader";
import FormFooter from "./formFooter";

export function VehicleDetails({ _step, setStep }) {
  let navigate = useNavigate();
  let title = "Datos adicionales";

  const [formData, setFormData, quotationInfo, setQuotationInfo] =
    useContext(SellCarContext);

  const [colourCategory, setColourCategory] = useState(null);
  const [stateCategory, setStateCategory] = useState(null);
  const [urgencyCategory, setUrgencyCategory] = useState(null);

  const [kilometersValue, setKilometersValue] = useState(null);
  const [licensePlate, setLicensePlate] = useState(null);
  const [comments, setComments] = useState(null);
  const [currency, setCurrency] = useState(0);
  const [requiredAmount, setRequiredAmount] = useState(null);

  const isNextPageValid =
    colourCategory &&
    stateCategory &&
    urgencyCategory &&
    kilometersValue &&
    licensePlate &&
    currency &&
    requiredAmount;

  function loadDataFromContext() {
    setColourCategory(quotationInfo.colourCategory);
    setLicensePlate(formData.licensePlate);
    setKilometersValue(formData.kilometers);
    setStateCategory(quotationInfo.stateCategory);
    setComments(formData.comments);
    setCurrency(formData.currency);
    setRequiredAmount(formData.amount);
    setUrgencyCategory(quotationInfo.urgencyCategory);
  }

  // When component is rendered
  useEffect(() => {
    setStep(5); // Set progress bar status

    loadDataFromContext();

    if (formData.brandId == null) {
      navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.MODEL);
    }
  }, []);

  const previousPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.VEHICLE_SPECS);
  };

  const nextPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.QUOTATION);
  };

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

  return (
    <>
      {/* Buttons */}
      <FormHeader
        back={() => previousPage()}
        next={() => nextPage()}
        isNextPageValid={isNextPageValid}
        title={title}
      />
      <div className="mx-5 mt-4">
        <div>
          <div className="p-fluid grid">
            {/* Colour */}
            <div className="field col-6 md:col-3">
              <span className="p-float-label">
                <Dropdown
                  inputId="colour"
                  value={colourCategory}
                  options={VEHICLE_DETAILS_OPTIONS.colourOpts}
                  onChange={($event) => {
                    let value = $event.target.value;
                    let label = $event.originalEvent.target.textContent;

                    setColourCategory(value);
                    setFormData({ ...formData, colour: label });
                    setQuotationInfo({
                      ...quotationInfo,
                      colourCategory: value,
                    });
                  }}
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
                  onChange={($event) => {
                    let value = $event.target.value;
                    setLicensePlate(value);
                    setFormData({ ...formData, licensePlate: value });
                  }}
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
                  onValueChange={($event) => {
                    let value = $event.value;
                    setKilometersValue(value);
                    setFormData({ ...formData, kilometers: value });
                    if (value > 200000) {
                      setQuotationInfo({
                        ...quotationInfo,
                        kmsCategory: "+200k",
                      });
                    } else if (value > 150000 && value < 200000) {
                      setQuotationInfo({
                        ...quotationInfo,
                        kmsCategory: "150k-200k",
                      });
                    } else if (value > 100000 && value < 150000) {
                      setQuotationInfo({
                        ...quotationInfo,
                        kmsCategory: "100k-150k",
                      });
                    } else if (value > 50000 && value < 100000) {
                      setQuotationInfo({
                        ...quotationInfo,
                        kmsCategory: "50k-100k",
                      });
                    } else {
                      setQuotationInfo({
                        ...quotationInfo,
                        kmsCategory: "-50k",
                      });
                    }
                  }}
                />

                <label htmlFor="kms">Kilometraje</label>
              </span>
            </div>

            {/* State */}
            <div className="field col-6 md:col-3 ">
              <span className="p-float-label">
                <Dropdown
                  inputId="state"
                  value={stateCategory}
                  options={VEHICLE_DETAILS_OPTIONS.stateOpts}
                  onChange={($event) => {
                    let value = $event.target.value;
                    let label = $event.originalEvent.target.textContent;

                    setStateCategory(value);
                    setFormData({ ...formData, state: label });
                    setQuotationInfo({
                      ...quotationInfo,
                      stateCategory: value,
                    });
                  }}
                  itemTemplate={stateItemsTemplate}
                  className="w-100"
                  placeholder="Seleccioná el estado del vehículo"
                />
                <label htmlFor="state">Estado del vehículo</label>
              </span>
            </div>

            {/* Aditional comments */}
            <div className="field col-12 md:col-6">
              <span className="p-float-label">
                <InputTextarea
                  autoComplete={"off"}
                  inputId="additionalComments"
                  rows={3}
                  value={comments}
                  onChange={($event) => {
                    const text = $event.target.value;
                    setComments(text);
                    setFormData({ ...formData, comments: text });
                  }}
                  autoResize
                />
                <label htmlFor="additionalComments">
                  Comentarios adicionales
                </label>
              </span>
            </div>
          </div>
          <div className={"p-fluid grid"}>
            <div className="col-12">
              <h3>Con respecto a la venta</h3>
            </div>
            <div className="col-12 sm:col-6">
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
                    onChange={(e) => {
                      setCurrency(e.value);
                      setFormData({ ...formData, currency: e.value });
                    }}
                    placeholder={"Seleccioná la moneda"}
                  />
                  <InputNumber
                    disabled={!currency}
                    prefix={"$ "}
                    suffix={" " + currency}
                    placeholder="Ingresá el monto a recibir"
                    autoComplete={"off"}
                    value={requiredAmount}
                    onChange={($event) => {
                      const value = $event.value;
                      setRequiredAmount(value);
                      setFormData({ ...formData, amount: value });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 sm:col-6">
              {/* Urgency */}
              <div className="field ">
                <label htmlFor="urgency" className="block">
                  ¿En cuánto tiempo lo querés vender?
                </label>
                <Dropdown
                  id="urgency"
                  value={urgencyCategory}
                  options={VEHICLE_DETAILS_OPTIONS.urgencyOpts}
                  onChange={($event) => {
                    let value = $event.target.value;
                    let label = $event.originalEvent.target.textContent;

                    setUrgencyCategory(value);
                    setFormData({ ...formData, urgency: label });
                    setQuotationInfo({
                      ...quotationInfo,
                      urgencyCategory: value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <FormFooter
        className={"pb-7"}
        back={() => previousPage()}
        next={() => nextPage()}
        isNextPageValid={isNextPageValid}
        title={title}
      />
    </>
  );
}
