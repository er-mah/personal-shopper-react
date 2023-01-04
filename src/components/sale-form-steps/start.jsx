import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { MAIN_URLS, NEW_SALE_FORM_URLS } from "../../utils/constants";
import { useEffect } from "react";
import { INSTITUTIONAL } from "../../utils/assets/institutional";

export function Start({ setStep }) {
  let navigate = useNavigate();

  const nextPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.OWNER);
  };

  // When component is rendered
  useEffect(() => {
    setStep(1); // Set progress bar status
  }, []);

  return (
    <>
      <div className="grid grid-nogutter surface-0 text-800">
        <div className="col-12 md:col-6 overflow-hidden">
          <div className="flex align-content-center md:ml-auto block p-6 md:p-6 md:mt-6">
            <img
              src={INSTITUTIONAL.START}
              alt="hero-1"
              style={{
                height: "100%",
                width: "100%"
              }}
            />
          </div>
        </div>
        <div className="col-12 md:col-6 px-3 md:p-6 text-center md:text-right flex align-items-center justify-content-start">
          <div className="flex">
            <section>
              <span className="md:text-right sm:text-center md:text-6xl text-3xl font-bold mb-1">
                Vendé tu auto
              </span>
              <div className="md:text-right sm:text-center md:text-6xl text-2xl font-bold mb-3 text-primary">
                de manera inmediata
              </div>
              <p className="mt-0 mb-4 md:text-xl line-height-3">
                Sólo necesitamos que nos dejes tus datos para poder contactarte
              </p>
              <div className="md:text-right sm:text-center mt-5">
                <Button
                    label="Iniciar Personal Shopper"
                    type="button"
                    className="p-button-techmo p-button-lg p-button-raised"
                    onClick={() => nextPage()}
                />
              </div>

            </section>
          </div>
        </div>
      </div>
    </>
  );
}
