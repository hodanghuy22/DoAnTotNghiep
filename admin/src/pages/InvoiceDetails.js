import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { GetInvoice } from '../features/invoices/invoiceSlice';
import { Table } from 'antd';

const columns = [
  {
    title: <h5 className='fw-bold'>Id</h5>,
    dataIndex: 'id',
  },
  {
    title: <h5 className='fw-bold'>Product</h5>,
    dataIndex: 'product',
  },
  {
    title: <h5 className='fw-bold'>Details</h5>,
    dataIndex: 'details',
  },
  {
    title: <h5 className='fw-bold'>Quantity</h5>,
    dataIndex: 'quantity',
  },
  {
    title: <h5 className='fw-bold'>Price</h5>,
    dataIndex: 'price',
  },
];

const InvoiceDetails = () => {
  const dispatch = useDispatch();
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
  const location = useLocation();
  const getInvoiceId = location.pathname.split("/")[3];

  const invoiceState = useSelector(state => state.invoice?.invoice);

  useEffect(() => {
    if (getInvoiceId !== undefined) {
      dispatch(GetInvoice(getInvoiceId))
    }
  }, [getInvoiceId, dispatch])

  const data1 = [];
  for (let i = 0; i < invoiceState?.invoiceDetails?.length; i++) {
    data1.push({
      key: i,
      id: invoiceState?.invoiceDetails[i]?.id,
      product: invoiceState?.invoiceDetails[i]?.productDetail?.product?.name,
      details: invoiceState?.invoiceDetails[i]?.productDetail?.capacity?.totalCapacity + " " + invoiceState?.invoiceDetails[i]?.productDetail?.color?.colorName,
      quantity: invoiceState?.invoiceDetails[i].quantity,
      price: invoiceState?.invoiceDetails[i].price,
    });
  }
  return (
    <>
      <div className='container-fuild'>
        <div className='row border rounded-3 bg-white p-3 mb-3'>
          <h3>Thông tin hóa đơn</h3>
          <div className='col-4'>
            <p>Mã hóa đơn: <strong>{invoiceState?.id}</strong></p>
            <p>Tổng tiền: <strong>{invoiceState?.totalPrice}</strong></p>
            <p>Tổng tiền sau chiết khấu: <strong>{invoiceState?.totalPriceAfterDiscount}</strong></p>
          </div>
          <div className='col-4'>
            <p>Ngày đặt hóa đơn: <strong>{changeDateFormat(invoiceState?.issueDate)}</strong></p>
            <p>Ngày giao: <strong>{changeDateFormat(invoiceState?.deliveryDate)}</strong></p>
            <p>Địa chỉ giao: <strong>{invoiceState?.shippingInfo}</strong></p>
          </div>
          <div className='col-4'>
            <p>Chiết khấu: <strong>{invoiceState?.coupon?.discountPercent ? invoiceState?.coupon?.discountPercent + " %" : invoiceState?.coupon?.discountMoney}</strong></p>
            <p>TransactionId: <strong>{invoiceState?.transactionId}</strong></p>
            <p>Trạng thái: <strong className={invoiceState?.orderStatusId === 6 ? "text-danger" : "text-success"}>{invoiceState?.orderStatus?.title}</strong></p>
          </div>
          <p>Ghi chú: <strong>{invoiceState?.desc}</strong></p>
        </div>
        <div className='row border rounded-3 bg-white p-3 mb-3'>
          <div className='col-6'>
            <h3>Thông tin người đặt</h3>
            <p>Họ tên: <strong>{invoiceState?.user?.name}</strong></p>
            <p>User Id: <strong>{invoiceState?.userId}</strong></p>
          </div>
          <div className='col-6'>
            <h3>Thông tin người nhận</h3>
            <p>Họ tên: <strong>{invoiceState?.recipientName}</strong></p>
            <p>SĐT: <strong>{invoiceState?.recipientPhoneNumber}</strong></p>
          </div>
        </div>
        {
          invoiceState?.transaction &&
          (
            <div className='row border rounded-3 bg-white p-3 mb-3'>
              <h3>Thông tin giao dịch</h3>
              <div className='col-4'>
                <p>Phương thức thanh toán: <strong>{invoiceState?.transaction?.paymentMethod}</strong></p>
                <p>Số tiền: <strong>{invoiceState?.transaction?.amount}</strong></p>
              </div>
              <div className='col-4'>
                <p>Mã giao dịch ngân hàng: <strong>{invoiceState?.transaction?.bankTranNo}</strong></p>
                <p>Mã giao dịch {invoiceState?.transaction?.paymentMethod}: <strong>{invoiceState?.transaction?.transactionNo}</strong></p>
              </div>
              <div className='col-4'>
                <p>Mã ngân hàng: <strong>{invoiceState?.transaction?.bankCode}</strong></p>
                <p>Ngày giao dịch: <strong>{invoiceState?.transaction?.date}</strong></p>
                <p>Nội dung giao dịch: <strong>{invoiceState?.transaction?.orderInfo}</strong></p>
              </div>
            </div>
          )
        }
        <div className='row border rounded-3 bg-white p-3 mb-3'>
          <Table columns={columns} dataSource={data1} scroll={{ y: 500 }} />
        </div>
      </div>
    </>
  )
}

export default InvoiceDetails