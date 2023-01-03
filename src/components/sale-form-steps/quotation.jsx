import { useNavigate } from "react-router-dom";
import { MAIN_URLS, NEW_SALE_FORM_URLS } from "../../utils/constants";
import React, { useContext, useEffect, useState } from "react";
import { SellCarContext } from "../../contexts";
import { ProgressSpinner } from "primereact/progressspinner";
import FormHeader from "./formHeader";
import FormFooter from "./formFooter";
import PersonalShopperService from "../../services/personal-shopper.service";
import VehicleService from "../../services/vehicle.service";

export function Quotation({ step, setStep }) {
  let vecicleService = new VehicleService();
  let personalShopperService = new PersonalShopperService();

  let isNextPageValid = true;
  let title = "Cotización tu vehículo";

  const [formData, setFormData, quotationInfo, setQuotationInfo] =
    useContext(SellCarContext);
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);
  const [otherPrices, setOtherPrices] = useState(null);
  const [baseValue, setBaseValue] = useState(null);

  const [isLoading, setLoading] = useState(true);

  let navigate = useNavigate();

  const previousPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.VEHICLE_DETAILS);
  };

  const nextPage = () => {
    setFormData({
      ...formData,
      quotationMinValue: minValue,
      quotationMaxValue: maxValue,
      quotationBaseValue: baseValue,
    });
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.REVISION);
  };

  const storeInfo = async (payload) => {
    vecicleService.getQuotation(payload).then((res) => {
      setMinValue(res.data.data.minValue);
      setMaxValue(res.data.data.maxValue);
      setOtherPrices(res.data.data.agenciesPrices);
      setBaseValue((res.data.data.minValue + res.data.data.maxValue) / 2);
      setTimeout(
          () => {
              personalShopperService
                  .persistDeal({
                      ownerCuil: formData.ownerCuil,
                      ownerDni: formData.ownerDni,
                      ownerEmail: formData.ownerEmail,
                      ownerName: formData.ownerName,
                      ownerPhone: formData.ownerTelephone,
                      ownerPostalCode: formData.ownerPostalCode,
                      ownerSex: formData.ownerSex,
                      saleBaseQuotationValue:
                          (res.data.data.minValue + res.data.data.maxValue) / 2,
                      saleCurrency: formData.currency,
                      saleQuotationRange:
                          res.data.data.minValue + " - " + res.data.data.maxValue,
                      saleRequestedAmount: formData.amount,
                      saleUrgency: formData.urgency,
                      vehicleBrand: formData.brandName,
                      vehicleColor: formData.colour,
                      vehicleComments: formData.comments,
                      vehicleKilometers: formData.kilometers,
                      vehicleLicensePlate: formData.licensePlate,
                      vehicleModel: formData.modelName,
                      vehicleState: formData.state,
                      vehicleVersion: formData.versionName,
                      vehicleYear: formData.year,
                  })
                  .then((res) => {
                      setFormData({ ...formData, dealId: res.data.data.id });
                  })
                  .finally(() => {
                      setLoading(false);
                  });
          },
        5000
      );
    });
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

    storeInfo(payload);
  }, []);

  return (
    <>
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

          <div className="px-5">
            <div>
              <div
                className={
                  "flex align-items-center justify-content-center my-3"
                }
              >
                <p className={"sm:text-xl text-center"}>
                  Si concretás la venta con{" "}
                  <span className={"text-teal-500"}>
                    <strong>TechMo</strong>
                  </span>
                  , te podemos ofrecer el siguiente{" "}
                  <strong>rango de precios</strong>:
                </p>
              </div>
              <div
                className={
                  "flex align-items-center justify-content-center my-3"
                }
              >
                <span
                  className={
                    "border-round bg-teal-200 text-xl sm:text-2xl py-3 px-6 mx-3 text-center"
                  }
                >
                  <strong>
                    $ {minValue} - $ {maxValue}
                  </strong>
                </span>
              </div>

              <div className="flex mx-3 align-items-center justify-content-center mt-5">
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
    </>
  );
}
