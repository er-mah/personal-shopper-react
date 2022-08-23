import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { SellCarContext } from "../../contexts";
import {
  MAIN_URLS,
  NEW_SALE_FORM_URLS,
  OWNER_OPTIONS,
} from "../../utils/constants";
import { InputText } from "primereact/inputtext";
import VehicleService from "../../services/vehicle.service";
import { INSTITUTIONAL } from "../../utils/assets/institutional";
import FormHeader from "./formHeader";
import FormFooter from "./formFooter";

export function Owner({ _step, setStep }) {
  let service = new VehicleService();
  let title = "Datos del propietario";

  const [sex, setSex] = useState(undefined);
  const [dni, setDni] = useState(undefined);
  const [fullName, setFullName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [telephone, setTelephone] = useState(undefined);
  const [postalCode, setPostalCode] = useState(undefined);

  const isNextPageValid =
    sex && dni && fullName && email && telephone && postalCode;
  let navigate = useNavigate();

  const [formData, setFormData, _quotationInfo, _setQuotationInfo] =
    useContext(SellCarContext);

  const previousPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.START);
  };

  const nextPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.MODEL);
  };

  function loadDataFromContext() {
    if (formData.ownerSex === "Masculino") {
      setSex("M");
      setOwnerName(formData.ownerDni, "M");
    } else if (formData.ownerSex === "Femenino") {
      setSex("F");
      setOwnerName(formData.ownerDni, "F");
    }
    setDni(formData.ownerDni);
    setEmail(formData.ownerEmail);
    setTelephone(formData.ownerTelephone);
    setPostalCode(formData.ownerPostalCode);
  }

  // When component is rendered
  useEffect(() => {
    setStep(2); // Set progress bar status

    loadDataFromContext();
  }, []);

  const setOwnerName = (dniValue, sexValue) => {
    service.getDniInfo(dniValue, sexValue).then((res) => {
      const owner = res.data.data;
      if (owner != null) {
        setFullName(owner.nombre);
      } else {
        setFullName(null);
      }
      setFormData({
        ...formData,
        ownerName: owner.nombre,
        ownerDni: dniValue,
        ownerCuil: owner.cuil,
      });
    });
  };

  return (
    <div>
      {/* Buttons */}
      <FormHeader
        back={() => previousPage()}
        next={() => nextPage()}
        isNextPageValid={isNextPageValid}
        title={title}
      />
      <div className={"flex align-items-center justify-content-center"}>
        <div className="grid grid-nogutter">
          <div className="col-12 md:col-7 px-5">
            <div className="p-fluid grid">
              {/* SEXO */}
              <div className="field col-6 my-2">
                <span className="p-float-label">
                  <Dropdown
                    inputId="sex"
                    value={sex}
                    options={OWNER_OPTIONS.dniSex}
                    onChange={($event) => {
                      if (dni !== undefined) {
                        setOwnerName(dni, $event.target.value);
                      }

                      setSex($event.target.value);

                      if ($event.value === "F") {
                        setFormData({
                          ...formData,
                          ownerSex: "Femenino",
                        });
                      } else if ($event.value === "M") {
                        setFormData({
                          ...formData,
                          ownerSex: "Masculino",
                        });
                      }
                    }}
                    placeholder="Seleccioná el sexo tal cual está en el DNI"
                  />
                  <label htmlFor="sex">Sexo</label>
                </span>
              </div>

              {/* DNI */}
              <div className="field col-6 my-2">
                <span className="p-float-label">
                  {formData.ownerSex === undefined ? (
                    <>
                      <InputNumber
                        inputId="dni"
                        autoComplete={"off"}
                        value={dni}
                        className={"surface-400 border-round"}
                        onValueChange={($event) => {
                          setDni($event.value);
                          setFormData({ ...formData, ownerDni: $event.value });
                          setOwnerName($event.value, sex);
                        }}
                        disabled
                      />
                    </>
                  ) : (
                    <>
                      <InputNumber
                        inputId="dni"
                        autoComplete={"off"}
                        value={dni}
                        onValueChange={($event) => {
                          setDni($event.value);
                          setFormData({ ...formData, ownerDni: $event.value });
                          setOwnerName($event.value, sex);
                        }}
                      />
                    </>
                  )}

                  <label htmlFor="dni">DNI</label>
                </span>
              </div>

              {/* NOMBRE COMPLETO */}
              <div className="field col-6 my-2">
                <span className="p-float-label">
                  {(formData.ownerDni == null && formData.ownerSex == null) ||
                  !fullName ? (
                    <>
                      <InputText
                        autoComplete={"off"}
                        id="fullName"
                        readOnly={true}
                        value={fullName}
                        className={"surface-300 border-round"}
                        disabled
                      />
                    </>
                  ) : (
                    <>
                      <InputText
                          autoComplete={"off"}
                          id="fullName"
                          readOnly={true}
                          value={fullName}
                      />
                    </>
                  )}
                  <label htmlFor="fullName">Nombre completo</label>
                </span>
              </div>

              {/* CORREO ELECTRÓNICO */}
              <div className="field col-6 my-2">
                <span className="p-float-label">
                  <InputText
                    autoComplete={"off"}
                    id="email"
                    type={"email"}
                    value={email}
                    onChange={($event) => {
                      setEmail($event.target.value);
                      setFormData({
                        ...formData,
                        ownerEmail: $event.target.value,
                      });
                    }}
                    placeholder="Escribí el correo electrónico"
                  />
                  <label htmlFor="email">Correo electrónico</label>
                </span>
              </div>

              {/* TELÉFONO */}
              <div className="field col-6 my-2">
                <span className="p-float-label">
                  <InputNumber
                    inputId="tel"
                    autoComplete={"off"}
                    value={telephone}
                    mode="decimal"
                    useGrouping={false}
                    prefix={"+54 "}
                    onValueChange={($event) => {
                      setTelephone($event.value);
                      setFormData({
                        ...formData,
                        ownerTelephone: $event.value,
                      });
                    }}
                    placeholder={"Escribi el teléfono de contacto"}
                  />

                  <label htmlFor="tel">Teléfono</label>
                </span>
              </div>

              {/* POSTAL CODE */}
              <div className="field col-6 my-2">
                <span className="p-float-label">
                  <InputText
                    autoComplete={"off"}
                    id="address"
                    value={postalCode}
                    onChange={($event) => {
                      setPostalCode($event.target.value);
                      setFormData({
                        ...formData,
                        ownerPostalCode: $event.target.value,
                      });
                    }}
                    placeholder="Definí el código postal"
                  />
                  <label htmlFor="address">Código postal</label>
                </span>
              </div>
            </div>

            <FormFooter
                back={() => previousPage()}
                next={() => nextPage()}
                isNextPageValid={isNextPageValid}
                title={title}
            />
          </div>

          <div className="col-12 md:col-5 overflow-hidden">
            <div className="flex align-content-end justify-content-end md:ml-auto block md:h-full">
              <img
                src={INSTITUTIONAL.OWNER}
                alt="hero-1"
                style={{
                  clipPath: "polygon(8% 0, 100% 0%, 100% 100%, 0 100%)",
                  width: "100%",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
