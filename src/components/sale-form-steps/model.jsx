import { Button } from "primereact/button";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SellCarContext } from "../../contexts";
import {
  MAIN_URLS,
  NEW_SALE_FORM_URLS,
  WHATSAPP_CONTACT_URL,
} from "../../utils/constants/urls";
import { Dropdown } from "primereact/dropdown";
import VehicleService from "../../services/vehicle.service";
import { BRAND_OPTIONS } from "../../utils/constants";
import { ProgressSpinner } from "primereact/progressspinner";

export function Model({ step, setStep }) {
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

  // When component is rendered, get brands
  useEffect(() => {

    if (formData.ownerName == null) {
      navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.OWNER)
    }

    setLoading(true);

    setStep(3); // Set progress bar status
    vehicleService.getBrands().then((res) => {
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
    });

    setTimeout(function () {
      setLoading(false);
    }, 500);
  }, [formData]);

  function selectBrandFromButton(id, name) {
    setSelectedYear(null);
    setSelectedModelId(null);
    setSelectedVersion(null);

    setSelectedBrandId(id);
    setFormData({ ...formData, brandId: id, brandName: name });

    vehicleService.getYears(id).then((res) => {
      setYearsFromApi(res.data.data);
    });
  }

  function selectBrandFromDropdown(e) {
    let value = e.target.value;
    let label = e.originalEvent.target.textContent;

    setSelectedYear(null);
    setSelectedModelId(null);
    setSelectedVersion(null);

    setSelectedBrandId(value);
    setFormData({ ...formData, brandId: value, brandName: label });

    vehicleService.getYears(value).then((res) => {
      setYearsFromApi(res.data.data);
    });
  }

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

  function selectModelFromDropdown(e) {
    let value = e.target.value;
    let label = e.originalEvent.target.textContent;

    setSelectedVersion(null);

    setSelectedModelId(value);
    setFormData({ ...formData, modelId: value, modelName: label });

    vehicleService
      .getVersions(selectedBrandId, selectedYear, value)
      .then((res) => {
        setVersionsFromApi(res.data.data);
      });
  }

  function selectVersionFromDropdown(e) {
    let value = e.target.value;
    let label = e.originalEvent.target.textContent;

    setSelectedVersion(value);
    setFormData({ ...formData, versionId: value, versionName: label });
    setQuotationInfo({ ...quotationInfo, codia: value });
  }

  return (
    <div className={"px-4"}>
      {isLoading ? (
        <>
          <ProgressSpinner className={"center-spinner"} />
        </>
      ) : (
        <>
          {/* NAVIGATION BUTTONS */}
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
              <h2 className={"hidden sm:flex"}>Buscá tu auto</h2>
            </div>
            <div className="flex-1 sm:flex align-items-center justify-content-end hidden">
              <Button
                icon="pi pi-angle-right"
                className="p-button-rounded p-button-sm p-button-danger"
                aria-label="Next"
                disabled={!isNextPageValid}
                onClick={() => nextPage()}
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
              <h3>Buscá tu auto</h3>
            </div>
            <div className="flex-1 flex align-items-center justify-content-end sm:hidden">
              <Button
                icon="pi pi-angle-right"
                className="p-button-rounded p-button-sm p-button-danger"
                aria-label="Next"
                disabled={!isNextPageValid}
                onClick={() => nextPage()}
              />
            </div>
          </div>
          {/**/}
          <div className="p-fluid grid">
            {/* BRANDS BUTTONS */}
            {mainBrands.map((brand) => (
              <div className="col-6 sm:col-4 md:col-3 lg:col-2">
                <Button
                  key={brand.infoAutoId}
                  onClick={() =>
                    selectBrandFromButton(brand.infoAutoId, brand.name)
                  }
                  disabled={selectedBrandId === brand.infoAutoId}
                  className="p-button-raised text-left pl-5 p-button-sm p-button-rounded p-button-secondary"
                  label={brand.name}
                >
                  <img
                    alt={brand.name + " logo"}
                    className="pr-1"
                    src={brand.logo}
                    height="40"
                  ></img>
                </Button>
              </div>
            ))}
          </div>
          <h3 className="mt-4 mb-5">
            Definí la marca, el año, el modelo y la versión de tu auto
          </h3>
          <div className="p-fluid grid mb-7">
            {/* Select brand */}
            <div className="field col-6 md:col-3">
              <span className="p-float-label">
                <Dropdown
                  inputId="brands"
                  key={"brands"}
                  value={selectedBrandId}
                  options={brandsFromApi}
                  onChange={($event) => selectBrandFromDropdown($event)}
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
            <div className="field col-6 md:col-3">
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
            <div className="field col-6 md:col-3">
              <span className="p-float-label">
                <Dropdown
                  key={"model"}
                  inputId="dropdown"
                  value={selectedModelId}
                  options={modelsFromApi}
                  onChange={($event) => selectModelFromDropdown($event)}
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
            <div className="field col-6 md:col-3">
              <span className="p-float-label">
                <Dropdown
                  key={"version"}
                  inputId="dropdown"
                  value={selectedVersion}
                  options={versionsFromApi}
                  onChange={($event) => selectVersionFromDropdown($event)}
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

          <a
            style={{ textDecoration: "none" }}
            href={WHATSAPP_CONTACT_URL}
            target="_blank"
          >
            <Button
              key={"whatsapp"}
              className="p-button-raised p-button-sm p-button-rounded p-button-success center-wsp"
              label={"¿Problemas?"}
              icon={"pi pi-whatsapp"}
            ></Button>
          </a>
        </>
      )}
    </div>
  );
}
