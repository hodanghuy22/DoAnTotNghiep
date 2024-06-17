import axios from 'axios'
import { base_url, getConfig } from '../../utils/axiosConfig';

const GetCommentByProId = async (id) => {
    const response = await axios.get(`${base_url}Comments/GetComments/${id}`)
    if (response.data) {
        return response.data;
    }
}

const createComment = async (data) => {
    const response = await axios.post(`${base_url}Comments`, data, getConfig())
    if (response.data) {
        return response.data;
    }
}

const commentService = {
    GetCommentByProId,
    createComment,
}

export default commentService
