import { useEffect } from "react";
import { CALL_TO_ACTION_URLS } from "../../utils/constants";
import { NavLink } from "react-router-dom";

export function FormComplete({ _step, setStep }) {
  // When component is rendered
  useEffect(() => {
    setStep(9); // Set progress bar status
  }, []);

  const redirectPage = (url) => {
    window.location.replace(url);
  };

  return (
    <>
      <div className={"grid m-2"}>
        <div className={"sm:col-2"}></div>
        <div className={"col-12 sm:col-8"}>
          <div className="text-center border-round-3xl px-5 mb-3">
            <h1>¡Terminaste de llenar el formulario! 🥳🎉</h1>
            <span className={"text-center text-base"}>
              <p>Has completado toda la informacion que necesitamos.</p>
              <p>
                En los próximos dias nos estaremos comunicando con vos para
                concretar con los datos de la venta de tu vehículo.
              </p>
            </span>
          </div>

          <div className="text-center border-round-3xl px-5"></div>
          <div className="surface-200 text-center border-round-2xl p-3">
            <div className="font-bold text-2xl py-2 mb-5">
              <span className="text-900">Tenemos para ofrecerte </span>
              <span className="text-teal-500">otras soluciones</span>
            </div>
            <div className="grid">
              {/* DIGITAL CATALOGUE */}
              <a
                className="col-12 md:col-4"
                href={CALL_TO_ACTION_URLS.DIGITAL_CATALOGUE}
                style={{ textDecoration: "none" }}
              >
                <div className="md:mb-2 mb-0 py-3 px-3 cursor-pointer hover:bg-gray-300 hover:border-round-2xl">
                  <span
                    className="p-3 shadow-2 mb-3 inline-block"
                    style={{ borderRadius: "10px" }}
                  >
                    <i className="pi pi-car text-4xl text-teal-500"></i>
                  </span>
                  <div className="text-900 mb-3 font-medium">Autos usados</div>
                  <span className="text-700 text-sm line-height-3">
                    Contamos con un catálogo digital de{" "}
                    <strong>más de 500 autos</strong> usados.
                  </span>
                </div>
              </a>
              {/* QUALITY LEADS */}
              <a
                className="col-12 md:col-4"
                href={CALL_TO_ACTION_URLS.QUALITY_LEADS}
                style={{ textDecoration: "none" }}
              >
                <div className="md:mb-2 mb-0 py-3 px-3 cursor-pointer hover:bg-gray-300 hover:border-round-2xl">
                  <span
                    className="p-3 shadow-2 mb-3 inline-block"
                    style={{ borderRadius: "10px" }}
                  >
                    <i className="pi pi-chart-line text-4xl text-teal-500"></i>
                  </span>
                  <div className="text-900 mb-3 font-medium">
                    Leads de calidad
                  </div>
                  <span className="text-700 text-sm line-height-3">
                    Si sos parte de una agencia y querés obtener{" "}
                    <strong>leads confiables</strong>, contás con nosotros.
                  </span>
                </div>
              </a>
              {/* CAR CREDITS */}
              <a
                className="col-12 md:col-4"
                href={CALL_TO_ACTION_URLS.CAR_CREDITS}
                style={{ textDecoration: "none" }}
              >
                <div className="md:mb-2 mb-0 py-3 px-3 cursor-pointer hover:bg-gray-300 hover:border-round-2xl">
                  <span
                    className="p-3 shadow-2 mb-3 inline-block"
                    style={{ borderRadius: "10px" }}
                  >
                    <i className="pi pi-check-circle text-4xl text-teal-500"></i>
                  </span>
                  <div className="text-900 mb-3 font-medium">
                    Créditos para autos
                  </div>
                  <span className="text-700 text-sm line-height-3">
                    Si queres comprar un nuevo vehículo, te ofrecemos créditos{" "}
                    <strong>simples y transparentes</strong>.
                  </span>
                </div>
              </a>

              {/* COMMUNICATION CHANNEL */}

              <a
                className="col-12 md:col-4"
                href={CALL_TO_ACTION_URLS.COMMUNICATION_CHANNEL}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="md:mb-2 mb-0 py-3 px-3 cursor-pointer hover:bg-gray-300 hover:border-round-2xl"
                  onClick={() => {
                    redirectPage(CALL_TO_ACTION_URLS.COMMUNICATION_CHANNEL);
                  }}
                >
                  <span
                    className="p-3 shadow-2 mb-3 inline-block"
                    style={{ borderRadius: "10px" }}
                  >
                    <i className="pi pi-question-circle text-4xl text-teal-500"></i>
                  </span>
                  <div className="text-900 mb-3 font-medium">
                    FAQs y contacto
                  </div>
                  <span className="text-700 text-sm line-height-3">
                    Podrás acceder a las preguntas más consultadas. También
                    brindamos atención al cliente de manera{" "}
                    <strong>telefónica y online</strong> en el horario más
                    amplio del mercado.
                  </span>
                </div>
              </a>

              {/* BLOG POSTS */}
              <a
                className="col-12 md:col-4"
                href={CALL_TO_ACTION_URLS.BLOG_POSTS}
                style={{ textDecoration: "none" }}
              >
                <div className="md:mb-2 mb-0 py-3 px-3 cursor-pointer hover:bg-gray-300 hover:border-round-2xl">
                  <span
                    className="p-3 shadow-2 mb-3 inline-block"
                    style={{ borderRadius: "10px" }}
                  >
                    <i className="pi pi-list text-4xl text-teal-500"></i>
                  </span>
                  <div className="text-900 mb-3 font-medium">
                    Notas en nuestro blog
                  </div>
                  <span className="text-700 text-sm line-height-3">
                    Podrás acceder a <strong>información util</strong> con
                    respecto a tu auto y las normativas del país.
                  </span>
                </div>
              </a>

              {/* CAR INSURANCES */}
              <a
                className="col-12 md:col-4"
                href={CALL_TO_ACTION_URLS.CAR_INSURANCES}
                style={{ textDecoration: "none" }}
              >
                <div className="md:mb-2 mb-0 py-3 px-3 cursor-pointer hover:bg-gray-300 hover:border-round-2xl">
                  <span
                    className="p-3 shadow-2 mb-3 inline-block"
                    style={{ borderRadius: "10px" }}
                  >
                    <i className="pi pi-lock text-4xl text-teal-500"></i>
                  </span>
                  <div className="text-900 mb-3 font-medium">
                    Seguros para tu auto
                  </div>
                  <span className="text-700 text-sm line-height-3">
                    Tenemos la mas amplia oferta de seguros para auto
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className={"sm:col-2"}></div>
      </div>
    </>
  );
}
