import axios from "axios"
import { base_url, config } from "../../utils/axiosConfig";

const createSupplier = async(data) => {
  const response = await axios.post(`${base_url}Suppliers`, data, config);
  if (response.data) {
    return response.data;
  }
}

const getSuppliers = async() => {
  const response = await axios.get(`${base_url}Suppliers`, config);
  if (response.data) {
    return response.data;
  }
}

const getSuppliersActive = async() => {
  const response = await axios.get(`${base_url}Suppliers/Active`, config);
  if (response.data) {
    return response.data;
  }
}

const getSupplier = async(id) => {
  const response = await axios.get(`${base_url}Suppliers/${id}`, config);
  if (response.data) {
    return response.data;
  }
}

const updateStatusSupplier = async(data) => {
  const response = await axios.put(`${base_url}Suppliers/UpdateStatusSupplier/${data.id}/${data.status}`, "", config);
  if (response.data) {
    return response.data;
  }
}

const updateSupplier = async(data) => {
  const response = await axios.put(`${base_url}Suppliers/${data.id}`, data.data, config);
  if (response.data) {
    return response.data;
  }
}


const supplierService = {
  createSupplier,
  getSuppliers,
  updateStatusSupplier,
  getSupplier,
  updateSupplier,
  getSuppliersActive,
};

export default supplierService;