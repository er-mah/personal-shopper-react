import axios from "axios";

function PersonalShopperService() {

  this.persistDeal = async (formData) => {
    try {
      return axios.post(`${process.env.REACT_APP_TECHMO_API_URI}/personal-shopper/persist-deal`, formData);
    } catch (err) {
      console.error(err);
    }
  };

  this.addRevisionDatesToDeal = async (revisionDatesPayload, dealId) => {
    try {
      return axios.post(`${process.env.REACT_APP_TECHMO_API_URI}/personal-shopper/${dealId}/revision-dates`, revisionDatesPayload);
    } catch (err) {
      console.error(err);
    }
  };

  this.addSaleTypeToDeal = async (saleTypePayload, dealId) => {
    try {
      return axios.post(`${process.env.REACT_APP_TECHMO_API_URI}/personal-shopper/${dealId}/sale-type`, saleTypePayload);
    } catch (err) {
      console.error(err);
    }
  };

  this.deleteDeal = async (dealId) => {
    try {
      return axios.delete(`${process.env.REACT_APP_TECHMO_API_URI}/personal-shopper/${dealId}`);
    } catch (err) {
      console.error(err);
    }
  }
}

export default PersonalShopperService;
