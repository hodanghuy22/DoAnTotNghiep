import axios from "axios"
import { base_url, config } from "../../utils/axiosConfig";

const getBrands = async () => {
  const response = await axios.get(`${base_url}Brands`, config);
  if (response.data) {
    return response.data;
  }
}

const getBrandsShow = async () => {
  const response = await axios.get(`${base_url}Brands/Show`);
  if (response.data) {
    return response.data;
  }
}

const getABrand = async (id) => {
  const response = await axios.get(`${base_url}Brands/${id}`);
  if (response.data) {
    return response.data;
  }
}

const createBrand = async (BrandData) => {
  const response = await axios.post(`${base_url}Brands`, BrandData, config);
  if (response.data) {
    return response.data;
  }
}

const updateStatusBrand = async (data) => {
  const response = await axios.put(`${base_url}Brands/UpdateStatusBrand/${data.id}/${data.status}`,"",config);
  if (response.data) {
    return response.data;
  }
}

const updateBrand = async (BrandData) => {
  const response = await axios.put(`${base_url}Brands/${BrandData.id}`, BrandData.data, config);
  if (response.data) {
    return response.data;
  }
}
const brandService = {
  getBrands,
  getABrand,
  createBrand,
  updateStatusBrand,
  updateBrand,
  getBrandsShow,
};

export default brandService;