import axios from 'axios'
import { base_url, getConfig } from "../../utils/axiosConfig";

const checkCoupon = async (data) => {
    const response = await axios.post(`${base_url}Coupons/CheckCoupon`,data, getConfig())
    if (response.data) {
        return response.data;
    }
}
const getCoupon = async () => {
  const response = await axios.get(`${base_url}Coupons/GetCouponsActive`, getConfig())
  if (response.data) {
      return response.data;
  }
}

const couponService = {
  checkCoupon,
  getCoupon
}

export default couponService
