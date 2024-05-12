import axios from "axios"
import { base_url, config } from "../../utils/axiosConfig";

const createCoupon = async(data) => {
  const response = await axios.post(`${base_url}Coupons`, data, config);
  if (response.data) {
    return response.data;
  }
}

const getCoupons = async() => {
  const response = await axios.get(`${base_url}Coupons`, config);
  if (response.data) {
    return response.data;
  }
}

const getCouponsActive = async() => {
  const response = await axios.get(`${base_url}Coupons/GetCouponsActive`);
  if (response.data) {
    return response.data;
  }
}

const getCoupon = async(id) => {
  const response = await axios.get(`${base_url}Coupons/${id}`);
  if (response.data) {
    return response.data;
  }
}

const updateStatusCoupon = async(data) => {
  const response = await axios.put(`${base_url}Coupons/UpdateStatusCoupon/${data.id}/${data.status}`, "", config);
  if (response.data) {
    return response.data;
  }
}

const updateCoupon = async(data) => {
  const response = await axios.put(`${base_url}Coupons/${data.id}`, data.couponData, config);
  if (response.data) {
    return response.data;
  }
}

const couponService = {
  createCoupon,
  getCoupons,
  updateStatusCoupon,
  getCoupon,
  updateCoupon,
  getCouponsActive,
};

export default couponService;