import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { GetAllUsers } from '../features/auths/authSlice';
import { GetCoupon, GetCouponsActive } from '../features/coupons/couponSlice';
import { Checkbox } from 'antd';
import { GetOrderStatusesActive } from '../features/orderStatus/orderStatusSlice';
import { GetProductDetail, GetProductDetailsActive } from '../features/productDetails/productDetailSlice';
import { AiFillDelete } from 'react-icons/ai';
import { CreateInvoice, GetInvoice, resetState } from '../features/invoices/invoiceSlice';

const invoiceSchema = yup.object({
  userId: yup.string().required('User Id is Required'),
  shippingInfo: yup.string(),
  issueDate: yup.date(),
  deliveryDate: yup.date(),
  totalPrice: yup.number(),
  totalPriceAfterDiscount: yup.number(),
  couponId: yup.number(),
  paid: yup.bool(),
  orderStatusId: yup.number(),
  invoiceDetails: yup.array().required('You must create invoice details!'),
});

const invoiceDetailSchema = yup.object({
  productDetailId: yup.number().min(1, 'Product is Required').required('Product is Required'),
  quantity: yup.number().min(1, 'Quantity must be greater than 1').required('Quantity is Required'),
  totalPrice: yup.number(),
});

const AddInvoice = () => {
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

  const [selectProducDetail, setSelectProducDetail] = useState(0);

  const userState = useSelector(state => state?.auth?.listUser)
  const couponState = useSelector(state => state?.coupon?.coupons)
  const orderStatusState = useSelector(state => state?.orderStatus?.orderStatuses)
  const productDetailState = useSelector(state => state?.productDetail?.productDetails)
  const invoiceState = useSelector(state => state.invoice?.invoice);
  const aProductDetailState = useSelector(state => state.productDetail?.productDetail);
  const aCouponState = useSelector(state => state?.coupon?.coupon)

  useEffect(() => {
    dispatch(GetAllUsers())
    dispatch(GetCouponsActive())
    dispatch(GetOrderStatusesActive())
    dispatch(GetProductDetailsActive())
  }, [])

  useEffect(() => {
    if (getInvoiceId !== undefined) {
      dispatch(GetInvoice(getInvoiceId))
    } else {
      dispatch(resetState())
    }
  }, [getInvoiceId])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userId: invoiceState?.userId || "",
      shippingInfo: invoiceState?.shippingInfo || "",
      issueDate: invoiceState?.issueDate ? changeDateFormat(invoiceState?.issueDate) : new Date().toISOString().substr(0, 10),
      deliveryDate: changeDateFormat(invoiceState?.deliveryDate) || "",
      totalPrice: invoiceState?.totalPrice || 0,
      totalPriceAfterDiscount: invoiceState?.totalPriceAfterDiscount || 0,
      couponId: invoiceState?.couponId || "",
      paid: invoiceState?.paid || false,
      orderStatusId: invoiceState?.orderStatusId || 1,
      invoiceDetails: invoiceState?.invoiceDetails || [],
    },
    validationSchema: invoiceSchema,
    onSubmit: values => {
      dispatch(CreateInvoice(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState())
      }, 300)
    },
  });

  const formik2 = useFormik({
    enableReinitialize: true,
    initialValues: {
      productDetailId: 0,
      quantity: 0,
      totalPrice: 0,
    },
    validationSchema: invoiceDetailSchema,
    onSubmit: values => {
      uploadInvoiceDetails(values);
      formik2.resetForm();
    },
  });

  useEffect(() => {
    dispatch(GetProductDetail(formik2.values.productDetailId));
  }, [formik2.values.productDetailId])

  useEffect(() => {
    const newTotalPrice = formik2.values.quantity * aProductDetailState?.retailPrice || 0;
    formik2.setFieldValue("totalPrice", newTotalPrice);
  }, [aProductDetailState])

  useEffect(() => {
    let totalPrice = formik.values.invoiceDetails.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );
    formik.setFieldValue("totalPrice", totalPrice);
    if(aCouponState?.discountPercent){
      totalPrice = totalPrice -(totalPrice * aCouponState?.discountPercent) / 100;
    }else{
      if(aCouponState?.discountMoney){
        totalPrice -= aCouponState?.discountMoney;
      }
    }
    formik.setFieldValue("totalPriceAfterDiscount", totalPrice);
  }, [formik.values.invoiceDetails])

  useEffect(() => {
    if(formik.values.couponId !== ""){
      dispatch(GetCoupon(formik.values.couponId))
    }
    if(formik.values.couponId === ""){
      let total = formik.values.totalPrice;
      formik.setFieldValue("totalPriceAfterDiscount", total);
    }
  }, [formik.values.couponId])

  useEffect(()=>{
    var total = formik.values.totalPrice;
    if(aCouponState?.discountPercent){
      total = total -(total * aCouponState?.discountPercent) / 100;
    }else{
      if(aCouponState?.discountMoney){
        total -= aCouponState?.discountMoney;
      }
    }
    formik.setFieldValue("totalPriceAfterDiscount", total);
  }, [aCouponState])

  const handleChangeQuantity = (e) => {
    formik2.handleChange('quantity')(e);
    const newQuantity = e.target.value;
    const newTotalPrice = newQuantity * aProductDetailState?.retailPrice || 0;
    formik2.setFieldValue("totalPrice", newTotalPrice);
  };

  const uploadInvoiceDetails = (e) => {
    const { productDetailId, quantity, totalPrice } = e;
    const currentInvoiceDetails = formik.values.invoiceDetails || [];
    const isProductDetailIdExist = currentInvoiceDetails.some(
      (detail) => detail.productDetailId === productDetailId
    );

    if (isProductDetailIdExist) {
      const updatedInvoiceDetails = currentInvoiceDetails.map((detail) => {
        if (detail.productDetailId === productDetailId) {
          return {
            ...detail,
            // Cập nhật các giá trị mới tại đây
            quantity: quantity,
            totalPrice: totalPrice,
          };
        }
        return detail; // Giữ nguyên các phần tử không cần cập nhật
      });

      // Cập nhật mảng chi tiết hóa đơn với mảng đã được cập nhật
      formik.setFieldValue("invoiceDetails", updatedInvoiceDetails);
      return;
    }

    const newInvoiceDetail = {
      productDetailId: productDetailId,
      quantity: quantity,
      totalPrice: totalPrice,
    };
    const updatedInvoiceDetails = [...currentInvoiceDetails, newInvoiceDetail];
    formik.setFieldValue("invoiceDetails", updatedInvoiceDetails);
  };

  const setInvoiceDetails = (e) => {
    formik2.setFieldValue("productDetailId", e.productDetailId);
    formik2.setFieldValue("quantity", e.quantity);
    formik2.setFieldValue("totalPrice", e.totalPrice);
  }

  const removeItemInInvoiceDetails = (e) => {
    const currentInvoiceDetails = formik.values.invoiceDetails;
    const updatedItems = currentInvoiceDetails.filter(item => item.productDetailId !== e.productDetailId);
    formik.setFieldValue("invoiceDetails", updatedItems);
  }

  return (
    <div>
      <div>
        <h1 className='mb-4 fw-bold'>{getInvoiceId !== undefined ? "Edit" : "Add"} Invoice</h1>
        <div className='mt-3 row border bg-white  p-3 rounded-3 d-flex flex-row'>
          <form onSubmit={formik.handleSubmit}>
            <div className='mb-3'>
              <select name="userId"
                type="text"
                value={formik.values.userId}
                onChange={formik.handleChange('userId')}
                onBlur={formik.handleBlur('userId')}
                id='' className='form-control py-3 mb-3'>
                <option value="">Danh sách user</option>
                {
                  userState && userState?.map((i, j) => {
                    return <option key={j} value={i.id}>{i.name} | {i.email}</option>
                  })
                }
              </select>
              <div className='error'>
                {
                  formik.touched.userId && formik.errors.userId
                }
              </div>
            </div>
            <div className='mb-3'>
              <input
                type="text"
                name="shippingInfo"
                className="form-control"
                placeholder="Shipping Info"
                value={formik.values.shippingInfo}
                onChange={formik.handleChange('shippingInfo')}
                onBlur={formik.handleBlur('shippingInfo')}
              />
              <div className='error'>
                {
                  formik.touched.shippingInfo && formik.errors.shippingInfo
                }
              </div>
            </div>
            <div className='mb-3'>
              <input
                type="date"
                name="issueDate"
                className="form-control"
                placeholder="Issue Date"
                value={formik.values.issueDate}
                onChange={formik.handleChange('issueDate')}
                onBlur={formik.handleBlur('issueDate')}
                readOnly
              />
              <div className='error'>
                {
                  formik.touched.issueDate && formik.errors.issueDate
                }
              </div>
            </div>
            <div className='mb-3'>
              <input
                type="date"
                name="deliveryDate"
                className="form-control"
                placeholder="Delivery Date"
                value={formik.values.deliveryDate}
                onChange={formik.handleChange('deliveryDate')}
                onBlur={formik.handleBlur('deliveryDate')}
              />
              <div className='error'>
                {
                  formik.touched.deliveryDate && formik.errors.deliveryDate
                }
              </div>
            </div>
            <div className='mb-3'>
              <input
                type="number"
                name="totalPrice"
                className="form-control"
                placeholder="Total Price"
                value={formik.values.totalPrice}
                onChange={formik.handleChange('totalPrice')}
                onBlur={formik.handleBlur('totalPrice')}
                readOnly
              />
              <div className='error'>
                {
                  formik.touched.totalPrice && formik.errors.totalPrice
                }
              </div>
            </div>
            <div className='mb-3'>
              <input
                type="number"
                name="totalPriceAfterDiscount"
                className="form-control"
                placeholder="Total Price After Discount"
                value={formik.values.totalPriceAfterDiscount}
                onChange={formik.handleChange('totalPriceAfterDiscount')}
                onBlur={formik.handleBlur('totalPriceAfterDiscount')}
                readOnly
              />
              <div className='error'>
                {
                  formik.touched.totalPriceAfterDiscount && formik.errors.totalPriceAfterDiscount
                }
              </div>
            </div>
            <div className='mb-3'>
              <select name="couponId"
                type="number"
                value={formik.values.couponId}
                onChange={formik.handleChange('couponId')}
                onBlur={formik.handleBlur('couponId')}
                id='' className='form-control py-3 mb-3'>
                <option value="">Danh sách coupon</option>
                {
                  couponState && couponState?.map((i, j) => {
                    return <option key={j} value={i.id}>{i.title} | {i.code}</option>
                  })
                }
              </select>
              <div className='error'>
                {
                  formik.touched.couponId && formik.errors.couponId
                }
              </div>
            </div>
            <div className='mb-3'>
              <select name="orderStatusId"
                type="number"
                value={formik.values.orderStatusId}
                onChange={formik.handleChange('orderStatusId')}
                onBlur={formik.handleBlur('orderStatusId')}
                id='' className='form-control py-3 mb-3'>
                <option value="">Danh sách order status</option>
                {
                  orderStatusState && orderStatusState?.map((i, j) => {
                    return <option key={j} value={i.id}>{i.title}</option>
                  })
                }
              </select>
              <div className='error'>
                {
                  formik.touched.orderStatusId && formik.errors.orderStatusId
                }
              </div>
            </div>
            <Checkbox
              name="paid"
              checked={formik.values.paid}
              onChange={formik.handleChange('paid')}
              defaultChecked={formik.values.paid}
            >
              Paid
            </Checkbox><br />
            <br />
            {
              formik.values.invoiceDetails && formik.values.invoiceDetails.length > 0 && (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>TotalPrice</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      formik.values.invoiceDetails && formik.values.invoiceDetails.map((i, j) => {
                        return (
                          <tr key={j}>
                            <th>{i?.productDetailId}</th>
                            <th>{i?.quantity}</th>
                            <th>{i?.totalPrice}</th>
                            <th>
                              <button type='button' className='btn btn-info'
                              onClick={() => setInvoiceDetails(i)}><BiEdit /></button>
                              <button type='button' className='btn btn-danger ms-3'
                              onClick={() => removeItemInInvoiceDetails(i)}><AiFillDelete /></button>
                            </th>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              )
            }
            <button className='btn btn-success' type='submit'>{getInvoiceId !== undefined ? "Edit" : "Add"} Invoice</button>
          </form>
        </div>
      </div>
      <div className='mt-3'>
        <h1 className='mb-4 fw-bold'>{getInvoiceId !== undefined ? "Edit" : "Add"} Invoice Details</h1>
        <div className='mt-3 row border bg-white  p-3 rounded-3 d-flex flex-row'>
          <form onSubmit={formik2.handleSubmit}>
            <div className='mb-3'>
              <select name="productDetailId"
                type="number"
                value={formik2.values.productDetailId}
                onChange={formik2.handleChange('productDetailId')}
                onBlur={formik2.handleBlur('productDetailId')}
                id='' className='form-control py-3 mb-3'>
                <option value="">Danh sách sản phẩm</option>
                {
                  productDetailState && productDetailState?.map((i, j) => {
                    return <option key={j} value={i.id}>{i.product?.name} | {i.product?.category?.title} | {i.capacity?.totalCapacity} | {i.color?.colorName}</option>
                  })
                }
              </select>
              <div className='error'>
                {
                  formik2.touched.productDetailId && formik2.errors.productDetailId
                }
              </div>
            </div>
            <div className='mb-3'>
              <input
                type="number"
                name="quantity"
                className="form-control"
                placeholder="Quantity"
                value={formik2.values.quantity}
                onChange={handleChangeQuantity}
                onBlur={formik2.handleBlur('quantity')}
              />
              <div className='error'>
                {
                  formik2.touched.quantity && formik2.errors.quantity
                }
              </div>
            </div>
            <div className='mb-3'>
              <input
                type="number"
                name="totalPrice"
                className="form-control"
                placeholder="Total Price"
                value={formik2.values.totalPrice}
                onChange={formik2.handleChange('totalPrice')}
                onBlur={formik2.handleBlur('totalPrice')}
                readOnly
              />
              <div className='error'>
                {
                  formik2.touched.totalPrice && formik2.errors.totalPrice
                }
              </div>
            </div>
            <button className='btn btn-success' type='submit'>{getInvoiceId !== undefined ? "Edit" : "Add"} Invoice Details</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddInvoice