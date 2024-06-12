import axios from 'axios'
import { base_url, getConfig } from "../../utils/axiosConfig";

const getSlideshow = async () => {
    const response = await axios.get(`${base_url}Slideshows`, getConfig())
    if (response.data) {
        return response.data;
    }
}


const slideshowService = {
    getSlideshow,
}

export default slideshowService
