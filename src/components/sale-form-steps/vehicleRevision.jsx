import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {Calendar} from "primereact/calendar";
import {SellCarContext} from "../../contexts";
import {
  MAIN_URLS,
  NEW_SALE_FORM_URLS,
  REVISION_OPTIONS,
} from "../../utils/constants";
import {addLocale, locale} from "primereact/api";
import FormHeader from "./formHeader";
import FormFooter from "./formFooter";

export function VehicleRevision({_step, setStep}) {
  let navigate = useNavigate();
  let title = "Revisión mecánica";

  const [formData, setFormData, _quotationInfo, _setQuotationInfo] =
      useContext(SellCarContext);
  const [multipleDates, setMultipleDates] = useState([]);
  const [isNextPageValid, setIsNextPageValid] = useState(false);

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

  const loadDataFromContext = () => {
    setMultipleDates(formData.availableRevisionDates);
    if (multipleDates.length > 0) {
      setIsNextPageValid(true);
      return;
    }
    setIsNextPageValid(false);
  };

  const storeDatesAsString = (dates) => {
    let formattedDates = []
    dates.map((date) => {
      formattedDates.push(date.toLocaleDateString());
    });
    return formattedDates;
  }

  // When component is rendered
  useEffect(() => {
    setStep(7); // Set progress bar status

    loadDataFromContext();

    if (formData.quotationBaseValue == null) {
      navigate(MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.QUOTATION);
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
        {/* Buttons */}
        <FormHeader
            back={() => previousPage()}
            next={() => nextPage()}
            isNextPageValid={isNextPageValid}
            title={title}
        />
        <div className="px-5">
          <div className={"p-fluid grid"}>
            <div className="col-12 md:col-1 lg:col-2"></div>
            <div className="col-12 md:col-4 lg:col-3">
              <div className={"py-2 px-4 border-round bg-gray-300"}>
                <div>
                  <p className={"text-base"}>
                    Seleccioná las <strong>fechas estimadas</strong> donde vos
                    tengas tiempo libre para realizar la revisión de tu auto.
                  </p>
                </div>
                <div>
                  <p className={"text-base"}>
                    La misma será coordinada mas tarde por nuestro equipo con
                    datos de contacto.
                  </p>
                </div>
              </div>
            </div>
            <div className="field flex-wrap col-12 md:col-7 lg:col-5">
              <Calendar
                  value={multipleDates}
                  onChange={($event) => {
                    setFormData({
                      ...formData,
                      availableRevisionDates: $event.value,
                      revisionDates: storeDatesAsString($event.value)
                    });
                    setMultipleDates($event.value);
                    if ($event.value.length === 0) {
                      setIsNextPageValid(false);
                      return;
                    }
                    setIsNextPageValid(true);
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
            <div className="col-12 lg:col-2"></div>
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
