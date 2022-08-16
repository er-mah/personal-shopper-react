import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
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

export function Owner({ _step, setStep }) {
  let service = new VehicleService();

  const [sex, setSex] = useState(undefined);
  const [dni, setDni] = useState(undefined);
  const [fullName, setFullName] = useState(undefined);
  const [maritalState, setMaritalState] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [telephone, setTelephone] = useState(undefined);
  const [address, setAddress] = useState(undefined);
  const [postalCode, setPostalCode] = useState(undefined);

  const isNextPageValid =
    sex &&
    dni &&
    fullName &&
    maritalState &&
    email &&
    telephone &&
    address &&
    postalCode;
  let navigate = useNavigate();

  const [formData, setFormData, _quotationInfo, _setQuotationInfo] =
    useContext(SellCarContext);

  const previousPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.START);
  };

  const nextPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.MODEL);
    console.table(formData);
  };

  // When component is rendered
  useEffect(() => {
    setStep(2); // Set progress bar status
  }, []);


  const setOwnerName = (dniValue, sexValue) => {
    if (dniValue) {
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
          ownerCuil: owner.cuil,
        });
      });
    }
  }

  const updateSex = (value, label) => {
    console.log(value, label);
    setSex(value);
    setFormData({
      ...formData,
      ownerSex: label,
    });
    setOwnerName(dni, value)
  }

  return (
    <>
      <div className="">
        {/* Buttons */}
        <div className="flex my-3 px-5">
          <div className="flex-1 sm:flex align-items-center justify-content-start hidden">
            <Button
              icon="pi pi-angle-left"
              className="p-button-rounded p-button-sm p-button-danger "
              aria-label="Back"
              onClick={() => previousPage()}
              label={"Atrás"}
            />
          </div>

          <div className="flex-1 sm:flex align-items-center justify-content-center hidden">
            <h2 className={"text-center"}>Datos del propietario</h2>
          </div>
          <div className="flex-1 sm:flex align-items-center justify-content-end hidden">
            <Button
              icon="pi pi-angle-right"
              className="p-button-rounded p-button-sm p-button-danger"
              aria-label="Next"
              onClick={() => nextPage()}
              disabled={!isNextPageValid}
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
            <h3 className={"text-center"}>Datos del propietario</h3>
          </div>
          <div className="flex-1 flex align-items-center justify-content-end sm:hidden">
            <Button
              icon="pi pi-angle-right"
              className="p-button-rounded p-button-sm p-button-danger"
              aria-label="Next"
              onClick={() => nextPage()}
              disabled={!isNextPageValid}
            />
          </div>
        </div>

        <div className={"flex align-items-center justify-content-center"}>
          <div className="grid grid-nogutter">
            <div className="col-12 md:col-7 px-5">
              <div className="p-fluid grid px-4">

                {/* SEXO */}
                <div className="field col-6 my-2">
                  <span className="p-float-label">
                    <Dropdown
                      inputId="sex"
                      value={sex}
                      options={OWNER_OPTIONS.dniSex}
                      onChange={($event) => {
                        setSex($event.target.value);
                        setFormData({
                          ...formData,
                          ownerSex: $event.originalEvent.target.ariaLabel,
                        });
                      }}
                      placeholder="Seleccioná el sexo tal cual está en el DNI"
                    />
                    <label htmlFor="sex">Sexo</label>
                  </span>
                </div>

                {/* DNI */}
                <div className="field col-6 my-2">
                  <span className="p-float-label">
                    <InputNumber
                      inputId="dni"
                      autoComplete={"off"}
                      value={dni}
                      onValueChange={($event) => {
                        setDni($event.value);
                        setFormData({ ...formData, ownerDni: $event.value });
                        setOwnerName($event.value, sex);
                      }}
                      disabled={formData.ownerSex == null}
                    />

                    <label htmlFor="dni">DNI</label>
                  </span>
                </div>

                {/* NOMBRE COMPLETO */}
                <div className="field col-6 my-2">
                  <span className="p-float-label">
                    <InputText
                      autoComplete={"off"}
                      id="fullName"
                      readOnly={true}
                      value={fullName}
                      disabled={
                        (formData.ownerDni == null &&
                          formData.ownerSex == null) ||
                        !fullName
                      }
                    />
                    <label htmlFor="fullName">Nombre completo</label>
                  </span>
                </div>

                {/* ESTADO CIVIL */}
                <div className="field col-6 my-2">
                  <span className="p-float-label">
                    <Dropdown
                      inputId="maritalState"
                      value={maritalState}
                      options={OWNER_OPTIONS.maritalStatus}
                      onChange={($event) => {
                        setMaritalState($event.target.value);
                        setFormData({
                          ...formData,
                          ownerMaritalStatus: $event.target.value,
                        });
                      }}
                      placeholder="Seleccioná el estado civil"
                    />
                    <label htmlFor="maritalState">Estado civil</label>
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

                {/* DIRECCIÓN */}
                <div className="field col-6 my-2">
                  <span className="p-float-label">
                    <InputText
                      autoComplete={"off"}
                      id="address"
                      value={address}
                      onChange={($event) => {
                        setAddress($event.target.value);
                        setFormData({
                          ...formData,
                          ownerAddress: $event.target.value,
                        });
                      }}
                      placeholder="Definí la direccion"
                    />
                    <label htmlFor="address">Dirección</label>
                  </span>
                </div>

                {/* CODIGO POSTAL */}
                <div className="field col-6 my-2">
                  <span className="p-float-label">
                    <InputText
                      autoComplete={"off"}
                      id="postalCode"
                      value={postalCode}
                      onChange={($event) => {
                        setPostalCode($event.target.value);
                        setFormData({
                          ...formData,
                          ownerPostalCode: $event.target.value,
                        });
                      }}
                      placeholder="Escribí el código postal"
                    />
                    <label htmlFor="postalCode">Código postal</label>
                  </span>
                </div>
              </div>
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
    </>
  );
}
