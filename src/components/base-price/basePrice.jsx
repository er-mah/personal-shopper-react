import { Button } from "primereact/button";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Dropdown } from "primereact/dropdown";
import VehicleService from "../../services/vehicle.service";
import {
  BRAND_OPTIONS,
  MAIN_URLS,
  NEW_SALE_FORM_URLS,
  VEHICLE_DETAILS_OPTIONS,
} from "../../utils/constants";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { FetchInfoAutoPrices } from "./fetchOnlyPrices";

export const BasePrice = () => {
  let vehicleService = new VehicleService();

  // Store infoAuto ids in main brands
  const [mainBrands, setMainBrands] = useState(BRAND_OPTIONS.mainBrands);

  // Persist data from api
  const [brandsFromApi, setBrandsFromApi] = useState(null);
  const [yearsFromApi, setYearsFromApi] = useState([]);
  const [modelsFromApi, setModelsFromApi] = useState([]);
  const [versionsFromApi, setVersionsFromApi] = useState([]);

  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedModelId, setSelectedModelId] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [colourCategory, setColourCategory] = useState(null);
  const [stateCategory, setStateCategory] = useState(null);
  const [urgencyCategory, setUrgencyCategory] = useState(null);

  const [kilometersValue, setKilometersValue] = useState(null);
  const [licensePlate, setLicensePlate] = useState("-");

  const [quotationInfo, setQuotationInfo] = useState(null);
  const [quotationLoading, setQuotationLoading] = useState(false);

  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);
  const [otherPrices, setOtherPrices] = useState(null);
  const [baseValue, setBaseValue] = useState(null);

  const onQuotationClick = async () => {
    setQuotationLoading(true);

    const payload = {
      colour: quotationInfo.colourCategory,
      kilometers: quotationInfo.kmsCategory,
      sellingTime: quotationInfo.urgencyCategory,
      state: quotationInfo.stateCategory,
      versionId: quotationInfo.codia,
      year: quotationInfo.year,
    };

    const result = await vehicleService.getQuotation(payload);

    setMinValue(result.data.data.minValue);
    setMaxValue(result.data.data.maxValue);
    setOtherPrices(result.data.data.agenciesPrices);
    setBaseValue((result.data.data.minValue + result.data.data.maxValue) / 2);

    setQuotationLoading(false);
  };

  // When component is rendered, get brands
  useEffect(() => {
    const getBrands = async () => {
      try {
        const response = await vehicleService.getBrands();
        const brands = response.data.data;

        setBrandsFromApi(brands);

        mainBrands.map((brand) => {
          return brands.filter(({ name: nameA, id: id }) => {
            if (nameA === brand.name.toUpperCase()) {
              brand.infoAutoId = id;
            }
          });
        });

        setMainBrands(mainBrands);
      } catch (error) {
        console.error(error);
      }
    };
    if (!brandsFromApi) {
      getBrands();
    }
  });

  function selectYear(year) {
    setSelectedModelId(null);
    setSelectedVersion(null);

    setSelectedYear(year);

    setQuotationInfo({
      ...quotationInfo,
      year: year,
    });

    vehicleService.getModels(selectedBrandId, year).then((res) => {
      setModelsFromApi(res.data.data);
    });
  }

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
    <div>
      <>
        <div className="p-fluid grid mx-3">
          <h2>Precio base de InfoAuto</h2>
        </div>
        <div className="p-fluid grid mx-3">
          <div className={"field col-12 mb-3 text-left"}>
            <span className={""}>
              <strong>
                Definí la marca, el año, el modelo y la versión de tu auto
              </strong>
            </span>
          </div>
        </div>

        <div className="p-fluid grid mx-3 mt-2">
          {/* Select brand */}
          <div className="field col-12 sm:col-6 md:col-3 ">
            <span className="p-float-label">
              <Dropdown
                inputId="brands"
                key={"brands"}
                value={selectedBrandId}
                options={brandsFromApi}
                onChange={($event) => {
                  let value = $event.target.value;

                  setSelectedYear(null);
                  setSelectedModelId(null);
                  setSelectedVersion(null);

                  setSelectedBrandId(value);

                  vehicleService.getYears(value).then((res) => {
                    setYearsFromApi(res.data.data);
                  });
                }}
                optionValue="id"
                optionLabel="name"
                className="w-100 "
                placeholder="Seleccioná una marca"
                filter
                filterBy="name"
              />
              <label htmlFor="brands">Todas las marcas</label>
            </span>
          </div>
          {/* Select year */}
          <div className="field col-12 sm:col-6 md:col-3">
            <span className="p-float-label">
              <Dropdown
                key={"year"}
                inputId="year"
                value={selectedYear}
                options={yearsFromApi}
                onChange={($event) => selectYear($event.value)}
                optionValue="id"
                optionLabel="anio"
                className="w-100"
                filter
                filterBy="anio"
                disabled={selectedBrandId == null}
                placeholder="Seleccioná el año"
              />
              <label htmlFor="year">Año</label>
            </span>
          </div>
          {/* Select model */}
          <div className="field col-12 sm:col-6 md:col-3">
            <span className="p-float-label">
              <Dropdown
                key={"model"}
                inputId="dropdown"
                value={selectedModelId}
                options={modelsFromApi}
                onChange={($event) => {
                  let value = $event.target.value;

                  setSelectedVersion(null);

                  setSelectedModelId(value);

                  vehicleService
                    .getVersions(selectedBrandId, selectedYear, value)
                    .then((res) => {
                      setVersionsFromApi(res.data.data);
                    });
                }}
                optionValue="id"
                optionLabel="name"
                className="w-100"
                filter
                filterBy="name"
                disabled={selectedYear == null}
                placeholder="Seleccioná el modelo"
              />
              <label htmlFor="dropdown">Modelo</label>
            </span>
          </div>
          {/* Select version */}
          <div className="field col-12 sm:col-6 md:col-3">
            <span className="p-float-label">
              <Dropdown
                key={"version"}
                inputId="dropdown"
                value={selectedVersion}
                options={versionsFromApi}
                onChange={($event) => {
                  let value = $event.target.value;
                  setSelectedVersion(value);

                  setQuotationInfo({
                    ...quotationInfo,
                    codia: value,
                  });
                }}
                optionValue="id"
                optionLabel="name"
                className="w-100"
                disabled={selectedModelId == null}
                placeholder="Seleccioná la versión"
                filter
                filterBy="name"
              />
              <label htmlFor="dropdown">Versión</label>
            </span>
          </div>
        </div>

        {selectedVersion ? (
          <FetchInfoAutoPrices codia={selectedVersion} />
        ) : (
          <></>
        )}





        <div className="p-fluid grid mt-8 mx-3">
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
                disabled={true}
                value={licensePlate}
                onChange={($event) => {
                  let value = $event.target.value;
                  setLicensePlate(value);
                }}
              />
              <label htmlFor="licensePlate"></label>
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

          <div className="field col-12 md:col-3">
            <h4>Con respecto a la venta</h4>
          </div>

          {/* Urgency */}
          <div className="field col-8 md:col-5">
            <span className="p-float-label">
              <Dropdown
                inputId="urgency"
                value={urgencyCategory}
                options={VEHICLE_DETAILS_OPTIONS.urgencyOpts}
                onChange={($event) => {
                  let value = $event.target.value;

                  setUrgencyCategory(value);
                  setQuotationInfo({
                    ...quotationInfo,
                    urgencyCategory: value,
                  });
                }}
              />

              <label htmlFor="urgency">
                ¿En cuánto tiempo lo querés vender?
              </label>
            </span>
          </div>

          <div className="field col-4 md:col-4">
            <Button label="Cotizar" onClick={onQuotationClick} />
          </div>

          {quotationLoading ? <>Cargando...</> : <></>}

          {!baseValue ? (
            <></>
          ) : (
            <>
              <div className="field col-12 md:col-3">
                <p className={"sm:text-lg text-center"}>
                  Si concretás la venta con{" "}
                  <span className={"text-teal-500"}>
                    <strong>TechMo</strong>
                  </span>
                  , te podemos ofrecer el siguiente{" "}
                  <strong>rango de precios</strong>:
                </p>
                <p className={"sm:text-lg text-center"}>
                  Precio base: {baseValue}
                </p>
              </div>

              <div className="field col-12 md:col-3">
                <div
                  className={"flex align-items-center justify-content-center"}
                >
                  <span
                    className={
                      "border-round bg-teal-200 text-xl sm:text-lg py-3 px-6 mx-3 text-center"
                    }
                  >
                    <strong>
                      $ {minValue} - $ {maxValue}
                    </strong>
                  </span>
                </div>
              </div>

              <div className="field col-12 md:col-6">
                <div className="flex mx-3 align-items-center justify-content-center">
                  <div className="surface-300 border-round-3xl px-4 align-items-center justify-content-center ">
                    <p className={"sm:text-base mb-0"}>
                      En las concesionarias por tu vehículo te pueden ofrecer:
                    </p>
                    <div className="md:flex justify-content-center">
                      {otherPrices !== null ? (
                        otherPrices.map((price, i) => {
                          return (
                            <>
                              <h3
                                key={i}
                                className={
                                  " mx-2 p-3 border-round bg-gray-700 text-800 text-white text-center"
                                }
                              >
                                {"$" + price}
                              </h3>
                            </>
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </>
    </div>
  );
};
