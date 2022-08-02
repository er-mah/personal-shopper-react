import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import { MAIN_URLS, NEW_SALE_FORM_URLS } from "../../utils/constants";
import { SellCarContext } from "../../contexts";
import VehicleService from "../../services/vehicle.service";
import { TabPanel, TabView } from "primereact/tabview";
import {Image} from "primereact/image";

export function VehicleSpecs({ step, setStep }) {
  // Get information from context
  const [formData, setFormData, quotationInfo, setQuotationInfo] = useContext(SellCarContext);

  const [comfort, setComfort] = useState(null);
  const [technicalInfo, setTechnicalInfo] = useState(null);
  const [engineAndTransmission, setEngineAndTransmission] = useState(null);
  const [security, setSecurity] = useState(null);

  const [carBrand, setCarBrand] = useState(null);
  const [carModel, setCarModel] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  let navigate = useNavigate();

  const previousPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.MODEL);
  };

  const nextPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.VEHICLE_DETAILS);
  };

  // When component is rendered
  useEffect(() => {

    setStep(3); // Set progress bar status
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
      });
  }, []);

  const descriptionTemplate = (feature) => {
    return (
      <div className="col-4">
        <span key={feature.description}>
          <strong>{feature.description}</strong>:
          {feature.type === "choice" ? (
            <>
              {" "}
              {feature.value_description}
            </>
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
          <h2>Tu auto: {carBrand} {carModel}</h2>
          <div className={"grid"}>
            <div className={"col-9"}>
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
            <div className={"col-3"}>
              <div className={"flex justify-content-center"}>
                <h4>Imagen de referencia</h4>
              </div>
              <div className={"flex justify-content-center"}>
                <Image
                    src={imageUrl}
                    downloadable={false}
                    width={250}
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
