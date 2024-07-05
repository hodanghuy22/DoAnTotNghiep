import axios from "axios"
import { base_url, getConfig } from "../../utils/axiosConfig";

const getColors = async () => {
    const response = await axios.get(`${base_url}Colors`, getConfig());
    if (response.data) {
        return response.data;
    }
}

const getColorsShow = async () => {
    const response = await axios.get(`${base_url}Colors/Show`, getConfig());
    if (response.data) {
        return response.data;
    }
}

const getAColor = async (id) => {
    const response = await axios.get(`${base_url}Colors/${id}`, getConfig());
    if (response.data) {
        return response.data;
    }
}
const getColorByProductId = async (id) => {
    const response = await axios.get(`${base_url}Colors/GetColorByProductId/${id}`);
    if (response.data) {
        return response.data;
    }
}
const createColor = async (colorData) => {
    const response = await axios.post(`${base_url}Colors`, colorData, getConfig());
    if (response.data) {
        return response.data;
    }
}

const updateStatusColor = async (data) => {
    const response = await axios.put(`${base_url}Colors/UpdateStatusColor/${data.id}/${data.status}`, "", getConfig());
    if (response.data) {
        return response.data;
    }
}

const updateColor = async (colorData) => {
    const response = await axios.put(`${base_url}Colors/${colorData.id}`, colorData.colorData, getConfig());
    if (response.data) {
        return response.data;
    }
}

const colorService = {
    getColors,
    createColor,
    updateStatusColor,
    getAColor,
    updateColor,
    getColorsShow,
    getColorByProductId,
};

export default colorService;