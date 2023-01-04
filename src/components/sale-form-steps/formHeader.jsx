import React from "react";
import { Button } from "primereact/button";

function FormHeader({ next, back, title, isNextPageValid }) {
  return (
    <>
      <div className="flex mx-3">
        <div className="flex-wrap sm:flex align-items-center justify-content-start hidden">
          <Button
            icon="pi pi-angle-left"
            className="p-button-rounded p-button-sm p-button-techmo "
            aria-label="Back"
            onClick={() => back()}
            label={"Atrás"}
          />
        </div>
        <div className="flex-1 sm:flex align-items-center justify-content-center hidden">
          <h2 className={"hidden sm:flex"}>{title}</h2>
        </div>
        <div className="flex-wrap sm:flex align-items-center justify-content-end hidden">
          <Button
            icon="pi pi-angle-right"
            className="p-button-rounded p-button-sm p-button-techmo"
            aria-label="Next"
            onClick={() => next()}
            disabled={!isNextPageValid}
            label={"Siguiente"}
          />
        </div>
        <div className="flex-1 flex align-items-center justify-content-center sm:hidden">
          <h3 className={"text-center"}>{title}</h3>
        </div>
      </div>
    </>
  );
}

export default FormHeader;
