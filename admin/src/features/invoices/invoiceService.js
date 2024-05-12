import axios from "axios"
import { base_url, config } from "../../utils/axiosConfig";

const createInvoice = async(data) => {
  const response = await axios.post(`${base_url}Invoices`, data, config);
  if (response.data) {
    return response.data;
  }
}

const getInvoices = async() => {
  const response = await axios.get(`${base_url}Invoices`, config);
  if (response.data) {
    return response.data;
  }
}

const getImportInvoice = async(id) => {
  const response = await axios.get(`${base_url}Invoices/${id}`, config);
  if (response.data) {
    return response.data;
  }
}

const invoiceService = {
  createInvoice,
  getInvoices,
  getImportInvoice,
};

export default invoiceService;