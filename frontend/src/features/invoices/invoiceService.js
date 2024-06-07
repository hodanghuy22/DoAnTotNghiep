import axios from "axios"
import { base_url, getConfig } from "../../utils/axiosConfig";

const createInvoice = async(data) => {
  const response = await axios.post(`${base_url}Invoices`, data, getConfig());
  if (response.data) {
    return response.data;
  }
}

const getInvoice = async(id) => {
  const response = await axios.get(`${base_url}Invoices/GetInvoice/${id}`, getConfig());
  if (response.data) {
    return response.data;
  }
}

const invoiceService = {
  createInvoice,
  getInvoice,
  
};

export default invoiceService;