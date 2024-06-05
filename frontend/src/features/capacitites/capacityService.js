import axios from "axios"
import { base_url, getConfig } from "../../utils/axiosConfig";

const getCapacities = async () => {
  const response = await axios.get(`${base_url}Capacities`, getConfig());
  if (response.data) {
    return response.data;
  }
}

const getCapacitiesShow = async () => {
  const response = await axios.get(`${base_url}Capacities/Show`, getConfig());
  if (response.data) {
    return response.data;
  }
}

const getCapacity = async (id) => {
  const response = await axios.get(`${base_url}Capacities/${id}`);
  if (response.data) {
    return response.data;
  }
}

const createCapacity = async (data) => {
  const response = await axios.post(`${base_url}Capacities`, data, getConfig());
  if (response.data) {
    return response.data;
  }
}

const updateStatusCapacity = async (capacityData) => {
  const response = await axios.put(`${base_url}Capacities/UpdateStatusCapacity/${capacityData.id}/${capacityData.status}`,"", getConfig());
  if (response.data) {
    return response.data;
  }
}

const updateCapacity = async (capacityData) => {
  const response = await axios.put(`${base_url}Capacities/${capacityData.id}`, capacityData.capacityData, getConfig());
  if (response.data) {
    return response.data;
  }
}

const getCapacityByProductId = async (id) => {
  const response = await axios.get(`${base_url}Capacities/GetCapacitiesByProductId/${id}`);
  if (response.data) {
    return response.data;
  }
}
const capacityService = {
  getCapacities,
  updateStatusCapacity,
  createCapacity,
  getCapacity,
  updateCapacity,
  getCapacitiesShow,
  getCapacityByProductId,
};

export default capacityService;