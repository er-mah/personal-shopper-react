import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { SellCarContext } from "../../contexts";
import { MAIN_URLS, NEW_SALE_FORM_URLS } from "../../utils/constants";
import { addLocale, locale } from "primereact/api";

export function VehicleRevision({ _step, setStep }) {
  let navigate = useNavigate();

  const [formData, setFormData, _quotationInfo, _setQuotationInfo] =
    useContext(SellCarContext);
  const [datetime, setDatetime] = useState(new Date());
  const [strDate, setStrDate] = useState(null);

  // DATEPICKER VARIABLES
  let today = new Date();
  let thisMonth = today.getMonth();
  let thisyear = today.getFullYear();

  let minDate = today;

  let nextMonth = thisMonth === 11 ? 0 : thisMonth + 1;
  let nextYear = nextMonth === 0 ? thisyear + 1 : thisyear;
  let maxDate = new Date();
  maxDate.setMonth(nextMonth);
  maxDate.setFullYear(nextYear);

  addLocale("es", {
    firstDayOfWeek: 0,
    dayNames: [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ],
    monthNamesShort: [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ],
    today: "Hoy",
    clear: "Limpiar",
  });

  locale("es");

  // When component is rendered
  useEffect(() => {
    setStep(6); // Set progress bar status
  }, []);

  const previousPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.QUOTATION);
  };

  const nextPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.FORM_COMPLETE);
  };

  let invalidDates = [today];

  function setRevisionDatetime(e) {
    setStrDate(e.target.value.toLocaleString());
    setDatetime(e.value);
    setFormData({ ...formData, revisionDatetime: e.value });
  }

  return (
    <>
      <div className="px-5">
        <div className={"grid"}>
          <div className={"col-8"}>
            <h2>Programá la revisión de tu auto</h2>
            <p>
              Necesitamos definir una <strong>fecha estimada</strong> donde vos
              tengas tiempo libre para realizar la revisión de tu auto.
            </p>
            <p>
              La misma será coordinada mas tarde por nuestro equipo por medio de
              tus datos de contacto.
            </p>
            {strDate !== null ? (
              <>
                <h4 className={'mt-5'}>Fecha seleccionada: </h4>
                <h2
                  className={
                    "border-round bg-red-100 text-800 p-3 mx-3 w-16rem text-center"
                  }
                >
                  {strDate}
                </h2>

                <Button
                    label={'Terminar formulario'}
                    className="p-button-rounded p-button-danger ml-3"
                    aria-label="Next"
                    onClick={() => nextPage()}
                />
              </>
            ) : (
              <></>
            )}
          </div>
          <div className={"col-4"}>
            <Calendar
              id="minmax"
              value={datetime}
              onChange={(e) => setRevisionDatetime(e)}
              minDate={minDate}
              maxDate={maxDate}
              readOnlyInput
              showTime
              disabledDays={[0]}
              disabledDates={invalidDates}
              inline
            />
          </div>
        </div>
      </div>
      <Button
        icon="pi pi-angle-left"
        className="p-button-rounded p-button-danger left-button"
        aria-label="Back"
        onClick={() => previousPage()}
      />

    </>
  );
}