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

const getInvoices = async(id) => {
  const response = await axios.get(`${base_url}Invoices/${id}`, getConfig());
  if (response.data) {
    return response.data;
  }
}

const getInvoicesByOrderType = async(data) => {
  const response = await axios.get(`${base_url}Invoices/GetInvoicesByStatus/${data.userId}/${data.orderType}`, getConfig());
  if (response.data) {
    return response.data;
  }
}

const cancelInvoice = async(id) => {
  const response = await axios.put(`${base_url}Invoices/CancelInvoiceForUser/${id}`,"", getConfig());
  if (response.data) {
    return response.data;
  }
}

const invoiceService = {
  createInvoice,
  getInvoices,
  getInvoicesByOrderType,
  getInvoice,
  cancelInvoice,
};

export default invoiceService;