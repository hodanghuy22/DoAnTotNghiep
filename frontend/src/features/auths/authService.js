import axios from "axios";
import { base_url, getConfig } from "../../utils/axiosConfig";

const login = async (userData) => {
  const response = await axios.post(`${base_url}Users/login`, userData);
  if (response.data) {
    localStorage.setItem("customer", JSON.stringify(response.data));
    return response.data;
  }
}

const register = async (userData) => {
  const response = await axios.post(`${base_url}Users/register`, userData);
  if (response.data) {
    return response.data;
  }
}

const forgotPassword = async (data) => {
  const response = await axios.post(`${base_url}Users/ForgotPassword`, data);
  if (response.data) {
    return response.data;
  }
}

const resetPassword = async (data) => {
  console.log(data);
  const response = await axios.post(`${base_url}Users/ResetPassword`, data);
  if (response.data) {
    return response.data;
  }
}


const getAUser = async (id) => {
  const response = await axios.get(`${base_url}Users/${id}`, getConfig());
  if (response.data) {
    return response.data;
  }
}

const updateUser = async (userData) => {
  const response = await axios.put(`${base_url}Users/${userData.id}`, userData.data, getConfig());
  if (response.data) {
    return response.data;
  }
}

const changePassword = async (data) => {
  const response = await axios.put(`${base_url}Users/ChangePassword/${data.id}`, data.data, getConfig());
  if (response.data) {
    return response.data;
  }
}

const authService = {
  login,
  register,
  updateUser,
  getAUser,
  changePassword,
  forgotPassword,
  resetPassword,
};

export default authService;