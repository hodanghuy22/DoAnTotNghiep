import axios from "axios"
import { base_url, getConfig } from "../../utils/axiosConfig";

const createInvoice = async(data) => {
  const response = await axios.post(`${base_url}Invoices`, data, getConfig());
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

const invoiceService = {
  createInvoice,
  getInvoices,
  getInvoicesByOrderType,
};

export default invoiceService;