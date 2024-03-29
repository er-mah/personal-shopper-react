import { Button } from "primereact/button";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SellCarContext } from "../../contexts";
import {
  CALL_TO_ACTION_URLS,
  MAIN_URLS,
  NEW_SALE_FORM_URLS,
  WHATSAPP_CONTACT_URL,
} from "../../utils/constants/urls";
import { Dropdown } from "primereact/dropdown";
import VehicleService from "../../services/vehicle.service";
import { BRAND_OPTIONS } from "../../utils/constants";
import { ProgressSpinner } from "primereact/progressspinner";
import FormHeader from "./formHeader";
import FormFooter from "./formFooter";

export function Model({ _step, setStep }) {
  let title = "Buscá tu auto";

  let navigate = useNavigate();
  let vehicleService = new VehicleService();

  // Get information from context
  const [formData, setFormData, quotationInfo, setQuotationInfo] =
    useContext(SellCarContext);

  // Store infoAuto ids in main brands
  const [mainBrands, setMainBrands] = useState(BRAND_OPTIONS.mainBrands);

  // Persist data from api
  const [brandsFromApi, setBrandsFromApi] = useState([]);
  const [yearsFromApi, setYearsFromApi] = useState([]);
  const [modelsFromApi, setModelsFromApi] = useState([]);
  const [versionsFromApi, setVersionsFromApi] = useState([]);

  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedModelId, setSelectedModelId] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState(null);

  const [isLoading, setLoading] = useState(true);

  const isNextPageValid =
    selectedBrandId && selectedYear && selectedModelId && selectedVersion;

  const previousPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.OWNER);
  };

  const nextPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.VEHICLE_SPECS);
  };

  function loadDataFromContext() {
    if (formData.brandId) {
      setSelectedBrandId(formData.brandId);
      vehicleService
        .getYears(formData.brandId)
        .then((res) => {
          setYearsFromApi(res.data.data);
        })
        .finally(() => {
          setSelectedYear(formData.year);
          vehicleService
            .getModels(formData.brandId, formData.year)
            .then((res) => {
              setModelsFromApi(res.data.data);
            })
            .finally(() => {
              setSelectedModelId(formData.modelId);
              vehicleService
                .getVersions(formData.brandId, formData.year, formData.modelId)
                .then((res) => {
                  setVersionsFromApi(res.data.data);
                  setSelectedVersion(formData.versionId);
                });
            });
        });
    }
  }

  // When component is rendered, get brands
  useEffect(() => {
    if (formData.ownerName == null) {
      navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.OWNER);
    }

    setStep(3); // Set progress bar status

    loadDataFromContext();

    vehicleService
      .getBrands()
      .then((res) => {
        setLoading(true);

        const brands = res.data.data;
        setBrandsFromApi(brands);

        // Store ids from api
        mainBrands.map((brand) => {
          brands.filter(({ name: nameA, id: id }) => {
            if (nameA === brand.name.toUpperCase()) {
              brand.infoAutoId = id;
            }
          });
        });
        setMainBrands(mainBrands);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [formData]);

  function selectYear(year) {
    setSelectedModelId(null);
    setSelectedVersion(null);

    setSelectedYear(year);
    setFormData({ ...formData, year: year });
    setQuotationInfo({ ...quotationInfo, year: year });

    vehicleService.getModels(selectedBrandId, year).then((res) => {
      setModelsFromApi(res.data.data);
    });
  }

  return (
    <div>
      {isLoading ? (
        <>
          <ProgressSpinner className={"center-spinner"} />
        </>
      ) : (
        <>
          {/* Buttons */}
          <FormHeader
            back={() => previousPage()}
            next={() => nextPage()}
            isNextPageValid={isNextPageValid}
            title={title}
          />
          {/**/}
          <div className="p-fluid grid mx-3">
            {/* BRANDS BUTTONS */}
            {mainBrands.map((brand) => (
              <>
                <div className={"col-1 sm:hidden"}></div>
                <div className="col-10 sm:col-4 md:col-3 lg:col-2 px-2">
                  <Button
                    key={brand.infoAutoId}
                    onClick={() => {
                      setSelectedYear(null);
                      setSelectedModelId(null);
                      setSelectedVersion(null);

                      setSelectedBrandId(brand.infoAutoId);
                      setFormData({
                        ...formData,
                        brandId: brand.infoAutoId,
                        brandName: brand.name,
                      });

                      setLoading(true);
                      vehicleService
                        .getYears(brand.infoAutoId)
                        .then((res) => {
                          setYearsFromApi(res.data.data);
                        })
                        .finally(() => {
                          setLoading(false);
                        });
                    }}
                    disabled={selectedBrandId === brand.infoAutoId}
                    className="p-button-raised text-left p-button-sm p-button-rounded p-button-secondary"
                    label={brand.name}
                  >
                    <img
                      key={brand.name}
                      alt={brand.name + " logo"}
                      src={brand.logo}
                      height="50"
                    ></img>
                  </Button>
                </div>
                <div className={"col-1 sm:hidden"}></div>
              </>
            ))}
          </div>
          <div className="p-fluid grid mx-3 mt-4">
            <div className={"field col-12 mb-3 text-center"}>
              <span className={""}>
                <strong>
                  Definí la marca, el año, el modelo y la versión de tu auto
                </strong>
              </span>
            </div>
          </div>

          <div className="p-fluid grid mx-3 mt-2">
            {/* Select brand */}
            <div className="field col-12 sm:col-6 md:col-3">
              <span className="p-float-label">
                <Dropdown
                  inputId="brands"
                  key={"brands"}
                  value={selectedBrandId}
                  options={brandsFromApi}
                  onChange={($event) => {
                    let value = $event.target.value;
                    let label = $event.originalEvent.target.textContent;

                    setSelectedYear(null);
                    setSelectedModelId(null);
                    setSelectedVersion(null);

                    setSelectedBrandId(value);
                    setFormData({
                      ...formData,
                      brandId: value,
                      brandName: label,
                    });

                    vehicleService.getYears(value).then((res) => {
                      setYearsFromApi(res.data.data);
                    });
                  }}
                  optionValue="id"
                  optionLabel="name"
                  className="w-100"
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
                    let label = $event.originalEvent.target.textContent;

                    setSelectedVersion(null);

                    setSelectedModelId(value);
                    setFormData({
                      ...formData,
                      modelId: value,
                      modelName: label,
                    });

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
                    let label = $event.originalEvent.target.textContent;

                    setSelectedVersion(value);
                    setFormData({
                      ...formData,
                      versionId: value,
                      versionName: label,
                    });
                    setQuotationInfo({ ...quotationInfo, codia: value });
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
          <FormFooter
            back={() => previousPage()}
            next={() => nextPage()}
            isNextPageValid={isNextPageValid}
            title={title}
          />
          <div className="flex m-3">
            <div className="flex-1 flex align-items-center justify-content-center">
              <a
                style={{ textDecoration: "none" }}
                href={CALL_TO_ACTION_URLS.WHATSAPP_CONTACT_URL}
                target="_blank"
              >
                <Button
                  key={"whatsapp"}
                  className="p-button-raised p-button-sm p-button-rounded p-button-success"
                  label={"¿No pudiste encontrar tu auto? Escribinos."}
                  icon={"pi pi-whatsapp"}
                ></Button>
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
