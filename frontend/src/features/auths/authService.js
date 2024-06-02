import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const login = async(userData)=>{
    const response = await axios.post(`${base_url}Users/login`, userData);
    if(response.data){
        localStorage.setItem("customer", JSON.stringify(response.data));
        return response.data;
    }
}

const register = async(userData)=>{
  const response = await axios.post(`${base_url}Users/register`, userData);
  if(response.data){
      return response.data;
  }
}

const getAUser = async(id)=>{
  const response = await axios.get(`${base_url}Users/${id}`, config);
  if(response.data){
      return response.data;
  }
}

const updateUser = async(userData) => {
  console.log(userData);
  console.log("config", config);
  const response = await axios.put(`${base_url}Users/${userData.id}`, userData.data, config);
  if(response.data){
    localStorage.setItem("customer", JSON.stringify(response.data));
    return response.data;
  }
}

const authService = {
  login,
  register,
  updateUser,
  getAUser,
};

export default authService;