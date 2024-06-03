import axios from "axios"
import { base_url, getConfig } from "../../utils/axiosConfig";

const getLogs = async() => {
  const response = await axios.get(`${base_url}Logs`, getConfig());
  if (response.data) {
    return response.data;
  }
}

const logService = {
  getLogs,
};

export default logService;