import axios from "axios"
import { base_url, config } from "../../utils/axiosConfig";

const createImportInvoice = async(data) => {
  const response = await axios.post(`${base_url}ImportInvoices`, data, config);
  if (response.data) {
    return response.data;
  }
}

const getImportInvoices = async() => {
  const response = await axios.get(`${base_url}ImportInvoices`, config);
  if (response.data) {
    return response.data;
  }
}

const importInvoiceService = {
  createImportInvoice,
  getImportInvoices,
};

export default importInvoiceService;