import React, { useEffect } from 'react'
import axios from 'axios'
import { base_url, getConfig } from '../../utils/axiosConfig'
import { useNavigate } from 'react-router-dom'

const PaymentProcess = () => {
  const navigate = useNavigate()
  const convertDateString = dateString => {
    if (typeof dateString !== 'string' || dateString.length !== 14) {
      return ''; // Trả về chuỗi rỗng nếu đầu vào không hợp lệ
    }
  
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
  
    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const data = {
      "bankCode" : urlParams.get('vnp_BankCode'),
      "bankTranNo" : urlParams.get('vnp_BankTranNo'),
      "transactionNo" : urlParams.get('vnp_TransactionNo'),
      "transactionStatus": urlParams.get('vnp_TransactionStatus'),
      "responseCode": urlParams.get('vnp_ResponseCode'),
      "orderInfo" : urlParams.get('vnp_OrderInfo'),
      "txnRef" : urlParams.get('vnp_TxnRef'),
      "amount" : urlParams.get('vnp_Amount'),
      "date" : convertDateString(urlParams.get('vnp_PayDate')),
      "paymentMethod" : "VNPAY"
    }
    console.log("data", data);
    const makeApiCall = async () => {
      try {
        const response = await axios.post(`${base_url}Invoices/HookPayment`, data, getConfig());
        console.log(response.data);
        const rs = response.data;
        if(rs?.isSuccess === true){
          navigate('/payment-success')
        }else{
          navigate('/payment-fail')
        }
      } catch (error) {
        console.error(error);
      }
    }

    makeApiCall();
  }, []);
  return (
    <div>PaymentProcess</div>
  )
}

export default PaymentProcess