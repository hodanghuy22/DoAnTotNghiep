import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetInvoices, GetInvoicesByOrderType } from '../features/invoices/invoiceSlice'
import { Link } from 'react-router-dom'
import formatNumber from '../utils/formatNumber'
import { BsCart } from 'react-icons/bs'
import cartIcon from '../assets/images/shopping-trolley.png';

const InvoiceCard = ({ type, orderStatusId }) => {
  const dispatch = useDispatch()
  const userState = useSelector(state => state.auth.user);
  const invoiceState = useSelector(state => state.invoice.invoices);
  useEffect(() => {
    if (type === "all") {
      dispatch(GetInvoices(userState.id))
    } else {
      dispatch(GetInvoicesByOrderType({
        userId: userState.id,
        orderType: orderStatusId,
      }))
    }
  }, [dispatch, type, orderStatusId, userState.id])
  return (
    <>
      {
        invoiceState.length <= 0 && (
          <div className='text-center p-5' style={{ display: "block" }}>
            <div className='icon-cart'><img src={cartIcon} alt='gio hang' width={'50%'}/></div>
            <p>Rất tiếc, không tìm thấy đơn hàng nào phù hợp</p>
            <Link to="/" className='btn btn-outline-primary w-50 bg-light text-primary bold'>Về trang chủ</Link>
          </div>
        )
      }
      {
        invoiceState && invoiceState?.map((item, index) => {
          return (
            <div key={index} className='order-item p-3 shadow mb-2 bg-body rounded'>
              <div className='d-flex justify-content-between border-bottom'>
                <p>Đơn hàng: <strong>#{item?.id}</strong></p>
                <p className={`${item?.orderStatusId === 6 ? 'text-warning' : 'text-success'} fw-bold`}>{item?.orderStatus?.title}</p>
              </div>
              <div className='d-flex justify-content-between mt-3'>
                <div className='d-flex flex-column'>
                  {
                    item?.invoiceDetails?.map((y) => {
                      return (
                        <>
                          <div className='d-flex mb-2'>
                            <div className=''>
                              <img style={{ width: '60px' }} src={y?.productDetail?.product?.thumnailUrl} alt='hinh' />
                            </div>
                            <div className=''>
                              <p>{y?.productDetail?.product?.name}</p>
                            </div>
                          </div>
                        </>
                      )
                    })
                  }
                </div>
                <div>
                  <div>
                    <p>Tổng tiền: <strong className='amount text-danger'>{formatNumber(item?.totalPriceAfterDiscount)}</strong></p>
                  </div>
                </div>
              </div>
              <div className='d-flex justify-content-end mt-3'>
                <div>
                  <Link to={`detail/${item?.id}`} className='btn border border-danger'>Xem chi tiết</Link>
                </div>
              </div>
            </div>
          )
        })
      }

    </>
  )
}

export default InvoiceCard