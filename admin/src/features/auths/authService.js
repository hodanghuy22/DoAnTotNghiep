import axios from "axios"
import { base_url, getConfig } from "../../utils/axiosConfig";

const login = async(userData)=>{
    const response = await axios.post(`${base_url}Users/login`, userData);
    if(response.data){
        localStorage.setItem("customer", JSON.stringify(response.data));
        return response.data;
    }
}

const registerAdmin = async(userData)=>{
    const response = await axios.post(`${base_url}Users/register-admin`, userData, getConfig());
    if(response.data){
        return response.data;
    }
}


const getTopUser = async(data)=>{
    const response = await axios.post(`${base_url}Users/GetTopUser`, data, getConfig());
    if(response.data){
        return response.data;
    }
}


const getAllUsers = async()=>{
    const response = await axios.get(`${base_url}Users/GetAllUser`, getConfig());
    if(response.data){
        return response.data;
    }
}

const countUser = async()=>{
    const response = await axios.get(`${base_url}Users/CountUser`, getConfig());
    if(response.data){
        return response.data;
    }
}

const statisticUserOfYear = async(data)=>{
    const response = await axios.get(`${base_url}Users/StatisticUserOfYear/${data.year}`, getConfig());
    if(response.data){
        return response.data;
    }
}

const authService = {
    login,
    registerAdmin,
    getAllUsers,
    countUser,
    statisticUserOfYear,
    getTopUser,
};

export default authService;