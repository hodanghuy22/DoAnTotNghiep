import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { base_url, getConfig } from '../../utils/axiosConfig'
import { useNavigate } from 'react-router-dom'
import Loading from '../../utils/Loading'

const PaymentProcess = () => {
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(true);

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
    setLoading(true);
    const urlParams = new URLSearchParams(window.location.search);
    const data = {
      "bankCode": urlParams.get('vnp_BankCode'),
      "bankTranNo": urlParams.get('vnp_BankTranNo'),
      "transactionNo": urlParams.get('vnp_TransactionNo'),
      "transactionStatus": urlParams.get('vnp_TransactionStatus'),
      "responseCode": urlParams.get('vnp_ResponseCode'),
      "orderInfo": urlParams.get('vnp_OrderInfo'),
      "txnRef": urlParams.get('vnp_TxnRef'),
      "amount": urlParams.get('vnp_Amount'),
      "date": convertDateString(urlParams.get('vnp_PayDate')),
      "paymentMethod": "VNPAY"
    }
    const makeApiCall = async () => {
      try {
        const response = await axios.post(`${base_url}Invoices/HookPayment`, data, getConfig());
        const rs = response.data;
        console.log(rs);

        if (rs?.isSuccess === true) {
          localStorage.removeItem('cartQuantity');
          navigate(`/trang-ca-nhan/order-list/detail/${rs?.data.id}?status=Thành Công`)
        } else {
          navigate('/payment-fail')
        }
      } catch (error) {
        console.error(error);
      }
    }

    makeApiCall();
    setLoading(false);
  }, []);
  return (
    <>
      <div>PaymentProcess</div>
      {/* Hiển thị Loading nếu đang tải dữ liệu */}
      {isLoading && <Loading />}
      {/* Nội dung chính của ứng dụng sau khi tải xong */}
      {!isLoading && (
        <div>
        </div>
      )}
    </>
  )
}

export default PaymentProcess