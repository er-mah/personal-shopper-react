import axios from "axios";

function VecicleService() {
  this.getBrands = async () => {
    try {
      return axios.get(`${process.env.REACT_APP_MAH_URI}/vehicle/brands`);
    } catch (err) {
      console.error(err);
    }


  };

  this.getYears = (brandId) => {
    try {
      return axios.get(
          `${process.env.REACT_APP_MAH_URI}/vehicle/years?brandId=${brandId}`
      );
    } catch (err) {
      console.error(err);
    }

  };

  this.getModels = async (brandId, year) => {
    try {
      return axios.get(
          `${process.env.REACT_APP_MAH_URI}/vehicle/models?brandId=${brandId}&year=${year}`
      );
    } catch (err) {
      console.error(err);
    }


  };

  this.getVersions = async (brandId, year, modelId) => {
    try {
      return axios.get(
          `${process.env.REACT_APP_MAH_URI}/vehicle/versions?brandId=${brandId}&year=${year}&modelId=${modelId}`
      );
    } catch (err) {
      console.error(err);
    }


  };

  this.getDetailedInfo = async (versionId) => {
    try {
      return axios.get(
          `${process.env.REACT_APP_MAH_URI}/vehicle/${versionId}/details`
      );
    } catch (err) {
      console.error(err);
    }
  };

  this.getQuotation = async (payload) => {
    try {
      return await axios.post(
        `${process.env.REACT_APP_MAH_URI}/vehicle/price`,
        payload
      );
    } catch (err) {
      console.error(err);
    }
  };
}

export default VecicleService;
