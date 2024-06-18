import axios from "axios"
import { base_url, getConfig } from "../../utils/axiosConfig";

const getProducts = async () => {
  const response = await axios.get(`${base_url}Products`, getConfig());
  if (response.data) {
    return response.data;
  }
}

const getProductsActive = async () => {
  const response = await axios.get(`${base_url}Products/Active`, getConfig());
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
const getProductCategory = async (id) => {
  const response = await axios.get(`${base_url}Products/GetProductsActiveByCategory/${id}`);
  if (response.data) {
    return response.data;
  }
}

const getProductPopularByCategogy = async (data) => {
  const response = await axios.post(`${base_url}Products/GetPopularProductsByCategory/${data.id}`, data.data, getConfig());
  if (response.data) {
    return response.data;
  }
}
const getProductPopular = async (data) => {
  const response = await axios.post(`${base_url}Products/GetPopularProducts`,data, getConfig());
  if (response.data) {
    return response.data;
  }
}

const getProductsBestSeller = async (data) => {
  const response = await axios.post(`${base_url}Products/GetProductsBestSeller`,data, getConfig());
  if (response.data) {
    return response.data;
  }
}

const createProduct = async (data) => {
  const response = await axios.post(`${base_url}Products`,data, getConfig());
  if (response.data) {
    return response.data;
  }
}

const updateProduct = async (data) => {
  const response = await axios.put(`${base_url}Products/${data.id}`,data.data, getConfig());
  if (response.data) {
    return response.data;
  }
}

const getProductByBrand = async (id) => {
  const response = await axios.get(`${base_url}Products/GetProductsActiveByBrand/${id}`);
  if (response.data) {
    return response.data;
  }
}
const getSearchProduct = async (data) => {
  const response = await axios.get(`${base_url}Products/SearchProductByName/${data.searchQuery}`,data, getConfig());
  if (response.data) {
    return response.data;
  }
}

const updateStatusProduct = async (data) => {
  const response = await axios.put(`${base_url}Products/UpdateStatusProduct/${data.id}/${data.status}`,"", getConfig());
  if (response.data) {
    return response.data;
  }
}
const getProductByBrandCategory = async (data) => {
  const response = await axios.get(`${base_url}Products/GetProductsActiveByCategoryAndBrand/${data.categoryId }/$${data.brandId}`);
  if (response.data) {
    return response.data;
  }
}
const getProductForUser = async (data) => {
  const response = await axios.get(`${base_url}ProductDetails/GetAProductDetailForUser/${data.productId }/${data.colorId}/${data.capacityId}`);
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
  getProductsBestSeller,
  getProductCategory,
  getProductPopularByCategogy,
  getProductPopular,
  getProductByBrand,
  getSearchProduct,
  getProductByBrandCategory,
  getProductForUser
};

export default productService;