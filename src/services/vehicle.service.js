import axios from "axios";

function VecicleService() {
  this.getBrands = async () => {
    return axios.get(`${process.env.REACT_APP_MAH_URI}/vehicle/brands`);
  };

  this.getYears = (brandId) => {
    return axios.get(
      `${process.env.REACT_APP_MAH_URI}/vehicle/years?brandId=${brandId}`
    );
  };

  this.getModels = async (brandId, year) => {
    return axios.get(
      `${process.env.REACT_APP_MAH_URI}/vehicle/models?brandId=${brandId}&year=${year}`
    );
  };

  this.getVersions = async (brandId, year, modelId) => {
    return axios.get(
      `${process.env.REACT_APP_MAH_URI}/vehicle/versions?brandId=${brandId}&year=${year}&modelId=${modelId}`
    );
  };

  this.getDetailedInfo = async (versionId) => {
    return axios.get(
      `${process.env.REACT_APP_MAH_URI}/vehicle/${versionId}/details`
    );
  };

  this.getQuotation = async (payload) => {
    console.log("get quotation")
    try {
      const resp = await axios.post(`${process.env.REACT_APP_MAH_URI}/vehicle/price`, payload);
      console.log(resp.data);
      return resp;
    } catch (err) {
      console.error(err);
    }
  };
}

export default VecicleService;
