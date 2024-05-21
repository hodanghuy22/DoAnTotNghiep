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

const countInvoicesByMonth = async(data) => {
  const response = await axios.get(`${base_url}Invoices/CountInvoicesByMonth/${data.month}/${data.year}`, config);
  if (response.data) {
    return response.data;
  }
}

const countCancelInvoicesByMonth = async(data) => {
  const response = await axios.get(`${base_url}Invoices/CountCancelInvoicesByMonth/${data.month}/${data.year}`, config);
  if (response.data) {
    return response.data;
  }
}

const revenueByMonth = async(data) => {
  const response = await axios.get(`${base_url}Invoices/RevenueByMonth/${data.month}/${data.year}`, config);
  if (response.data) {
    return response.data;
  }
}

const revenueAfterDiscountByMonth = async(data) => {
  const response = await axios.get(`${base_url}Invoices/RevenueAfterDiscountByMonth/${data.month}/${data.year}`, config);
  if (response.data) {
    return response.data;
  }
}

const getInvoice = async(id) => {
  const response = await axios.get(`${base_url}Invoices/GetInvoice/${id}`, config);
  if (response.data) {
    return response.data;
  }
}

const updateStatusInvoice = async(data) => {
  const response = await axios.put(`${base_url}Invoices/UpdateStatusInvoice/${data.id}/${data.status}`, "", config);
  if (response.data) {
    return response.data;
  }
}

const invoiceService = {
  createInvoice,
  getInvoices,
  getInvoice,
  countInvoicesByMonth,
  countCancelInvoicesByMonth,
  updateStatusInvoice,
  revenueByMonth,
  revenueAfterDiscountByMonth,
};

export default invoiceService;