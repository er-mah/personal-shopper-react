import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { MAIN_URLS, NEW_SALE_FORM_URLS } from "../../utils/constants";
import {useContext, useEffect, useState} from "react";
import {SellCarContext} from "../../contexts";

export function NextSteps({ step, setStep }) {
  let navigate = useNavigate();

  const [formData, setFormData, _quotationInfo, _setQuotationInfo] =
      useContext(SellCarContext);

  const [selectedOption, setSelectedOption] = useState(undefined);

  const previousPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.REVISION);
  };

  const nextPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.FORM_COMPLETE);
  };



  // When component is rendered
  useEffect(() => {
    setStep(8); // Set progress bar status

    if (formData.availableRevisionDates == null) {
      navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.REVISION)
    }
  }, []);

  return (
    <>
      <div className="px-5">
        <div className="flex mt-3">
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
            <h2 className={"hidden sm:flex"}>Próximos pasos</h2>
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
            <h3 className={"text-center"}>Próximos pasos</h3>
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

        <div className={"flex align-items-center justify-content-center pt-5 pb-5 text-lg"}>
          Elegí alguno de los servicios que ofrecemos
        </div>

        <div className={'grid'}>
          <div className={'col-12 md:col-3'}></div>

          {/* IMMEDIATE PURCHASE */}
          <div className={"col-12 md:col-2 "}>
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
                      setFormData({...formData, action: 'Compra inmediata'})
                    }}
                >
                  <div className="p-card-title ">
                    <div className={"flex "}>
                      <div className="flex-1 text-center">
                        Compra inmediata
                      </div>
                    </div>
                  </div>
                  <div className="p-card-content m-0 p-0">
                    <div className={"flex"}>
                      <div className="flex-1 text-center text-base">
                        <p>Con los datos de tu vehículo que has ingresado y el chequeo mecánico, fijaremos un <strong>precio final</strong>. </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PERSONAL SELLER */}
          <div className={"col-12 md:col-2 "}>
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
                      setFormData({...formData, action: 'Personal seller'})
                    }}
                >
                  <div className="p-card-title ">
                    <div className={"flex "}>
                      <div className="flex-1 text-center">
                        Personal seller
                      </div>
                    </div>
                  </div>
                  <div className="p-card-content m-0 p-0">
                    <div className={"flex "}>
                      <div className="flex-1 text-center text-base">
                        <p>Fijaremos un precio de venta al público.</p>
                        <p>El mismo puede ser un <strong>25% mayor</strong> al que te ofrezcamos en la modalidad de compra inmediata.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FREE POST */}
          <div className={'col-12 md:col-2'}>
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
                      setFormData({...formData, action: 'Publicación gratuita'})
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
                        <p>Podrás publicar tu vehículo de manera <strong>gratuita</strong></p>
                        <p>Si querés ofrecer la venta de tu vehiculo con crédito, te asesoraremos.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={'col-12 md:col-3'}></div>
        </div>
      </div>
    </>
  );
}
