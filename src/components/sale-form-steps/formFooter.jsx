import React from "react";
import { Button } from "primereact/button";

function FormHeader({ next, back, isNextPageValid }) {
  return (
    <>
      <div className="flex m-3">
        <div className="flex-1 flex align-items-center justify-content-end sm:hidden mr-2">
          <Button
            icon="pi pi-angle-left"
            className="p-button-rounded p-button-sm p-button-techmo "
            aria-label="Back"
            onClick={() => back()}
            label={"Atrás"}
          />
        </div>
        <div className="flex-1 flex align-items-center justify-content-start sm:hidden ml-2">
          <Button
            icon="pi pi-angle-right"
            className="p-button-rounded p-button-sm p-button-techmo"
            aria-label="Next"
            onClick={() => next()}
            disabled={!isNextPageValid}
            label={"Siguiente"}
          />
        </div>
      </div>
    </>
  );
}

export default FormHeader;
