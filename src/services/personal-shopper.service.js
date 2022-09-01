import axios from "axios";

function PersonalShopperService() {

  this.persistForm = async (formData) => {
    try {
      return axios.post(`${process.env.REACT_APP_MAH_URI}/personal-shopper/persist-form`, formData);
    } catch (err) {
      console.error(err);
    }
  };
}

export default PersonalShopperService;
