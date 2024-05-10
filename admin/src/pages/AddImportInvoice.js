import React, { useEffect } from 'react';
import { Checkbox } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { GetSuppliersActive } from '../features/suppliers/supplierSlice';
import { GetProductDetails } from '../features/productDetails/productDetailSlice';
import { toast } from 'react-toastify';
import { CreateImportInvoice, resetState } from '../features/importInvoices/importInvoiceSlice';

const importInvoiceSchema = yup.object({
  dateOfReceipt: yup.date().required('Date Of Receipt is Required'),
  totalPrice: yup.string().required('Total Price is Required'),
  supplierId: yup.number().required('Supplier is Required'),
  importInvoiceDetails: yup.array().required('You must create invoice details!'),
});

const importInvoiceDetailSchema = yup.object({
  productDetailId: yup.number().required('Rroduct is Required'),
  quantity: yup.number().required('Quantity is Required'),
  costPrice: yup.number().required('CostPrice is Required'),
});

const AddImportInvoice = () => {
  const dispatch = useDispatch();
  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    const formattedMonth = month.padStart(2, '0');
    return [year, formattedMonth, day].join("-");
  };
  const location = useLocation();
  const navigate = useNavigate();
  const getImportInvoiceId = location.pathname.split("/")[3];
  const importInvoiceState = useSelector(state => state?.coupon?.coupon)
  const supplierState = useSelector(state => state?.supplier?.suppliers)
  const productDetailState = useSelector(state => state?.productDetail?.productDetails)
  useEffect(() => {
    dispatch(GetSuppliersActive())
    dispatch(GetProductDetails())
  }, [])
  useEffect(() => {
    if (getImportInvoiceId !== undefined) {
      //dispatch(GetCoupon(getImportInvoiceId))
    } else {
      //dispatch(resetState())
    }
  }, [getImportInvoiceId])
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      totalPrice: importInvoiceState?.totalPrice || 0,
      supplierId: importInvoiceState?.supplierId || "",
      dateOfReceipt: (importInvoiceState?.dateOfReceipt) || new Date().toISOString().substr(0, 10),
      importInvoiceDetails: importInvoiceState?.importInvoiceDetails || [],
    },
    validationSchema: importInvoiceSchema,
    onSubmit: values => {
      dispatch(CreateImportInvoice(values));
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
      costPrice: 0,
    },
    validationSchema: importInvoiceDetailSchema,
    onSubmit: values => {
      uploadInvoiceDetails(values);
    },
  });

  const uploadInvoiceDetails = (e) => {
    const { productDetailId, quantity, costPrice } = e;
    const currentInvoiceDetails = formik.values.importInvoiceDetails || [];

    // Kiểm tra xem productDetailId đã tồn tại trong mảng trước đó hay chưa
    const isProductDetailIdExist = currentInvoiceDetails.some(
      (detail) => detail.productDetailId === productDetailId
    );

    if (isProductDetailIdExist) {
      // Hiển thị thông báo hoặc thực hiện các hành động khác khi productDetailId đã tồn tại
      toast.error('Sản phẩm đã được chọn rồi vui lòng chọn lại!');
      return;
    }

    // Nếu productDetailId chưa tồn tại, thêm mới chi tiết hóa đơn
    const newInvoiceDetail = {
      productDetailId: productDetailId,
      quantity: quantity,
      costPrice: costPrice,
    };
    const updatedInvoiceDetails = [...currentInvoiceDetails, newInvoiceDetail];
    formik.setFieldValue("importInvoiceDetails", updatedInvoiceDetails);
    let total = formik.values.totalPrice + quantity * costPrice
    formik.setFieldValue("totalPrice", total);
  };

  return (
    <div>
      <div>
        <h1 className='mb-4 fw-bold'>{getImportInvoiceId !== undefined ? "Edit" : "Add"} Import Invoice</h1>
        <div className='mt-3 row border bg-white border-3 p-3 rounded-3 d-flex flex-row'>
          <form onSubmit={formik.handleSubmit}>
            <div className='mb-3'>
              <input
                type="date"
                name="dateOfReceipt"
                className="form-control"
                placeholder="Date Of Receipt"
                value={formik.values.dateOfReceipt}
                onChange={formik.handleChange('dateOfReceipt')}
                onBlur={formik.handleBlur('dateOfReceipt')}
                readOnly
              />
              <div className='error'>
                {
                  formik.touched.dateOfReceipt && formik.errors.dateOfReceipt
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
              <select name="supplierId"
                type="number"
                value={formik.values.supplierId}
                onChange={formik.handleChange('supplierId')}
                onBlur={formik.handleBlur('supplierId')}
                id='' className='form-control py-3 mb-3'>
                <option value="">Danh sách nhà cung cấp</option>
                {
                  supplierState && supplierState?.map((i, j) => {
                    return <option key={j} value={i.id}>{i.name}</option>
                  })
                }
              </select>
              <div className='error'>
                {
                  formik.touched.supplierId && formik.errors.supplierId
                }
              </div>
            </div>
            {
              formik.values.importInvoiceDetails && formik.values.importInvoiceDetails.length > 0 && (
                <table class="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Cost Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      formik.values.importInvoiceDetails && formik.values.importInvoiceDetails.map((i, j) => {
                        return (
                          <tr key={j}>
                            <th>{i?.productDetailId}</th>
                            <th>{i?.quantity}</th>
                            <th>{i?.costPrice}</th>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              )
            }
            <button className='btn btn-success' type='submit'>{getImportInvoiceId !== undefined ? "Edit" : "Add"} Import Invoice</button>
          </form>
        </div>
      </div>
      <div className='mt-3'>
        <h1 className='mb-4 fw-bold'>{getImportInvoiceId !== undefined ? "Edit" : "Add"} Import Invoice Details</h1>
        <div className='mt-3 row border bg-white border-3 p-3 rounded-3 d-flex flex-row'>
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
                onChange={formik2.handleChange('quantity')}
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
                name="costPrice"
                className="form-control"
                placeholder="Cost Price"
                value={formik2.values.costPrice}
                onChange={formik2.handleChange('costPrice')}
                onBlur={formik2.handleBlur('costPrice')}
              />
              <div className='error'>
                {
                  formik2.touched.costPrice && formik2.errors.costPrice
                }
              </div>
            </div>
            <button className='btn btn-success' type='submit'>{getImportInvoiceId !== undefined ? "Edit" : "Add"} Import Invoice Details</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddImportInvoice