import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import { base_url } from '../utils/axiosConfig';

const PayPalButton = ({ amount }) => {
  const initialOptions = {
    clientId: "AXz75IKhOGjTxPAo02lv7AiM4FsZTGRslhv05i04xtAX579-IqHDZeOM7Uwplp4IOVIkT5O_t1VstP-l",
  };

  const createOrder = async (data, actions) => {
    try {
      // Create order via your backend or directly with PayPal
      const orderId = await axios.post(`${base_url}Paypals/create-payment`);
      console.log("Order ID created:", orderId.data);
      return orderId.data; // Return the order ID to PayPal
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const onApprove = async (data, actions) => {
    try {
      const { orderID } = data;
      console.log("Order approved with ID:", orderID);
      await axios.post(`${base_url}Paypals/capture-order`, { orderId: orderID });
    } catch (error) {
      console.error('Error in onApprove:', error);
      throw error;
    }
  };
  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        style={{
          layout: 'horizontal',
          shape: "pill",
          tagline: false,
        }}
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;