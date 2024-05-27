import axios from "axios"
import { base_url, config } from "../../utils/axiosConfig";

const getNotifications = async(id) => {
  const response = await axios.get(`${base_url}Notifications/${id}`);
  if (response.data) {
    return response.data;
  }
}

const getNotification = async(id) => {
  const response = await axios.get(`${base_url}Notifications/GetNotification/${id}`);
  if (response.data) {
    return response.data;
  }
}

const createNotification = async(data) => {
  const response = await axios.post(`${base_url}Notifications`, data, config);
  if (response.data) {
    return response.data;
  }
}

const updateNotification = async(data) => {
  const response = await axios.put(`${base_url}Notifications/${data.id}`, data.data, config);
  if (response.data) {
    return response.data;
  }
}
const notificationService = {
  getNotifications,
  getNotification,
  createNotification,
  updateNotification,
};

export default notificationService;