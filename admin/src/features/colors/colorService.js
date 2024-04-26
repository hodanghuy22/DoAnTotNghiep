import axios from "axios"
import { base_url,config } from "../../utils/axiosConfig";

const getColors = async()=>{
    const response = await axios.get(`${base_url}Colors`, config);
    if(response.data){
        return response.data;
    }
}

const getAColor = async(id)=>{
    const response = await axios.get(`${base_url}Colors/${id}`);
    if(response.data){
        return response.data;
    }
}

const createColor = async(colorData)=>{
    const response = await axios.post(`${base_url}Colors`, colorData, config);
    if(response.data){
        return response.data;
    }
}

const updateStatusColor = async(data)=>{
    const response = await axios.put(`${base_url}Colors/UpdateStatusColor/${data.id}/${data.status}`,"",config);
    if(response.data){
        return response.data;
    }
}

const updateColor = async(colorData)=>{
    const response = await axios.put(`${base_url}Colors/${colorData.id}`,colorData.colorData,config);
    if(response.data){
        return response.data;
    }
}

const colorService = {
    getColors,
    createColor,
    updateStatusColor,
    getAColor,
    updateColor,
};

export default colorService;