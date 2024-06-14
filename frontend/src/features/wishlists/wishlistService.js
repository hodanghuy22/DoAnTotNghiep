import axios from 'axios'
import { base_url, getConfig } from "../../utils/axiosConfig";

const getWishlist = async () => {
    const response = await axios.get(`${base_url}Wishlists`, getConfig())
    if (response.data) {
        return response.data;
    }
}
const createWishlist = async (data) => {
    const response = await axios.post(`${base_url}Wishlists`,data,getConfig());
    if (response.data) {
        return response.data;
    }
}

const wishlistService = {
    getWishlist,
    createWishlist
}

export default wishlistService
