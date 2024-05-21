import axios from "axios"
import { base_url,config } from "../../utils/axiosConfig";


const login = async(userData)=>{
    const response = await axios.post(`${base_url}Users/login`, userData);
    if(response.data){
        localStorage.setItem("customer", JSON.stringify(response.data));
        return response.data;
    }
}

const registerAdmin = async(userData)=>{
    const response = await axios.post(`${base_url}Users/register-admin`, userData);
    if(response.data){
        return response.data;
    }
}

const getAllUsers = async()=>{
    const response = await axios.get(`${base_url}Users/GetAllUser`, config);
    if(response.data){
        return response.data;
    }
}

const countUser = async()=>{
    const response = await axios.get(`${base_url}Users/CountUser`, config);
    if(response.data){
        return response.data;
    }
}

const authService = {
    login,
    registerAdmin,
    getAllUsers,
    countUser,
};

export default authService;