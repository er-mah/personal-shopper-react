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
        <div className="col-12 md:col-5 overflow-hidden">
          <div className="md:ml-auto block md:h-full">
            <img
                src={INSTITUTIONAL.VERTE_LLEGAR}
                alt="hero-1"
                style={{
                  clipPath: "polygon(0 0, 90% 0, 100% 100%, 0% 100%)",
                  width: "100%",
                }}
            />
          </div>
        </div>
        <div className="col-12 md:col-7 p-6 text-center md:text-right flex align-items-center justify-content-center">
          <div className={'flex align-items-end'}>
            <section>
              <span className="block text-6xl font-bold mb-1">Vendé tu auto</span>
              <div className="text-6xl text-primary font-bold mb-3">
                de manera inmediata
              </div>
              <p className="mt-0 mb-4 text-700 line-height-3">
                Sólo necesitamos que nos dejes tus datos para poder contactarte
              </p>

              <Button
                  label="Iniciar formulario"
                  type="button"
                  className="mr-3 p-button-danger p-button-raised"
                  onClick={() => nextPage()}
              />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
