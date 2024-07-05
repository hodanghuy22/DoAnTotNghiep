import axios from "axios"
import { base_url, getConfig } from "../../utils/axiosConfig";

const getAllNoti = async (userId) => {
  const response = await axios.get(`${base_url}Notifications/${userId}`, getConfig());
  if (response.data) {
    return response.data;
  }
}

const getTop5Noti = async (userId) => {
  const response = await axios.get(`${base_url}Notifications/GetTop5NotificationsForUser/${userId}`, getConfig());
  if (response.data) {
    return response.data;
  }
}

const notificationService = {
  getAllNoti,
  getTop5Noti,
};

export default notificationService;