import { useNavigate } from "react-router-dom";
import { MAIN_URLS, NEW_SALE_FORM_URLS } from "../../utils/constants";
import { useContext, useEffect, useState } from "react";
import { SellCarContext } from "../../contexts";
import VehicleService from "../../services/vehicle.service";
import {Button} from "primereact/button";
import {Card} from "primereact/card";

export function Quotation({ step, setStep }) {
  let service = new VehicleService();

  const [formData, setFormData, quotationInfo, setQuotationInfo] =
    useContext(SellCarContext);
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);
  const [otherPrices, setOtherPrices] = useState(null);

  let navigate = useNavigate();

  const previousPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.VEHICLE_DETAILS);
  };

  const nextPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.REVISION);
  };

  // When component is rendered
  useEffect(() => {
    setStep(5); // Set progress bar status

    const payload = {
      colour: quotationInfo.colourCategory,
      kilometers: quotationInfo.kmsCategory,
      sellingTime: quotationInfo.urgencyCategory,
      state: quotationInfo.stateCategory,
      versionId: quotationInfo.codia,
      year: quotationInfo.year,
    };

    service.getQuotation(payload).then((res) => {
      console.log(res.data.data);
      setMinValue(res.data.data.minValue);
      setMaxValue(res.data.data.maxValue);
      setOtherPrices(res.data.data.agenciesPrices);
    });
  }, []);

  return (
    <>
      <div className="px-5">
        <h2>Conocé la cotización de tu vehículo</h2>
        <Card>
          <div>
            Si concretás la venta con <strong>miautohoy.com</strong>, recibís:
          </div>
          <div className="flex flex-wrap align-items-center justify-content-center card-container">
            <h2
                className={
                  "border-round bg-red-100 text-800 p-3 mx-3 text-center"
                }
            >
              $ {minValue} - $ {maxValue}
            </h2>
          </div>
          <p>En las concesionarias te pueden ofrecer:</p>
          <div className="flex flex-wrap align-items-center justify-content-start card-container">
            {otherPrices !== null ? (
              otherPrices.map((price, i) => {
                return (
                  <>
                    <h3
                      key={i}
                      className={
                        "border-round bg-gray-300 text-800 p-3 my-0 mr-3 text-center"
                      }
                    >
                      $ {price}
                    </h3>
                  </>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </Card>
      </div>

      <Button
        icon="pi pi-angle-left"
        className="p-button-rounded p-button-danger left-button"
        aria-label="Back"
        onClick={() => previousPage()}
      />

      <Button
        icon="pi pi-angle-right"
        className="p-button-rounded p-button-danger right-button"
        aria-label="Next"
        onClick={() => nextPage()}
      />
    </>
  );
}
