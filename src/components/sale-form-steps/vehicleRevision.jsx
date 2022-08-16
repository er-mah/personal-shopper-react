import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { SellCarContext } from "../../contexts";
import {
  REVISION_OPTIONS,
  MAIN_URLS,
  NEW_SALE_FORM_URLS,
} from "../../utils/constants";
import { addLocale, locale } from "primereact/api";

export function VehicleRevision({ _step, setStep }) {
  let navigate = useNavigate();

  const [formData, setFormData, _quotationInfo, _setQuotationInfo] =
    useContext(SellCarContext);

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
  addLocale("es", REVISION_OPTIONS.calendarOpts);
  locale("es");
  let invalidDates = [today];

  const [multipleDates, setMultipleDates] = useState(null);

  // When component is rendered
  useEffect(() => {
    setStep(7); // Set progress bar status

    if (formData.quotationBaseValue == null) {
      navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.QUOTATION)
    }

  }, []);

  const previousPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.QUOTATION);
  };

  const nextPage = () => {
    navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.NEXT_STEPS);
  };

  return (
    <>
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
            <h2 className={"hidden sm:flex"}>Programá la revisión mecánica</h2>
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
            <h3 className={"text-center"}>Revisión mecánica</h3>
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

        <div className={"p-fluid grid"}>
          <div className="col-12 md:col-1 lg:col-2"></div>
          <div className="col-12 md:col-4 lg:col-3">

            <div className={'py-2 px-4 border-round bg-gray-300'}>
              <div>
                <p className={"text-base"}>
                  Seleccioná las <strong>fechas estimadas</strong> donde vos
                  tengas tiempo libre para realizar la revisión de tu auto.
                </p>
              </div>
              <div>
                <p className={"text-base"}>
                  La misma será coordinada mas tarde por nuestro equipo con datos de contacto.
                </p>
              </div>
            </div>
          </div>
          <div className="field flex-wrap col-12 md:col-6 lg:col-4">
            <Calendar
              value={multipleDates}
              onChange={(e) => {
                setFormData({...formData, availableRevisionDates: e.value})
                setMultipleDates(e.value);
              }}
              selectionMode="multiple"
              disabledDays={[0]}
              disabledDates={invalidDates}
              minDate={minDate}
              maxDate={maxDate}
              className={"input-grande"}
              inline
            />
          </div>
          <div className="col-12 md:col-1 lg:col-3"></div>
        </div>
      </div>
    </>
  );
}
