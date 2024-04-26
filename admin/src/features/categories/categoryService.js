import axios from "axios"
import { base_url, config } from "../../utils/axiosConfig";

const getCategories = async () => {
  const response = await axios.get(`${base_url}Categories`, config);
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
  const response = await axios.post(`${base_url}Categories`, data, config);
  if (response.data) {
    return response.data;
  }
}

const updateStatusCategory = async (data) => {
  const response = await axios.put(`${base_url}Categories/UpdateStatusCategory/${data.id}/${data.status}`,"", config);
  if (response.data) {
    return response.data;
  }
}

const updateCategory = async (categoryData) => {
  const response = await axios.put(`${base_url}Categories/${categoryData.id}`, categoryData.data, config);
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
};

export default categoryService;