import axios from "axios";

function UserService() {
  this.getDniInfo = async (dni, sex) => {
    try {
      return await axios.get(
          `${process.env.REACT_APP_TECHMO_API_URI}/user/dni?dni=${dni}&sex=${sex}`
      );
    } catch (err) {
      console.error(err);
    }
  };
}

export default UserService;
