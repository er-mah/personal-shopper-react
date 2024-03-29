import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";

import { MAIN_URLS, NEW_SALE_FORM_URLS } from "../../utils/constants";
import { SellCarContext } from "../../contexts";
import VehicleService from "../../services/vehicle.service";
import { TabPanel, TabView } from "primereact/tabview";
import { Image } from "primereact/image";
import { ProgressSpinner } from "primereact/progressspinner";
import FormHeader from "./formHeader";
import FormFooter from "./formFooter";

export function VehicleSpecs({ step, setStep }) {
  let navigate = useNavigate();
  let title = "Especificaciones técnicas";

  // Get information from context
  const [formData, setFormData, quotationInfo, setQuotationInfo] =
    useContext(SellCarContext);

  const [comfort, setComfort] = useState(null);
  const [technicalInfo, setTechnicalInfo] = useState(null);
  const [engineAndTransmission, setEngineAndTransmission] = useState(null);
  const [security, setSecurity] = useState(null);

  const [carBrand, setCarBrand] = useState(null);
  const [carModel, setCarModel] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const [isLoading, setLoading] = useState(true);
  let isNextPageValid = true;

  const previousPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.MODEL);
  };

  const nextPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.VEHICLE_DETAILS);
  };

  // When component is rendered
  useEffect(() => {
    setLoading(true);

    if (formData.brandId == null) {
      navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.MODEL);
    }

    setStep(4); // Set progress bar status
    new VehicleService()
      .getDetailedInfo(quotationInfo.codia)
      .then((res) => {
        setComfort(res.data.data.comfort);
        setTechnicalInfo(res.data.data.technical_info);
        setEngineAndTransmission(res.data.data.engine_and_transmission);

        setSecurity(res.data.data.security);
        setCarBrand(res.data.data.brand);
        setCarModel(res.data.data.model);
        setImageUrl(res.data.data.photo_url);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const descriptionTemplate = (feature) => {
    return (
      <div className="col-6 sm:col-4 lg:col-2">
        <span key={feature.description}>
          <strong>{feature.description}</strong>:
          {feature.type === "choice" ? (
            <> {feature.value_description}</>
          ) : (
            <></>
          )}
          {feature.type === "decimal" || feature.type === "integer" ? (
            <> {feature.value}</>
          ) : (
            <></>
          )}
          {feature.type === "boolean" ? (
            <>
              {feature.value === "true" ? <> SI</> : <></>}
              {feature.value === "false" ? <> NO</> : <></>}
            </>
          ) : (
            <></>
          )}
        </span>
      </div>
    );
  };
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
          <div className={"mx-3"}>
            <h3
              className={"flex align-items-center justify-content-center my-1"}
            >
              {carBrand} {carModel}
            </h3>
            <div className={"grid"}>
              <div className={"col-12 md:col-9"}>
                <TabView>
                  <TabPanel header="Comfort">
                    <div className={"grid"}>
                      {comfort !== null ? (
                        comfort.map((feature) => {
                          return <>{descriptionTemplate(feature)}</>;
                        })
                      ) : (
                        <></>
                      )}
                    </div>
                  </TabPanel>
                  <TabPanel header="Datos técnicos">
                    <div className={"grid"}>
                      {technicalInfo !== null ? (
                        technicalInfo.map((feature) => {
                          return <>{descriptionTemplate(feature)}</>;
                        })
                      ) : (
                        <></>
                      )}
                    </div>
                  </TabPanel>
                  <TabPanel header="Motor y transmisión">
                    <div className={"grid"}>
                      {engineAndTransmission !== null ? (
                        engineAndTransmission.map((feature) => {
                          return <>{descriptionTemplate(feature)}</>;
                        })
                      ) : (
                        <></>
                      )}
                    </div>
                  </TabPanel>
                  <TabPanel header="Seguridad">
                    <div className={"grid"}>
                      {security !== null ? (
                        security.map((feature) => {
                          return <>{descriptionTemplate(feature)}</>;
                        })
                      ) : (
                        <></>
                      )}
                    </div>
                  </TabPanel>
                </TabView>
              </div>
              <div className={"col-12 md:col-3"}>
                <div className={"flex justify-content-center"}>
                  <h4>Imagen de referencia</h4>
                </div>
                <div className={"flex justify-content-center"}>
                  {imageUrl ? (
                    <>
                      <Image
                        src={imageUrl}
                        downloadable={false}
                        width={"100%"}
                      />
                    </>
                  ) : (
                    <>
                      <span>No disponible</span>
                    </>
                  )}
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
      )}
    </div>
  );
}
