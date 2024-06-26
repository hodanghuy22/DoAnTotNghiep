import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import { base_url } from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CreateInvoice } from '../features/invoices/invoiceSlice';

const PayPalButton = ({ invoice }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const changeDateFormat = (date) => {
    try {
      const newDate = new Date(date).toLocaleDateString();
      const [month, day, year] = newDate.split("/");
      const formattedMonth = month.padStart(2, '0');
      return [year, formattedMonth, day].join("-");
    } catch (error) {
      console.error('Error while formatting date:', error);
      return ''; // Trả về giá trị mặc định hoặc xử lý khác tùy ý
    }
  };
  const convertUsdToVnd = (usd) => {
    return usd * 25000
  }
  const initialOptions = {
    clientId: "AXz75IKhOGjTxPAo02lv7AiM4FsZTGRslhv05i04xtAX579-IqHDZeOM7Uwplp4IOVIkT5O_t1VstP-l",
  };
  const createOrder = async (data, actions, tien) => {
    try {
      console.log("TIEN: ", tien);
      const orderId = await axios.post(`${base_url}Paypals/create-payment`, {
        amount: tien,
      });
      console.log(">>> order id: ", orderId.data);
      return orderId.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };

  const onApprove = async (data, actions) => {
    try {
      const { orderID } = data;
      const mess = await axios.post(`${base_url}Paypals/capture-order`, { orderId: orderID });
      if(mess.status === 200){
        const response = await axios.get(`${base_url}Paypals/GetOrderDetails/${orderID}`);
        const createdOrder = response.data;
        console.log("invoice ",invoice);
        console.log("createdOrder", createdOrder);
        const transaction = {
          transactionId : createdOrder?.purchase_units[0]?.payments?.captures[0]?.id,
          payPalOrderId : orderID,
          amount : convertUsdToVnd(createdOrder?.purchase_units[0]?.amount?.value),
          date : changeDateFormat(createdOrder.create_time),
        }
        console.log("transaction ", transaction);
        const newInvoice = { ...invoice, transaction };
        console.log("new Invoice ", newInvoice);
        await dispatch(CreateInvoice(newInvoice))
        navigate('/')
      }
    } catch (error) {
      console.error('Error in onApprove:', error);
      throw error;
    }
  };
  return (
    <>
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        style={{
          layout: 'horizontal',
          shape: "pill",
          tagline: false,
        }}
        forceReRender={[invoice]}
        createOrder={(data, actions) => {
          return createOrder(data, actions, invoice?.totalPriceAfterDiscount);
        }}
        onApprove={onApprove}
      />
    </PayPalScriptProvider>
    </>
  );
};

export default PayPalButton;