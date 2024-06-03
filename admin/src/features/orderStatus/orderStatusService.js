import axios from "axios"
import { base_url, getConfig } from "../../utils/axiosConfig";

const getOrderStatuses = async () => {
  const response = await axios.get(`${base_url}OrderStatus`, getConfig());
  if (response.data) {
    return response.data;
  }
}

const getOrderStatusesActive = async () => {
  const response = await axios.get(`${base_url}OrderStatus/Active`, getConfig());
  if (response.data) {
    return response.data;
  }
}

const getOrderStatus = async (id) => {
  const response = await axios.get(`${base_url}OrderStatus/${id}`, getConfig());
  if (response.data) {
    return response.data;
  }
}


const createOrderStatus = async (data) => {
  const response = await axios.post(`${base_url}OrderStatus`, data, getConfig());
  if (response.data) {
    return response.data;
  }
}

const updateStatusOrderStatus = async (data) => {
  const response = await axios.put(`${base_url}OrderStatus/UpdateStatusOrderStatus/${data.id}/${data.status}`, "", getConfig());
  if (response.data) {
    return response.data;
  }
}

const updateOrderStatus = async (data) => {
  const response = await axios.put(`${base_url}OrderStatus/${data.id}`, data.data, getConfig());
  if (response.data) {
    return response.data;
  }
}


const orderStatusService = {
  getOrderStatuses,
  createOrderStatus,
  updateStatusOrderStatus,
  getOrderStatus,
  updateOrderStatus,
  getOrderStatusesActive,
};

export default orderStatusService;