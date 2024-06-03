import axios from "axios"
import { base_url, getConfig } from "../../utils/axiosConfig";

const createProductDetail = async (data) => {
  const response = await axios.post(`${base_url}ProductDetails`,data, getConfig());
  if (response.data) {
    return response.data;
  }
}

const getProductDetails = async () => {
  const response = await axios.get(`${base_url}ProductDetails`);
  if (response.data) {
    return response.data;
  }
}

const getProductDetailsActive = async () => {
  const response = await axios.get(`${base_url}ProductDetails/Active`);
  if (response.data) {
    return response.data;
  }
}

const getProductDetail = async (id) => {
  const response = await axios.get(`${base_url}ProductDetails/${id}`, getConfig());
  if (response.data) {
    return response.data;
  }
}

const updateStatusProductDetail = async (data) => {
  const response = await axios.put(`${base_url}ProductDetails/UpdateStatusProductDetail/${data.id}/${data.status}`, "", getConfig());
  if (response.data) {
    return response.data;
  }
}

const updateProductDetail = async (data) => {
  const response = await axios.put(`${base_url}ProductDetails/${data.id}`, data.productDetailData, getConfig());
  if (response.data) {
    return response.data;
  }
}

const productDetailService = {
  createProductDetail,
  getProductDetails,
  updateStatusProductDetail,
  getProductDetail,
  updateProductDetail,
  getProductDetailsActive,
};

export default productDetailService;