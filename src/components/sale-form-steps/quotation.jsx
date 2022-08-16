import { useNavigate } from "react-router-dom";
import { MAIN_URLS, NEW_SALE_FORM_URLS } from "../../utils/constants";
import { useContext, useEffect, useState } from "react";
import { SellCarContext } from "../../contexts";
import VehicleService from "../../services/vehicle.service";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";

export function Quotation({ step, setStep }) {
  let service = new VehicleService();

  const [formData, setFormData, quotationInfo, setQuotationInfo] =
    useContext(SellCarContext);
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);
  const [otherPrices, setOtherPrices] = useState(null);

  const [isLoading, setLoading] = useState(true);

  let navigate = useNavigate();

  const previousPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.VEHICLE_DETAILS);
  };

  const nextPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.REVISION);
  };

  // When component is rendered
  useEffect(() => {
    setLoading(true);

    if (quotationInfo.colourCategory == null) {
      navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.VEHICLE_DETAILS);
    }

    setStep(6); // Set progress bar status

    const payload = {
      colour: quotationInfo.colourCategory,
      kilometers: quotationInfo.kmsCategory,
      sellingTime: quotationInfo.urgencyCategory,
      state: quotationInfo.stateCategory,
      versionId: quotationInfo.codia,
      year: quotationInfo.year,
    };

    service.getQuotation(payload).then((res) => {
      setMinValue(res.data.data.minValue);
      setMaxValue(res.data.data.maxValue);
      setOtherPrices(res.data.data.agenciesPrices);
      setFormData({
        ...formData,
        quotationMinValue: res.data.data.minValue,
        quotationMaxValue: res.data.data.maxValue,
        quotationBaseValue:
          (res.data.data.minValue + res.data.data.maxValue) / 2,
      });
    });

    setTimeout(function () {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <ProgressSpinner className={"center-spinner"} />
        </>
      ) : (
        <div className="px-5">
          <div className="flex my-3">
            <div className="flex-wrap sm:flex align-items-center justify-content-start hidden">
              <Button
                icon="pi pi-angle-left"
                className="p-button-rounded p-button-sm p-button-danger "
                aria-label="Back"
                onClick={() => previousPage()}
                label={"Atrás"}
              />
            </div>
            <div className="flex-1 sm:flex align-items-center justify-content-center hidden">
              <h2 className={"hidden sm:flex"}>
                Conocé la cotización de tu auto
              </h2>
            </div>
            <div className="flex-wrap sm:flex align-items-center justify-content-end hidden">
              <Button
                icon="pi pi-angle-right"
                className="p-button-rounded p-button-sm p-button-danger"
                aria-label="Next"
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
              <h3>Especificaciones</h3>
            </div>
            <div className="flex-1 flex align-items-center justify-content-end sm:hidden">
              <Button
                icon="pi pi-angle-right"
                className="p-button-rounded p-button-sm p-button-danger"
                aria-label="Next"
                onClick={() => nextPage()}
              />
            </div>
          </div>
          <div>
            <div className="flex align-items-center justify-content-center my-3">
              <div className=" ">
                <p className={"text-xl text-center"}>
                  Si concretás la venta con <strong>miautohoy.com</strong>,
                  recibís:
                </p>
                <h2
                  className={
                    "border-round bg-red-100 text-800 p-3 mx-3 text-center"
                  }
                >
                  $ {minValue} - $ {maxValue}
                </h2>
              </div>
            </div>

            <div className="flex mx-3 align-items-center justify-content-center ">
              <div className="surface-300 border-round-3xl px-4 align-items-center justify-content-center ">
                <p className={"text-base mb-0"}>
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
        </div>
      )}
    </>
  );
}
