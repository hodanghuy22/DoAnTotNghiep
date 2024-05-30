import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import { base_url } from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';

const PayPalButton = ({ total }) => {
  const navigate = useNavigate()
  const initialOptions = {
    clientId: "AXz75IKhOGjTxPAo02lv7AiM4FsZTGRslhv05i04xtAX579-IqHDZeOM7Uwplp4IOVIkT5O_t1VstP-l",
  };
  const createOrder = async (data, actions, tien) => {
    try {
      const orderId = await axios.post(`${base_url}Paypals/create-payment`, {
        amount: tien,
      });
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
      console.log(mess);
      //alert(mess.data);
      if(mess.status === 200){
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
        forceReRender={[total]}
        createOrder={(data, actions) => {
          return createOrder(data, actions, total);
        }}
        onApprove={onApprove}
      />
    </PayPalScriptProvider>
    </>
  );
};

export default PayPalButton;