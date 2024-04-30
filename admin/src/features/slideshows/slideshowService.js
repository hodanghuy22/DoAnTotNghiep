import axios from "axios"
import { base_url,config } from "../../utils/axiosConfig";

const getSlideShows = async()=>{
    const response = await axios.get(`${base_url}Slideshows/Admin`);
    if(response.data){
        return response.data;
    }
}

const getASlideShow = async(id)=>{
    const response = await axios.get(`${base_url}Slideshows/${id}`);
    if(response.data){
        return response.data;
    }
}

const createSlideShow = async(SlideShowData)=>{
    const response = await axios.post(`${base_url}Slideshows`, SlideShowData, config);
    if(response.data){
        return response.data;
    }
}

const deleteSlideShow = async(id)=>{
    const response = await axios.delete(`${base_url}Slideshows/${id}`,config);
    if(response.data){
        return response.data;
    }
}

const updateSlideShow = async(id)=>{
    const response = await axios.put(`${base_url}Slideshows/${id}`, "",config);
    if(response.data){
        return response.data;
    }
}

const updateStatusSlideShow = async(data)=>{
    const response = await axios.put(`${base_url}Slideshows/UpdateStatusSlideshow/${data.id}/${data.status}`, "",config);
    if(response.data){
        return response.data;
    }
}
const slideshowService = {
    getSlideShows,
    createSlideShow,
    deleteSlideShow,
    getASlideShow,
    updateSlideShow,
    updateStatusSlideShow,
};

export default slideshowService;