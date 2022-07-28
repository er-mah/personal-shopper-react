import { Button } from "primereact/button";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as MahService from "../../services/mah.service";

import { SellCarContext } from "../../contexts";
import { MAIN_URLS, NEW_SALE_FORM_URLS } from "../../utils/constants";
import { BRAND_LOGOS } from "../../utils/assets/brands";
import { Dropdown } from "primereact/dropdown";

export function Brand({ step, setStep }) {
  let navigate = useNavigate();

  // Get information from context
  const [formData, setFormData] = useContext(SellCarContext);

  // Store infoAuto ids in main brands
  const [mainBrands, setMainBrands] = useState([
    {
      name: "Fiat",
      logo: BRAND_LOGOS.FIAT,
      infoAutoId: null,
    },
    { name: "Ford", logo: BRAND_LOGOS.FORD, infoAutoId: null },
    {
      name: "Renault",
      logo: BRAND_LOGOS.RENAULT,
      infoAutoId: null,
    },
    { name: "Chevrolet", logo: BRAND_LOGOS.CHEVROLET, infoAutoId: null },
    {
      name: "Nissan",
      logo: BRAND_LOGOS.NISSAN,
      infoAutoId: null,
    },
    { name: "Volkswagen", logo: BRAND_LOGOS.VOLKSWAGEN, infoAutoId: null },
    {
      name: "Citroen",
      logo: BRAND_LOGOS.CITROEN,
      infoAutoId: null,
    },
    { name: "Peugeot", logo: BRAND_LOGOS.PEUGEOT, infoAutoId: null },
    {
      name: "Toyota",
      logo: BRAND_LOGOS.TOYOTA,
      infoAutoId: null,
    },
    { name: "Hyundai", logo: BRAND_LOGOS.HYUNDAI, infoAutoId: null },
    {
      name: "Chrysler",
      logo: BRAND_LOGOS.CHRYSLER,
      infoAutoId: null,
    },
    { name: "Honda", logo: BRAND_LOGOS.HONDA, infoAutoId: null },
  ]);

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

  const nextPage = () => {
    setFormData({
      vehicleBrandID: selectedBrandId,
      vehicleYear: selectedYear,
      vehicleModelID: selectedModelId,
      vehicleVersionCodiaID: selectedVersion,
    });

    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.VEHICLE_DETAILS);
  };

  // When component is rendered, get brands
  useEffect(() => {
    setStep(1); // Set progress bar status

    // If it is defined in context, store it
    setSelectedBrandId(formData.vehicleBrandID);
    setSelectedYear(formData.vehicleYear);
    setSelectedModelId(formData.vehicleModelID);
    setSelectedVersion(formData.vehicleVersionCodiaID);



    MahService.getBrands().then((res) => {
      const brands = res.data.data;
      setBrandsFromApi(brands);

      // Store ids from api
      mainBrands.map((brand) => {
        brands.filter(({ name: nameA, id: id }) => {
          if (nameA === brand.name.toUpperCase()) {
            brand.infoAutoId = id;
          }
        });
        setLoading(false);
      });
      setMainBrands(mainBrands);
      setLoading(false);
    });
  }, [formData]);

  const selectBrand = (brandId) => {
    setSelectedYear(null);
    setSelectedModelId(null);
    setSelectedVersion(null);
    setSelectedBrandId(brandId);

    MahService.getYears(brandId).then((res) => {
      setYearsFromApi(res.data.data);
    });
  };

  const selectYear = (year) => {
    setSelectedModelId(null);
    setSelectedVersion(null);

    setSelectedYear(year);

    MahService.getModels(selectedBrandId, year).then((res) => {
      setModelsFromApi(res.data.data);
    });
  };

  const selectModel = (modelId) => {
    setSelectedVersion(null);
    setSelectedModelId(modelId);

    MahService.getVersions(selectedBrandId, selectedYear, modelId).then(
      (res) => {
        setVersionsFromApi(res.data.data);
      }
    );
  };

  const selectVersion = (versionID) => {
    setSelectedVersion(versionID);
  };

  return (
    <>
      <div className="grid">
        <div className="col-1 p-0">
          <div className="flex justify-content-center">
            <Button
              icon="pi pi-angle-left"
              className="p-button-rounded p-button-text p-button-danger"
              aria-label="Back"
              disabled={true}
            />
          </div>
        </div>
        <div className="col-10 p-0">
          <h2>¿Qué marca?</h2>
          {isLoading ? (
            <p>Cargando...</p>
          ) : (
            <>
              <div className="p-fluid grid">
                {mainBrands.map((brand) => (
                  <div className="col-12 sm:col-6 lg:col-2">
                    <Button
                      key={brand.infoAutoId}
                      selected={selectedBrandId === brand.infoAutoId}
                      onClick={() => selectBrand(brand.infoAutoId)}
                      disabled={selectedBrandId === brand.infoAutoId}
                      className="p-button-raised p-button-sm p-button-rounded p-button-secondary"
                    >
                      <img
                        alt={brand.name + " logo"}
                        className="px-1 "
                        src={brand.logo}
                        height="50"
                      ></img>
                      <h4 className="text-center pl-2">{brand.name}</h4>
                    </Button>
                  </div>
                ))}
              </div>

              <h3 className="mt-4">
                Definí el año, el modelo y la versión de tu auto
              </h3>
              <div className="p-fluid grid mt-5">
                {/* Select brand */}
                <div className="field col-12 md:col-3">
                  <span className="p-float-label">
                    <Dropdown
                      inputId="brands"
                      value={selectedBrandId}
                      options={brandsFromApi}
                      onChange={($event) => selectBrand($event.value)}
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
                <div className="field col-12 md:col-3">
                  <span className="p-float-label">
                    <Dropdown
                      inputId="year"
                      value={selectedYear}
                      options={yearsFromApi}
                      onChange={($event) => selectYear($event.value)}
                      optionValue="id"
                      optionLabel="anio"
                      className="w-100"
                      filter
                      filterBy="anio"
                      disabled={selectedBrandId === null}
                      placeholder="Seleccioná el año"
                    />
                    <label htmlFor="year">Año</label>
                  </span>
                </div>
                {/* Select model */}
                <div className="field col-12 md:col-3">
                  <span className="p-float-label">
                    <Dropdown
                      inputId="dropdown"
                      value={selectedModelId}
                      options={modelsFromApi}
                      onChange={($event) => selectModel($event.value)}
                      optionValue="id"
                      optionLabel="name"
                      className="w-100"
                      filter
                      filterBy="name"
                      disabled={selectedYear === null}
                      placeholder="Seleccioná el modelo"
                    />
                    <label htmlFor="dropdown">Modelo</label>
                  </span>
                </div>
                {/* Select version */}
                <div className="field col-12 md:col-3">
                  <span className="p-float-label">
                    <Dropdown
                      inputId="dropdown"
                      value={selectedVersion}
                      options={versionsFromApi}
                      onChange={($event) => selectVersion($event.value)}
                      optionValue="id"
                      optionLabel="name"
                      className="w-100"
                      disabled={selectedModelId === null}
                      placeholder="Seleccioná la versión"
                      filter
                      filterBy="name"
                    />
                    <label htmlFor="dropdown">Versión</label>
                  </span>
                </div>
              </div>

              <p>TODO ADD WA.LINK +542604222645</p>
            </>
          )}
        </div>
        <div className="col-1 p-0">
          <div className="flex justify-content-center">
            <Button
              icon="pi pi-angle-right"
              className="p-button-rounded p-button-text p-button-danger"
              aria-label="Next"
              disabled={
                !(
                  selectedBrandId &&
                  selectedModelId &&
                  selectedYear &&
                  selectedVersion
                )
              }
              onClick={() => nextPage()}
            />
          </div>
        </div>
      </div>
    </>
  );
}
