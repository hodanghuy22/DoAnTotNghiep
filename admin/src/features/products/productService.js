import axios from "axios"
import { base_url, config } from "../../utils/axiosConfig";

const getProducts = async () => {
  const response = await axios.get(`${base_url}Products`, config);
  if (response.data) {
    return response.data;
  }
}

const getProductsActive = async () => {
  const response = await axios.get(`${base_url}Products/Active`, config);
  if (response.data) {
    return response.data;
  }
}

const getProduct = async (id) => {
  const response = await axios.get(`${base_url}Products/${id}`);
  if (response.data) {
    return response.data;
  }
}

const createProduct = async (data) => {
  const response = await axios.post(`${base_url}Products`,data, config);
  if (response.data) {
    return response.data;
  }
}

const updateProduct = async (data) => {
  const response = await axios.put(`${base_url}Products/${data.id}`,data.data, config);
  if (response.data) {
    return response.data;
  }
}

const updateStatusProduct = async (data) => {
  const response = await axios.put(`${base_url}Products/UpdateStatusProduct/${data.id}/${data.status}`,"", config);
  if (response.data) {
    return response.data;
  }
}

const productService = {
  getProducts,
  createProduct,
  updateStatusProduct,
  getProduct,
  updateProduct,
  getProductsActive,
};

export default productService;