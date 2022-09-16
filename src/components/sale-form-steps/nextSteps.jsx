import { useNavigate } from "react-router-dom";
import { MAIN_URLS, NEW_SALE_FORM_URLS } from "../../utils/constants";
import React, { useContext, useEffect, useState } from "react";
import { SellCarContext } from "../../contexts";
import FormHeader from "./formHeader";
import FormFooter from "./formFooter";
import PersonalShopperService from "../../services/personal-shopper.service";
import { MAH_URLS } from "../../utils/constants/urls";

export function NextSteps({ step, setStep }) {
  let navigate = useNavigate();
  let title = "Próximos pasos";
  let service = new PersonalShopperService();

  const [formData, setFormData, _quotationInfo, _setQuotationInfo] =
    useContext(SellCarContext);

  const [selectedOption, setSelectedOption] = useState(undefined);
  const [saleType, setSaleType] = useState("");

  let isNextPageValid = selectedOption !== undefined;

  const previousPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.REVISION);
  };

  const nextPage = () => {
    service.addSaleTypeToDeal(saleType, formData.dealId).finally(() => {
      if (selectedOption === 3) {
        window.location.replace(MAH_URLS.PUBLISH_CAR);
      }
      navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.FORM_COMPLETE);
    });
  };

  function setOption(saleType) {
    if (saleType === "Compra inmediata") {
      setSelectedOption(1);
    } else if (saleType === "Personal seller") {
      setSelectedOption(2);
    } else if (saleType === "Publicación gratuita") {
      setSelectedOption(3);
    }
  }

  const loadDataFromContext = () => {
    setOption(formData.saleType);
  };

  // When component is rendered
  useEffect(() => {
    setStep(8); // Set progress bar status

    loadDataFromContext();

    if (formData.availableRevisionDates == null) {
      navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.REVISION);
    }
  }, []);

  return (
    <>
      {/* Buttons */}
      <FormHeader
        back={() => previousPage()}
        next={() => nextPage()}
        isNextPageValid={isNextPageValid}
        title={title}
      />
      <div className="px-5">
        <div
          className={
            "flex align-items-center justify-content-center my-2 text-lg"
          }
        >
          Elegí alguno de los servicios que ofrecemos
        </div>
        <div className={"grid"}>
          <div className={"col-12 lg:col-3"}></div>
          {/* IMMEDIATE PURCHASE */}
          <div className={"col-12 md:col-4 lg:col-2"}>
            <div className={"flex align-items-center justify-content-center"}>
              <div
                className="p-card p-component cursor-pointer bg-gray-300 "
                style={{ width: "30em" }}
              >
                <div
                  className={
                    selectedOption === 1
                      ? "p-card-body p-0 m-0 transition-colors text-900 hover:bg-red-200 red-card-border p-3"
                      : "p-card-body p-0 m-0 transition-colors text-900 hover:bg-red-200 p-3"
                  }
                  onClick={() => {
                    setSelectedOption(1);
                    setFormData({ ...formData, saleType: "Compra inmediata" });
                    setSaleType({
                      saleType: "Compra inmediata",
                    });
                  }}
                >
                  <div className="p-card-title ">
                    <div className={"flex "}>
                      <div className="flex-1 text-center">Compra inmediata</div>
                    </div>
                  </div>
                  <div className="p-card-content m-0 p-0">
                    <div className={"flex"}>
                      <div className="flex-1 text-center text-base">
                        <p>
                          Con los datos de tu vehículo que has ingresado y el
                          chequeo mecánico, fijaremos un{" "}
                          <strong>precio final</strong>.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PERSONAL SELLER */}
          <div className={"col-12 md:col-4 lg:col-2"}>
            <div className={"flex align-items-center justify-content-center"}>
              <div
                className="p-card p-component cursor-pointer bg-gray-300 "
                style={{ width: "30em" }}
              >
                <div
                  className={
                    selectedOption === 2
                      ? "p-card-body p-0 m-0 transition-colors text-900 hover:bg-red-200 red-card-border p-3"
                      : "p-card-body p-0 m-0 transition-colors text-900 hover:bg-red-200 p-3"
                  }
                  onClick={() => {
                    setSelectedOption(2);
                    setFormData({ ...formData, saleType: "Personal seller" });
                    setSaleType({
                      saleType: "Personal seller",
                    });
                  }}
                >
                  <div className="p-card-title ">
                    <div className={"flex "}>
                      <div className="flex-1 text-center">Personal seller</div>
                    </div>
                  </div>
                  <div className="p-card-content m-0 p-0">
                    <div className={"flex "}>
                      <div className="flex-1 text-center text-base">
                        <p>
                          Coordinaremos con vos un{" "}
                          <strong>precio de venta al público</strong> para tu
                          vehículo.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FREE POST */}
          <div className={"col-12 md:col-4 lg:col-2"}>
            <div className={"flex align-items-center justify-content-center"}>
              <div
                className="p-card p-component cursor-pointer bg-gray-300 "
                style={{ width: "30em" }}
              >
                <div
                  className={
                    selectedOption === 3
                      ? "p-card-body p-0 m-0 transition-colors text-900 hover:bg-red-200 red-card-border p-3"
                      : "p-card-body p-0 m-0 transition-colors text-900 hover:bg-red-200 p-3"
                  }
                  onClick={() => {
                    setSelectedOption(3);
                    setFormData({
                      ...formData,
                      saleType: "Publicación gratuita",
                    });
                    setSaleType({
                      saleType: "Publicación gratuita",
                    });
                  }}
                >
                  <div className="p-card-title ">
                    <div className={"flex "}>
                      <div className="flex-1 text-center">
                        Publicarlo en el catálogo
                      </div>
                    </div>
                  </div>
                  <div className="p-card-content m-0 p-0">
                    <div className={"flex "}>
                      <div className="flex-1 text-center text-base">
                        <p>
                          Podrás publicar tu vehículo de manera{" "}
                          <strong>gratuita</strong>.
                        </p>
                        <p>
                          Te asesoraremos en caso de que quieras ofrecer la
                          venta de tu vehiculo con crédito.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={"flex align-items-center justify-content-center"}>
              {selectedOption === 3 ? (
                <div className={"flex-1 text-center my-2 "}>
                  Serás redirigido a la página para publicar tu vehiculo.
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className={"col-12 lg:col-3"}></div>
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
