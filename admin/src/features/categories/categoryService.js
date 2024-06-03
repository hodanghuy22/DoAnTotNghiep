import axios from "axios"
import { base_url, getConfig } from "../../utils/axiosConfig";

const getCategories = async () => {
  const response = await axios.get(`${base_url}Categories`, getConfig());
  if (response.data) {
    return response.data;
  }
}

const getCategoriesShow = async () => {
  const response = await axios.get(`${base_url}Categories/Show`, getConfig());
  if (response.data) {
    return response.data;
  }
}

const getCategory = async (id) => {
  const response = await axios.get(`${base_url}Categories/${id}`);
  if (response.data) {
    return response.data;
  }
}

const createCategory = async (data) => {
  const response = await axios.post(`${base_url}Categories`, data, getConfig());
  if (response.data) {
    return response.data;
  }
}

const updateStatusCategory = async (data) => {
  const response = await axios.put(`${base_url}Categories/UpdateStatusCategory/${data.id}/${data.status}`,"", getConfig());
  if (response.data) {
    return response.data;
  }
}

const updateCategory = async (categoryData) => {
  const response = await axios.put(`${base_url}Categories/${categoryData.id}`, categoryData.data, getConfig());
  if (response.data) {
    return response.data;
  }
}


const categoryService = {
  getCategories,
  getCategory,
  createCategory,
  updateStatusCategory,
  updateCategory,
  getCategoriesShow,
};

export default categoryService;