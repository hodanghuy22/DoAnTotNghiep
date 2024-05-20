import React, { useEffect, useState } from 'react'
import { TbCircleNumber1, TbCircleNumber2 } from 'react-icons/tb'
import { useFormik } from 'formik';
import * as yup from 'yup';
import Dropzone from 'react-dropzone';
import { Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteImg, UploadImg } from '../features/uploadImage/uploadSlice';
import { GetBrandsShow } from '../features/brands/brandSlice';
import { GetCategoriesShow } from '../features/categories/categorySlice';
import { useLocation } from 'react-router-dom';
import { CreateProduct, GetProduct, UpdateProduct, resetState } from '../features/products/productSlice';

const productSchema = yup.object({
  name: yup.string().required('Name is Required'),
  desc: yup.string(),
  size: yup.string(),
  weight: yup.string(),
  chip: yup.string(),
  battery: yup.string(),
  chargingTime: yup.string(),
  accessibility: yup.string(),
  controls: yup.string(),
  screen: yup.string(),
  os: yup.string(),
  ram: yup.string(),
  rom: yup.string(),
  frontCamera: yup.string(),
  rearCamera: yup.string(),
  batteryCore: yup.string(),
  chargingEfficiency: yup.string(),
  input: yup.string(),
  output: yup.string(),
  features: yup.string(),
  audioTechnology: yup.string(),
  chargingCase: yup.string(),
  connectivity: yup.string(),
  status: yup.bool(),
  categoryId: yup.number().required('Category is Required'),
  brandId: yup.number().required('Brand is Required'),
  images: yup.array(),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getProductId = location.pathname.split("/")[3];
  const [productTypeSelect, setProductTypeSelect] = useState(1);
  const [titleProductType, setTitleProductType] = useState("Điện thoại");

  useEffect(() => {
    dispatch(GetBrandsShow())
    dispatch(GetCategoriesShow())
  }, [])

  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(GetProduct(getProductId))
    } else {
      dispatch(resetState())
    }
  }, [getProductId])

  const uploadState = useSelector(state => state?.upload?.images)
  const brandState = useSelector(state => state?.brand?.brands)
  const categoryState = useSelector(state => state?.category?.categories)
  const productState = useSelector(state => state?.product?.product)

  useEffect(() => {
    if (uploadState && uploadState.publicId) {
      const newImage = {
        imagePublicId: uploadState?.publicId,
        imageUrl: uploadState?.url
      };
      const currentImages = formik.values.images || [];
      const updatedImages = [...currentImages, newImage];
      formik.setFieldValue("images", updatedImages);
    }
  }, [uploadState])

  useEffect(() => {
    if (productState?.categoryId != null) {
      setCategoryId(productState?.categoryId, productState?.category?.title)
    }
  }, [productState])

  const setCategoryId = (id, title) => {
    setProductTypeSelect(id);
    setTitleProductType(title);
    formik.setFieldValue('categoryId', id);
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: productState?.name || "",
      desc: productState?.desc || "",
      size: productState?.size || "",
      weight: productState?.weight || "",
      chip: productState?.chip || "",
      battery: productState?.battery || "",
      chargingTime: productState?.chargingTime || "",
      accessibility: productState?.accessibility || "",
      controls: productState?.controls || "",
      screen: productState?.screen || "",
      os: productState?.os || "",
      ram: productState?.ram || "",
      rom: productState?.rom || "",
      frontCamera: productState?.frontCamera || "",
      rearCamera: productState?.rearCamera || "",
      batteryCore: productState?.batteryCore || "",
      chargingEfficiency: productState?.chargingEfficiency || "",
      input: productState?.input || "",
      output: productState?.output || "",
      features: productState?.features || "",
      audioTechnology: productState?.audioTechnology || "",
      chargingCase: productState?.chargingCase || "",
      connectivity: productState?.connectivity || "",
      status: productState?.status || false,
      categoryId: productState?.categoryId || 1,
      brandId: productState?.brandId || "",
      images: productState?.images || [],
    },
    validationSchema: productSchema,
    onSubmit: values => {
      if (getProductId !== undefined) {
        const data = { id: getProductId, data: { ...values, id: getProductId } }
        dispatch(UpdateProduct(data))
        dispatch(resetState())
      } else {
        console.log(values);
        dispatch(CreateProduct(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState())
        }, 300)
      }
    }
  });

  const deleteImg = (e) => {
    const currentImages = formik.values.images || [];
    const updatedImages = currentImages.filter(function(doiTuong) {
      return doiTuong.imagePublicId !== e.imagePublicId;
    });
    formik.setFieldValue("images", updatedImages);
    dispatch(DeleteImg(e.imagePublicId))
  }

  return (
    <div className='container'>
      <h1 className='mb-4 fw-bold'>{getProductId !== undefined ? "Edit" : "Add"} Product</h1>
      <div className='mt-3'>
        <h3 className='fw-bold fst-italic'><TbCircleNumber1 /> Chọn loại sản phẩm <strong className='text-danger'>{titleProductType}</strong></h3>
        <div className='row border bg-white p-3 rounded-3 d-flex flex-row mt-3'>
          {
            categoryState && categoryState?.map((i, j) => {
              return (
                <div key={j} className='col-3 text-center'>
                  <button onClick={() => { setCategoryId(i?.id, i?.title) }} className='btn btn-success'>{i?.title}</button>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className='mt-3'>
        <h3 className='fw-bold fst-italic'><TbCircleNumber2 /> Nhập thông tin</h3>
        <div className='row border bg-white p-3 rounded-3 mt-3'>
          <form onSubmit={formik.handleSubmit}>
            <div className='row'>
              <div className='mb-3 col-6'>
                <select name="brandId"
                  type="number"
                  value={formik.values.brandId}
                  onChange={formik.handleChange('brandId')}
                  onBlur={formik.handleBlur('brandId')}
                  id='' className='form-control'>
                  <option value="">List Brand</option>
                  {
                    brandState && brandState?.map((i, j) => {
                      return <option key={j} value={i.id}>{i.title}</option>
                    })
                  }
                </select>
                <div className='error'>
                  {
                    formik.touched.brandId && formik.errors.brandId
                  }
                </div>
              </div>
              <div className='mb-3 col-6'>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange('name')}
                  onBlur={formik.handleBlur('name')}
                />
                <div className='error'>
                  {
                    formik.touched.name && formik.errors.name
                  }
                </div>
              </div>
            </div>
            <div className='mb-3'>
              <input
                type="text"
                name="desc"
                className="form-control"
                placeholder="Desc"
                value={formik.values.desc}
                onChange={formik.handleChange('desc')}
                onBlur={formik.handleBlur('desc')}
              />
              <div className='error'>
                {
                  formik.touched.desc && formik.errors.desc
                }
              </div>
            </div>
            {
              productTypeSelect && ( productTypeSelect === 1 || productTypeSelect === 2 || productTypeSelect === 4 ) && (
                <>
                  <div className='row'>
                    <div className='mb-3 col-6'>
                      <input
                        type="text"
                        name="size"
                        className="form-control"
                        placeholder="Size"
                        value={formik.values.size}
                        onChange={formik.handleChange('size')}
                        onBlur={formik.handleBlur('size')}
                      />
                      <div className='error'>
                        {
                          formik.touched.size && formik.errors.size
                        }
                      </div>
                    </div>
                    <div className='mb-3 col-6'>
                      <input
                        type="text"
                        name="weight"
                        className="form-control"
                        placeholder="Weight"
                        value={formik.values.weight}
                        onChange={formik.handleChange('weight')}
                        onBlur={formik.handleBlur('weight')}
                      />
                      <div className='error'>
                        {
                          formik.touched.weight && formik.errors.weight
                        }
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='mb-3 col-6'>
                      <input
                        type="text"
                        name="battery"
                        className="form-control"
                        placeholder="Battery"
                        value={formik.values.battery}
                        onChange={formik.handleChange('battery')}
                        onBlur={formik.handleBlur('battery')}
                      />
                      <div className='error'>
                        {
                          formik.touched.battery && formik.errors.battery
                        }
                      </div>
                    </div>
                    <div className='mb-3 col-6'>
                      <input
                        type="text"
                        name="chargingTime"
                        className="form-control"
                        placeholder="ChargingTime"
                        value={formik.values.battery}
                        onChange={formik.handleChange('chargingTime')}
                        onBlur={formik.handleBlur('chargingTime')}
                      />
                      <div className='error'>
                        {
                          formik.touched.chargingTime && formik.errors.chargingTime
                        }
                      </div>
                    </div>
                  </div>
                </>
              )
            }
            {
              productTypeSelect && productTypeSelect === 1 && (
                <>
                  <div className='row'>
                    <div className='mb-3 col-6'>
                      <input
                        type="text"
                        name="chip"
                        className="form-control"
                        placeholder="Chip"
                        value={formik.values.chip}
                        onChange={formik.handleChange('chip')}
                        onBlur={formik.handleBlur('chip')}
                      />
                      <div className='error'>
                        {
                          formik.touched.chip && formik.errors.chip
                        }
                      </div>
                    </div>
                    <div className='mb-3 col-6'>
                      <input
                        type="text"
                        name="screen"
                        className="form-control"
                        placeholder="Screen"
                        value={formik.values.screen}
                        onChange={formik.handleChange('screen')}
                        onBlur={formik.handleBlur('screen')}
                      />
                      <div className='error'>
                        {
                          formik.touched.screen && formik.errors.screen
                        }
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='mb-3 col-6'>
                      <input
                        type="text"
                        name="os"
                        className="form-control"
                        placeholder="OS"
                        value={formik.values.os}
                        onChange={formik.handleChange('os')}
                        onBlur={formik.handleBlur('os')}
                      />
                      <div className='error'>
                        {
                          formik.touched.os && formik.errors.os
                        }
                      </div>
                    </div>
                    <div className='mb-3 col-6'>
                      <input
                        type="text"
                        name="ram"
                        className="form-control"
                        placeholder="RAM"
                        value={formik.values.ram}
                        onChange={formik.handleChange('ram')}
                        onBlur={formik.handleBlur('ram')}
                      />
                      <div className='error'>
                        {
                          formik.touched.ram && formik.errors.ram
                        }
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='mb-3 col-4'>
                      <input
                        type="text"
                        name="rom"
                        className="form-control"
                        placeholder="ROM"
                        value={formik.values.rom}
                        onChange={formik.handleChange('rom')}
                        onBlur={formik.handleBlur('rom')}
                      />
                      <div className='error'>
                        {
                          formik.touched.rom && formik.errors.rom
                        }
                      </div>
                    </div>
                    <div className='mb-3 col-4'>
                      <input
                        type="text"
                        name="frontCamera"
                        className="form-control"
                        placeholder="FrontCamera"
                        value={formik.values.frontCamera}
                        onChange={formik.handleChange('frontCamera')}
                        onBlur={formik.handleBlur('frontCamera')}
                      />
                      <div className='error'>
                        {
                          formik.touched.frontCamera && formik.errors.frontCamera
                        }
                      </div>
                    </div>
                    <div className='mb-3 col-4'>
                      <input
                        type="text"
                        name="rearCamera"
                        className="form-control"
                        placeholder="RearCamera"
                        value={formik.values.rearCamera}
                        onChange={formik.handleChange('rearCamera')}
                        onBlur={formik.handleBlur('rearCamera')}
                      />
                      <div className='error'>
                        {
                          formik.touched.rearCamera && formik.errors.rearCamera
                        }
                      </div>
                    </div>
                  </div>
                </>
              )
            }
            {
              productTypeSelect && ( productTypeSelect === 2 || productTypeSelect === 3 || productTypeSelect === 4 ) && (
                <>
                  <div className='row'>
                    <div className='mb-3 col-4'>
                      <input
                        type="text"
                        name="accessibility"
                        className="form-control"
                        placeholder="Accessibility"
                        value={formik.values.accessibility}
                        onChange={formik.handleChange('accessibility')}
                        onBlur={formik.handleBlur('accessibility')}
                      />
                      <div className='error'>
                        {
                          formik.touched.accessibility && formik.errors.accessibility
                        }
                      </div>
                    </div>
                    <div className='mb-3 col-4'>
                      <input
                        type="text"
                        name="controls"
                        className="form-control"
                        placeholder="Controls"
                        value={formik.values.controls}
                        onChange={formik.handleChange('controls')}
                        onBlur={formik.handleBlur('controls')}
                      />
                      <div className='error'>
                        {
                          formik.touched.controls && formik.errors.controls
                        }
                      </div>
                    </div>
                    <div className='mb-3 col-4'>
                      <input
                        type="text"
                        name="input"
                        className="form-control"
                        placeholder="Input"
                        value={formik.values.input}
                        onChange={formik.handleChange('input')}
                        onBlur={formik.handleBlur('input')}
                      />
                      <div className='error'>
                        {
                          formik.touched.input && formik.errors.input
                        }
                      </div>
                    </div>
                  </div>
                </>
              )
            }
            {
              productTypeSelect && ( productTypeSelect === 2 || productTypeSelect === 3 ) && (
                <>
                  <div className='mb-3'>
                    <input
                      type="text"
                      name="connectivity"
                      className="form-control"
                      placeholder="Connectivity"
                      value={formik.values.connectivity}
                      onChange={formik.handleChange('connectivity')}
                      onBlur={formik.handleBlur('connectivity')}
                    />
                    <div className='error'>
                      {
                        formik.touched.connectivity && formik.errors.connectivity
                      }
                    </div>
                  </div>
                </>
              )
            }
            {
              productTypeSelect && productTypeSelect === 2 && (
                <>
                  <div className='row'>
                    <div className='mb-3 col-6'>
                      <input
                        type="text"
                        name="audioTechnology"
                        className="form-control"
                        placeholder="AudioTechnology"
                        value={formik.values.audioTechnology}
                        onChange={formik.handleChange('audioTechnology')}
                        onBlur={formik.handleBlur('audioTechnology')}
                      />
                      <div className='error'>
                        {
                          formik.touched.audioTechnology && formik.errors.audioTechnology
                        }
                      </div>
                    </div>
                    <div className='mb-3 col-6'>
                      <input
                        type="text"
                        name="chargingCase"
                        className="form-control"
                        placeholder="ChargingCase"
                        value={formik.values.chargingCase}
                        onChange={formik.handleChange('chargingCase')}
                        onBlur={formik.handleBlur('chargingCase')}
                      />
                      <div className='error'>
                        {
                          formik.touched.chargingCase && formik.errors.chargingCase
                        }
                      </div>
                    </div>
                  </div>
                </>
              )
            }
            {
              productTypeSelect && productTypeSelect === 4 && (
                <>
                  <div className='row'> 
                    <div className='mb-3 col-6'>
                      <input
                        type="text"
                        name="batteryCore"
                        className="form-control"
                        placeholder="BatteryCore"
                        value={formik.values.batteryCore}
                        onChange={formik.handleChange('batteryCore')}
                        onBlur={formik.handleBlur('batteryCore')}
                      />
                      <div className='error'>
                        {
                          formik.touched.batteryCore && formik.errors.batteryCore
                        }
                      </div>
                    </div>
                    <div className='mb-3 col-6'>
                      <input
                        type="text"
                        name="chargingEfficiency"
                        className="form-control"
                        placeholder="ChargingEfficiency"
                        value={formik.values.chargingEfficiency}
                        onChange={formik.handleChange('chargingEfficiency')}
                        onBlur={formik.handleBlur('chargingEfficiency')}
                      />
                      <div className='error'>
                        {
                          formik.touched.chargingEfficiency && formik.errors.chargingEfficiency
                        }
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='mb-3 col-6'>
                      <input
                        type="text"
                        name="output"
                        className="form-control"
                        placeholder="Output"
                        value={formik.values.output}
                        onChange={formik.handleChange('output')}
                        onBlur={formik.handleBlur('output')}
                      />
                      <div className='error'>
                        {
                          formik.touched.output && formik.errors.output
                        }
                      </div>
                    </div>
                    <div className='mb-3 col-6'>
                      <input
                        type="text"
                        name="features"
                        className="form-control"
                        placeholder="Features"
                        value={formik.values.features}
                        onChange={formik.handleChange('features')}
                        onBlur={formik.handleBlur('features')}
                      />
                      <div className='error'>
                        {
                          formik.touched.features && formik.errors.features
                        }
                      </div>
                    </div>
                  </div>
                </>
              )
            }
            <Checkbox
              name="status"
              checked={formik.values.status}
              onChange={formik.handleChange('status')}
              defaultChecked={formik.values.status}
            >
              Status
            </Checkbox><br />
            <br />
            <div className='bg-white border-1 p-5 text-center'>
              <Dropzone onDrop={acceptedFiles => dispatch(UploadImg(acceptedFiles))}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                  </section>
                )}
              </Dropzone>
              <div className='d-flex flex-row'>
                {formik.values.images.length > 0 && formik.values.images.map((item, index) => {
                  return (
                    <div key={index} className='showImages d-flex flex-wrap gap-3 mb-3 ms-3'>
                      <div className='position-relative'>
                        <button type="button" onClick={() => deleteImg(item)} className='btn-close position-absolute' style={{ top: "10px", right: "10px" }}></button>
                        <img src={item?.imageUrl} alt="" width={200} height={200} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <button className='btn btn-success' type='submit'> {getProductId !== undefined ? "Edit" : "Add"} Product</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddProduct