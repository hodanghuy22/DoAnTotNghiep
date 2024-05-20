import React, { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import { GetProductsActive } from '../features/products/productSlice';
import { GetCapacitiesShow } from '../features/capacitites/capacitySlice';
import { GetColorsShow } from '../features/colors/colorSlice';
import { GetCategoriesShow } from '../features/categories/categorySlice';
import { TbCircleNumber1, TbCircleNumber2 } from 'react-icons/tb';
import { DeleteImg, UploadImg } from '../features/uploadImage/uploadSlice';
import { CreateProductDetail, GetProductDetail, UpdateProductDetail, resetState } from '../features/productDetails/productDetailSlice';

const productDetailsSchema = yup.object({
  quantity: yup.number().min(1, 'Quantity must be greater than 0').required('Quantity is Required'),
  retailPrice: yup.number().min(1, 'Price must be greater than 0').required('Price is Required'),
  costPrice: yup.number().min(1, 'Price must be greater than 0').required('Price is Required'),
  productId: yup.number().required('Product is Required'),
  capacityId: yup.number(),
  colorId: yup.number().required('Color is Required'),
  hinhPublicId: yup.string(),
  fileHinh: yup.string(),
  status: yup.boolean(),
});


const AddProductDetails = () => {
  const dispatch = useDispatch();
  const productState = useSelector(state => state?.product?.products)
  const capacityState = useSelector(state => state?.capacity?.capacities)
  const colorState = useSelector(state => state?.color?.colors)
  const categoryState = useSelector(state => state?.category?.categories)
  const productDetailState = useSelector(state => state?.productDetail?.productDetail)

  const location = useLocation();
  const getProductDetailId = location.pathname.split("/")[3];
  const [categoryId, setCategoryId] = useState(1);
  const [titleProductType, setTitleProductType] = useState("Điện thoại");

  useEffect(() => {
    dispatch(GetProductsActive())
    dispatch(GetCapacitiesShow())
    dispatch(GetColorsShow())
    dispatch(GetCategoriesShow())
  }, [])

  useEffect(() => {
      if (getProductDetailId !== undefined) {
          dispatch(GetProductDetail(getProductDetailId))
      } else {
          dispatch(resetState())
      }
  }, [getProductDetailId])

  useEffect(()=>{
    if(productDetailState?.capacityId === null){
      setCategoryId(productDetailState?.product?.categoryId)
      setTitleProductType(productDetailState?.product?.category?.title)
    }else{
      setCategoryId(1)
    }
  }, [productDetailState])


  const setCategory = (e,f) => {
    setCategoryId(e)
    setTitleProductType(f)
    if(e !== 1){
      formik.setFieldValue("capacityId", "");
    }
  }


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      quantity: productDetailState?.quantity || 0,
      retailPrice: productDetailState?.retailPrice || 0,
      costPrice: productDetailState?.costPrice || 0,
      soldQuantity: productDetailState?.soldQuantity || 0,
      averageRating: productDetailState?.averageRating || 0,
      productId: productDetailState?.productId || "",
      capacityId: productDetailState?.capacityId || "",
      colorId: productDetailState?.colorId || "",
      status: productDetailState?.status || false,
    },
    validationSchema: productDetailsSchema,
    onSubmit: values => {
      if (getProductDetailId !== undefined) {
        const data = { id: getProductDetailId, productDetailData: { ...values, id: getProductDetailId, comments: null, ratings:null } }
        dispatch(UpdateProductDetail(data))
        dispatch(resetState())
      } else {
        dispatch(CreateProductDetail(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState())
        }, 300)
      }
    },
  });

  return (
    <div className='container'>
      <h3 className='mb-4'>{getProductDetailId !== undefined ? "Edit" : "Add"} Product Detail</h3>
      <div className='mt-3'>
        <h3 className='fw-bold fst-italic'><TbCircleNumber1 /> Chọn loại sản phẩm <strong className='text-danger'>{titleProductType}</strong></h3>
        <div className='row border bg-white p-3 rounded-3 d-flex flex-row mt-3'>
          {
            categoryState && categoryState?.map((i, j) => {
              return (
                <div key={j} className='col-3 text-center'>
                  <button onClick={() => { setCategory(i?.id, i?.title) }} className='btn btn-success'>{i?.title}</button>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className='mt-3'>
        <h3 className='fw-bold fst-italic'><TbCircleNumber2 /> Nhập thông tin</h3>
        <div className='row border bg-white p-3 rounded-3 d-flex flex-row mt-3'>
          <form onSubmit={formik.handleSubmit}>
            <div className='mb-3'>
              <select name="productId"
                type="number"
                value={formik.values.productId}
                onChange={formik.handleChange('productId')}
                onBlur={formik.handleBlur('productId')}
                id='' className='form-control py-3 mb-3'>
                <option value="">Select Product</option>
                {
                  productState && productState?.map((i, j) => {
                    return <option key={j} value={i.id}>{i.name}</option>
                  })
                }
              </select>
              <div className='error'>
                {
                  formik.touched.productId && formik.errors.productId
                }
              </div>
            </div>
            {
              categoryId && categoryId === 1 && (
                <div className='mb-3'>
                  <select name="capacityId"
                    type="number"
                    value={formik.values.capacityId}
                    onChange={formik.handleChange('capacityId')}
                    onBlur={formik.handleBlur('capacityId')}
                    id='' className='form-control py-3 mb-3'>
                    <option value="">Select Capacity</option>
                    {
                      capacityState && capacityState?.map((i, j) => {
                        return <option key={j} value={i.id}>{i.totalCapacity}</option>
                      })
                    }
                  </select>
                  <div className='error'>
                    {
                      formik.touched.capacityId && formik.errors.capacityId
                    }
                  </div>
                </div>
              )
            }
            <div className='mb-3'>
              <select name="colorId"
                type="number"
                value={formik.values.colorId}
                onChange={formik.handleChange('colorId')}
                onBlur={formik.handleBlur('colorId')}
                id='' className='form-control py-3 mb-3'>
                <option value="">Select Color</option>
                {
                  colorState && colorState?.map((i, j) => {
                    return <option key={j} value={i.id}>{i.colorName}</option>
                  })
                }
              </select>
              <div className='error'>
                {
                  formik.touched.colorId && formik.errors.colorId
                }
              </div>
            </div>
            <div className='row'>
              <div className='mb-3 col-4'>
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  placeholder="Quantity"
                  value={formik.values.quantity}
                  onChange={formik.handleChange('quantity')}
                  onBlur={formik.handleBlur('quantity')}
                />
                <div className='error'>
                  {
                    formik.touched.quantity && formik.errors.quantity
                  }
                </div>
              </div>
              <div className='mb-3 col-4'>
                <label className="form-label">Retail Price</label>
                <input
                  type="number"
                  name="retailPrice"
                  className="form-control"
                  placeholder="Retail Price"
                  value={formik.values.retailPrice}
                  onChange={formik.handleChange('retailPrice')}
                  onBlur={formik.handleBlur('retailPrice')}
                />
                <div className='error'>
                  {
                    formik.touched.retailPrice && formik.errors.retailPrice
                  }
                </div>
              </div>
              <div className='mb-3 col-4'>
                <label className="form-label">Cost Price</label>
                <input
                  type="number"
                  name="costPrice"
                  className="form-control"
                  placeholder="Cost Price"
                  value={formik.values.costPrice}
                  onChange={formik.handleChange('costPrice')}
                  onBlur={formik.handleBlur('costPrice')}
                />
                <div className='error'>
                  {
                    formik.touched.costPrice && formik.errors.costPrice
                  }
                </div>
              </div>
            </div>
            <Checkbox
              name="status"
              checked={formik.values.status}
              onChange={formik.handleChange('status')}
              defaultChecked={formik.values.status}
            >
              Status
            </Checkbox><br />
            <br />
            <button className='btn btn-success' type='submit'>{getProductDetailId !== undefined ? "Edit" : "Add"} Product</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddProductDetails