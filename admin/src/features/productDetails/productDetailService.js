import axios from "axios"
import { base_url, config } from "../../utils/axiosConfig";

const createProductDetail = async (data) => {
  const response = await axios.post(`${base_url}ProductDetails`,data, config);
  if (response.data) {
    return response.data;
  }
}

const getProductDetais = async () => {
  const response = await axios.get(`${base_url}ProductDetails`);
  if (response.data) {
    return response.data;
  }
}

const updateStatusProductDetail = async (data) => {
  const response = await axios.put(`${base_url}ProductDetails/UpdateStatusProductDetail/${data.id}/${data.status}`, "", config);
  if (response.data) {
    return response.data;
  }
}

const productDetailService = {
  createProductDetail,
  getProductDetais,
  updateStatusProductDetail,
};

export default productDetailService;