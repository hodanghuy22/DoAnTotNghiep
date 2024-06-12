import axios from "axios"
import { base_url, getConfig } from "../../utils/axiosConfig";

const getOrderStatusActive = async() => {
  const response = await axios.get(`${base_url}OrderStatus/Active`, getConfig());
  if (response.data) {
    return response.data;
  }
}

const orderStatusService = {
  getOrderStatusActive,
};

export default orderStatusService;