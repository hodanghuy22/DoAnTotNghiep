import axios from "axios"
import { base_url,config } from "../../utils/axiosConfig";


const login = async(userData)=>{
    const response = await axios.post(`${base_url}Users/login`, userData);
    if(response.data){
        localStorage.setItem("customer", JSON.stringify(response.data));
        return response.data;
    }
}

const authService = {
    login
};

export default authService;