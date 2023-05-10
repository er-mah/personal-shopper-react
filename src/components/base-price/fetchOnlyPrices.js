import { useState } from "react";
import VehicleService from "../../services/vehicle.service";

export const FetchInfoAutoPrices = ({ codia }) => {
  let vehicleService = new VehicleService();

  const [basePrices, setBasePrices] = useState([]);
  const [usedVehicle, setUsedVehicle] = useState(false);

  const handleCheckboxChange = (event) => {
    setBasePrices(null);
    setUsedVehicle(event.target.checked);
  };

  const handleButtonClick = async () => {
    let response = [];
    if (!usedVehicle) {
      response = await vehicleService.getBasePrices("new-vehicle", codia);
    } else {
      response = await vehicleService.getBasePrices("used-vehicle", codia);
    }
    console.log(response.data.data);

    setBasePrices(response.data.data);
  };

  return (
    <>
      <div className="p-fluid grid mx-3 mt-2">
        <div className="field col-6 sm:col-3">
          <label htmlFor="used-vehicle" className="inline-flex items-center">
            <input
              id="used-vehicle"
              type="checkbox"
              checked={usedVehicle}
              onChange={handleCheckboxChange}
              className="w-5 h-5 mr-2 text-indigo-600 border-gray-300 rounded"
            />
            <span className="text-gray-700">Vehículo usado</span>
          </label>
        </div>
        <div className="field col-6 sm:col-3 ">
          <button
            onClick={handleButtonClick}
            className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700"
          >
            Obtener datos
          </button>
        </div>

        <div className="field col-12 sm:col-6 ">
          {usedVehicle && basePrices ? (
            <>
              <h3>Listado de precios de usados</h3>
              <table className="table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Año</th>
                    <th className="px-4 py-2">Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {basePrices.map((item, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{item.year}</td>
                      <td className="border px-4 py-2">$ {item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <></>
          )}
          {!usedVehicle && basePrices ? (
            <>
              <h3>Precio OKM: $ {basePrices[0].list_price}</h3>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
