import axios from "axios"
import { base_url } from "../../utils/axiosConfig";

const uploadImage = async(data) => {
  const formData = new FormData();
  formData.append('file', data[0]);
  const response = await axios.post(`${base_url}UploadPhotos`, formData);
  if (response.data) {
    return response.data;
  }
}

const deleteImage = async(id) => {
  const response = await axios.delete(`${base_url}UploadPhotos/${id}`);
  if (response.data) {
    return response.data;
  }
}

const uploadService = {
  uploadImage,
  deleteImage
};

export default uploadService;