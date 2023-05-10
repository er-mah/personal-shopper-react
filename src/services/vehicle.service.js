import axios from "axios";

function VehicleService() {
  this.getBrands = async () => {
    try {
      return axios.get(
        `${process.env.REACT_APP_TECHMO_API_URI}/vehicle/brands`
      );
    } catch (err) {
      console.error(err);
    }
  };

  this.getYears = (brandId) => {
    try {
      return axios.get(
        `${process.env.REACT_APP_TECHMO_API_URI}/vehicle/years?brandId=${brandId}`
      );
    } catch (err) {
      console.error(err);
    }
  };

  this.getModels = async (brandId, year) => {
    try {
      return axios.get(
        `${process.env.REACT_APP_TECHMO_API_URI}/vehicle/models?brandId=${brandId}&year=${year}`
      );
    } catch (err) {
      console.error(err);
    }
  };

  this.getVersions = async (brandId, year, modelId) => {
    try {
      return axios.get(
        `${process.env.REACT_APP_TECHMO_API_URI}/vehicle/versions?brandId=${brandId}&year=${year}&modelId=${modelId}`
      );
    } catch (err) {
      console.error(err);
    }
  };

  this.getDetailedInfo = async (versionId) => {
    try {
      return axios.get(
        `${process.env.REACT_APP_TECHMO_API_URI}/vehicle/${versionId}/details`
      );
    } catch (err) {
      console.error(err);
    }
  };

  this.getQuotation = async (payload) => {
    try {
      return await axios.post(
        `${process.env.REACT_APP_TECHMO_API_URI}/vehicle/price`,
        payload
      );
    } catch (err) {
      console.error(err);
    }
  };

  this.getBasePrices = async (vehicleType, codia) => {
    try {
      return axios
        .get(
          `${process.env.REACT_APP_TECHMO_API_URI}/vehicle/prices/${vehicleType}/${codia}/details`
        )
        .catch(e => {
          if (e.message === "Request failed with status code 404") {
            alert("no se encontraron precios");
          }
        });
    } catch (err) {
      console.error(err);
    }
  };
}

export default VehicleService;
