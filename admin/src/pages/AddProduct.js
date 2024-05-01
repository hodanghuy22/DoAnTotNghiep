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

const phoneSchema = yup.object({
  name: yup.string().required('Name is Required'),
  desc: yup.string(),
  loaiMan: yup.string(),
  kichThuoc: yup.string(),
  doPhanGiai: yup.string(),
  cpu: yup.string(),
  ram: yup.string(),
  rom: yup.string(),
  cameraTruoc: yup.string(),
  cameraSau: yup.string(),
  pin: yup.string(),
  hieuSuatSac: yup.string(),
  thoiGianSacDayPin: yup.string(),
  nguonVao: yup.string(),
  nguonRa: yup.string(),
  tienIch: yup.string(),
  thoiGianNghe: yup.string(),
  thoiGianHopSac: yup.string(),
  tuongThich: yup.string(),
  categoryId: yup.string(),
  imagePublicId: yup.string(),
  imageUrl: yup.string(),
  status: yup.bool(),
  brandId: yup.number().required('Brand is Required'),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getProductId = location.pathname.split("/")[3];
  const [productTypeSelect, setProductTypeSelect] = useState(1);

  useEffect(() => {
    dispatch(GetBrandsShow())
    dispatch(GetCategoriesShow())
  }, [])

  useEffect(()=>{
    if(getProductId !== undefined){
      dispatch(GetProduct(getProductId))
    }else{
      dispatch(resetState())
    }
  },[getProductId])

  const uploadState = useSelector(state => state?.upload?.images)
  const brandState = useSelector(state => state?.brand?.brands)
  const categoryState = useSelector(state => state?.category?.categories)
  const productState = useSelector(state => state?.product?.product)

  useEffect(() => {
    if (uploadState && uploadState.publicId) {
      formik.setFieldValue('imagePublicId', uploadState?.publicId);
      formik.setFieldValue('imageUrl', uploadState?.url);
    }
  }, [uploadState])

  useEffect(()=>{
    if(productState?.categoryId != null){
      setCategoryId(productState?.categoryId)
    }
  },[productState])

  const setCategoryId = (id) => {
    setProductTypeSelect(id)
    formik.setFieldValue('categoryId', id);
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: productState?.name || "",
      desc: productState?.desc || "",
      loaiMan: productState?.loaiMan || "",
      kichThuoc: productState?.kichThuoc || "",
      doPhanGiai: productState?.doPhanGiai || "",
      cpu: productState?.cpu || "",
      ram: productState?.ram || "",
      rom: productState?.rom || "",
      cameraTruoc: productState?.cameraTruoc || "",
      cameraSau: productState?.cameraSau || "",
      pin: productState?.pin || "",
      hieuSuatSac: productState?.hieuSuatSac || "",
      thoiGianSacDayPin: productState?.thoiGianSacDayPin || "",
      nguonVao: productState?.nguonVao || "",
      nguonRa: productState?.nguonRa || "",
      tienIch: productState?.tienIch || "",
      thoiGianNghe: productState?.thoiGianNghe || "",
      thoiGianHopSac: productState?.thoiGianHopSac || "",
      tuongThich: productState?.tuongThich || "",
      imagePublicId: productState?.imagePublicId || "",
      imageUrl: productState?.imageUrl || "",
      categoryId: productState?.categoryId || 1,
      status: productState?.status || false,
      brandId: productState?.brandId || "",
    },
    validationSchema: phoneSchema,
    onSubmit: values => {
      if(getProductId !== undefined){
        const data = { id:getProductId, data: {...values, id:getProductId }}
        dispatch(UpdateProduct(data))
        dispatch(resetState())
        }else{
            dispatch(CreateProduct(values));
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState())
            }, 300)
        }
    }
  });

  return (
    <div className='container'>
      <h1 className='mb-4 fw-bold'>{getProductId!==undefined?"Edit":"Add"} Product</h1>
      <div className='mt-3'>
        <h3 className='fw-bold fst-italic'><TbCircleNumber1 /> Chọn loại sản phẩm</h3>
        <div className='row border border-3 p-3 rounded-3 d-flex flex-row mt-3'>
          {
            categoryState && categoryState?.map((i, j) => {
              return <>
                <div key={j} className='col-3 text-center'>
                  <button onClick={() => { setCategoryId(i?.id) }} className='btn btn-success'>{i?.title}</button>
                </div>
              </>
            })
          }
        </div>
      </div>

      <div className='mt-3'>
        <h3 className='fw-bold fst-italic'><TbCircleNumber2 /> Nhập thông tin</h3>
        {
          productTypeSelect && productTypeSelect === 1 && (
            <div className='row border border-3 p-3 rounded-3 mt-3'>
              <form onSubmit={formik.handleSubmit}>
                <div className='mb-3'>
                  <input
                    type="text"
                    name="name"
                    class="form-control"
                    placeholder="Tên sản phẩm"
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
                <div className='mb-3'>
                  <input
                    type="text"
                    name="desc"
                    class="form-control"
                    placeholder="Mô tả"
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
                <div className='mb-3'>
                  <input
                    type="text"
                    name="loaiMan"
                    class="form-control"
                    placeholder="Loại Màn Hình"
                    value={formik.values.loaiMan}
                    onChange={formik.handleChange('loaiMan')}
                    onBlur={formik.handleBlur('loaiMan')}
                  />
                  <div className='error'>
                    {
                      formik.touched.loaiMan && formik.errors.loaiMan
                    }
                  </div>
                </div>
                <div className='mb-3'>
                  <input
                    type="text"
                    name="kichThuoc"
                    class="form-control"
                    placeholder="Kích Thước"
                    value={formik.values.kichThuoc}
                    onChange={formik.handleChange('kichThuoc')}
                    onBlur={formik.handleBlur('kichThuoc')}
                  />
                  <div className='error'>
                    {
                      formik.touched.kichThuoc && formik.errors.kichThuoc
                    }
                  </div>
                </div>
                <div className='mb-3'>
                  <input
                    type="text"
                    name="doPhanGiai"
                    class="form-control"
                    placeholder="Độ Phân Giải"
                    value={formik.values.doPhanGiai}
                    onChange={formik.handleChange('doPhanGiai')}
                    onBlur={formik.handleBlur('doPhanGiai')}
                  />
                  <div className='error'>
                    {
                      formik.touched.doPhanGiai && formik.errors.doPhanGiai
                    }
                  </div>
                </div>
                <div className='mb-3'>
                  <input
                    type="text"
                    name="cpu"
                    class="form-control"
                    placeholder="CPU"
                    value={formik.values.cpu}
                    onChange={formik.handleChange('cpu')}
                    onBlur={formik.handleBlur('cpu')}
                  />
                  <div className='error'>
                    {
                      formik.touched.cpu && formik.errors.cpu
                    }
                  </div>
                </div>
                <div className='mb-3'>
                  <input
                    type="text"
                    name="ram"
                    class="form-control"
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
                <div className='mb-3'>
                  <input
                    type="text"
                    name="rom"
                    class="form-control"
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
                <div className='mb-3'>
                  <input
                    type="text"
                    name="cameraTruoc"
                    class="form-control"
                    placeholder="Camera Trước"
                    value={formik.values.cameraTruoc}
                    onChange={formik.handleChange('cameraTruoc')}
                    onBlur={formik.handleBlur('cameraTruoc')}
                  />
                  <div className='error'>
                    {
                      formik.touched.cameraTruoc && formik.errors.cameraTruoc
                    }
                  </div>
                </div>
                <div className='mb-3'>
                  <input
                    type="text"
                    name="cameraSau"
                    class="form-control"
                    placeholder="Camera Sau"
                    value={formik.values.cameraSau}
                    onChange={formik.handleChange('cameraSau')}
                    onBlur={formik.handleBlur('cameraSau')}
                  />
                  <div className='error'>
                    {
                      formik.touched.cameraSau && formik.errors.cameraSau
                    }
                  </div>
                </div>
                <div className='mb-3'>
                  <input
                    type="text"
                    name="pin"
                    class="form-control"
                    placeholder="Pin"
                    value={formik.values.pin}
                    onChange={formik.handleChange('pin')}
                    onBlur={formik.handleBlur('pin')}
                  />
                  <div className='error'>
                    {
                      formik.touched.pin && formik.errors.pin
                    }
                  </div>
                </div>
                <div className='mb-3'>
                  <select name="brandId"
                    type="number"
                    value={formik.values.brandId}
                    onChange={formik.handleChange('brandId')}
                    onBlur={formik.handleBlur('brandId')}
                    id='' className='form-control py-3 mb-3'>
                    <option value="">Danh sách hãng</option>
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
                  <div className='showImages d-flex flex-wrap gap-3'>
                    {(uploadState && uploadState.publicId) && (
                      <div className='position-relative'>
                        <button type="button" onClick={() => dispatch(DeleteImg(uploadState.publicId))} className='btn-close position-absolute' style={{ top: "10px", right: "10px" }}></button>
                        <img src={uploadState.url} alt="" width={200} height={200} />
                      </div>
                    )}
                    {/* {(getPhoneId !== undefined && showImage === true) && (
                  <div className='position-relative'>
                    <button type="button" onClick={() => {
                      dispatch(DeleteImg(formik.values.hinhPublicId));
                      setShowImage(false);
                    }} className='btn-close position-absolute' style={{ top: "10px", right: "10px" }}></button>
                    <img src={formik.values.fileHinh} alt="" width={200} height={200} />
                  </div>
                )} */}
                  </div>
                </div>
                <button className='btn btn-success' type='submit'>{getProductId!==undefined?"Edit":"Add"} Product</button>
              </form>
            </div>
          )
        }
        {
          productTypeSelect && productTypeSelect === 2 && (
            <div className='row border border-3 p-3 rounded-3 mt-3'>
              <form onSubmit={formik.handleSubmit}>
                <div className='mb-3'>
                  <select name="brandId"
                    type="number"
                    value={formik.values.brandId}
                    onChange={formik.handleChange('brandId')}
                    onBlur={formik.handleBlur('brandId')}
                    id='' className='form-control py-3 mb-3'>
                    <option value="">Danh sách hãng</option>
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
                <div className='mb-3'>
                  <input
                    type="text"
                    name="name"
                    class="form-control"
                    placeholder="Tên sản phẩm"
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
                <div className='mb-3'>
                  <input
                    type="text"
                    name="desc"
                    class="form-control"
                    placeholder="Mô tả"
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
                <div className='mb-3'>
                  <input
                    type="text"
                    name="nguonVao"
                    class="form-control"
                    placeholder="Jack cắm"
                    value={formik.values.nguonVao}
                    onChange={formik.handleChange('nguonVao')}
                    onBlur={formik.handleBlur('nguonVao')}
                  />
                  <div className='error'>
                    {
                      formik.touched.nguonVao && formik.errors.nguonVao
                    }
                  </div>
                </div>
                <div className='mb-3'>
                  <input
                    type="text"
                    name="tienIch"
                    class="form-control"
                    placeholder="Tiện ích"
                    value={formik.values.name}
                    onChange={formik.handleChange('tienIch')}
                    onBlur={formik.handleBlur('tienIch')}
                  />
                  <div className='error'>
                    {
                      formik.touched.tienIch && formik.errors.tienIch
                    }
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
                  <div className='showImages d-flex flex-wrap gap-3'>
                    {(uploadState && uploadState.publicId) && (
                      <div className='position-relative'>
                        <button type="button" onClick={() => dispatch(DeleteImg(uploadState.publicId))} className='btn-close position-absolute' style={{ top: "10px", right: "10px" }}></button>
                        <img src={uploadState.url} alt="" width={200} height={200} />
                      </div>
                    )}
                  </div>
                </div>
                <button className='btn btn-success' type='submit'> {getProductId!==undefined?"Edit":"Add"} Product</button>
              </form>
            </div>
          )
        }
        {
          productTypeSelect && productTypeSelect === 3 && (
            <div className='row border border-3 p-3 rounded-3 mt-3'>
              <form onSubmit={formik.handleSubmit}>
                <div className='mb-3'>
                  <select name="brandId"
                    type="number"
                    value={formik.values.brandId}
                    onChange={formik.handleChange('brandId')}
                    onBlur={formik.handleBlur('brandId')}
                    id='' className='form-control py-3 mb-3'>
                    <option value="">Danh sách hãng</option>
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
                <div className='mb-3'>
                  <input
                    type="text"
                    name="name"
                    class="form-control"
                    placeholder="Tên sản phẩm"
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
                <div className='mb-3'>
                  <input
                    type="text"
                    name="desc"
                    class="form-control"
                    placeholder="Mô tả"
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
                <div className='mb-3'>
                  <input
                    type="text"
                    name="thoiGianNghe"
                    class="form-control"
                    placeholder="Thời gian nghe"
                    value={formik.values.thoiGianNghe}
                    onChange={formik.handleChange('thoiGianNghe')}
                    onBlur={formik.handleBlur('thoiGianNghe')}
                  />
                  <div className='error'>
                    {
                      formik.touched.thoiGianNghe && formik.errors.thoiGianNghe
                    }
                  </div>
                </div>
                <div className='mb-3'>
                  <input
                    type="text"
                    name="thoiGianHopSac"
                    class="form-control"
                    placeholder="Thời gian hộp sạc"
                    value={formik.values.thoiGianHopSac}
                    onChange={formik.handleChange('thoiGianHopSac')}
                    onBlur={formik.handleBlur('thoiGianHopSac')}
                  />
                  <div className='error'>
                    {
                      formik.touched.thoiGianHopSac && formik.errors.thoiGianHopSac
                    }
                  </div>
                </div>
                <div className='mb-3'>
                  <input
                    type="text"
                    name="tuongThich"
                    class="form-control"
                    placeholder="Tương thích"
                    value={formik.values.tuongThich}
                    onChange={formik.handleChange('tuongThich')}
                    onBlur={formik.handleBlur('tuongThich')}
                  />
                  <div className='error'>
                    {
                      formik.touched.tuongThich && formik.errors.tuongThich
                    }
                  </div>
                </div>
                <div className='mb-3'>
                  <input
                    type="text"
                    name="nguonVao"
                    class="form-control"
                    placeholder="Cổng sạc"
                    value={formik.values.nguonVao}
                    onChange={formik.handleChange('nguonVao')}
                    onBlur={formik.handleBlur('nguonVao')}
                  />
                  <div className='error'>
                    {
                      formik.touched.nguonVao && formik.errors.nguonVao
                    }
                  </div>
                </div>
                <div className='mb-3'>
                  <input
                    type="text"
                    name="tienIch"
                    class="form-control"
                    placeholder="Tiện ích"
                    value={formik.values.tienIch}
                    onChange={formik.handleChange('tienIch')}
                    onBlur={formik.handleBlur('tienIch')}
                  />
                  <div className='error'>
                    {
                      formik.touched.tienIch && formik.errors.tienIch
                    }
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
                  <div className='showImages d-flex flex-wrap gap-3'>
                    {(uploadState && uploadState.publicId) && (
                      <div className='position-relative'>
                        <button type="button" onClick={() => dispatch(DeleteImg(uploadState.publicId))} className='btn-close position-absolute' style={{ top: "10px", right: "10px" }}></button>
                        <img src={uploadState.url} alt="" width={200} height={200} />
                      </div>
                    )}
                  </div>
                </div>
                <button className='btn btn-success' type='submit'> {getProductId!==undefined?"Edit":"Add"} Product</button>
              </form>
            </div>
          )
        }
        {
          productTypeSelect && productTypeSelect === 4 && (
            <div className='row border border-3 p-3 rounded-3 mt-3'>
              <form onSubmit={formik.handleSubmit}>
                <div className='mb-3'>
                  <select name="brandId"
                    type="number"
                    value={formik.values.brandId}
                    onChange={formik.handleChange('brandId')}
                    onBlur={formik.handleBlur('brandId')}
                    id='' className='form-control py-3 mb-3'>
                    <option value="">Danh sách hãng</option>
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
                <div className='mb-3'>
                  <input
                    type="text"
                    name="name"
                    class="form-control"
                    placeholder="Tên sản phẩm"
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
                <div className='mb-3'>
                  <input
                    type="text"
                    name="desc"
                    class="form-control"
                    placeholder="Mô tả"
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
                <div className='mb-3'>
                  <input
                    type="text"
                    name="hieuSuatSac"
                    class="form-control"
                    placeholder="Hiệu Suất Sạc"
                    value={formik.values.hieuSuatSac}
                    onChange={formik.handleChange('hieuSuatSac')}
                    onBlur={formik.handleBlur('hieuSuatSac')}
                  />
                  <div className='error'>
                    {
                      formik.touched.hieuSuatSac && formik.errors.hieuSuatSac
                    }
                  </div>
                </div>
                <div className='mb-3'>
                  <input
                    type="text"
                    name="thoiGianSacDayPin"
                    class="form-control"
                    placeholder="Thời gian sạc đầy pin"
                    value={formik.values.thoiGianSacDayPin}
                    onChange={formik.handleChange('thoiGianSacDayPin')}
                    onBlur={formik.handleBlur('thoiGianSacDayPin')}
                  />
                  <div className='error'>
                    {
                      formik.touched.thoiGianSacDayPin && formik.errors.thoiGianSacDayPin
                    }
                  </div>
                </div>
                <div className='mb-3'>
                  <input
                    type="text"
                    name="pin"
                    class="form-control"
                    placeholder="Pin"
                    value={formik.values.pin}
                    onChange={formik.handleChange('pin')}
                    onBlur={formik.handleBlur('pin')}
                  />
                  <div className='error'>
                    {
                      formik.touched.pin && formik.errors.pin
                    }
                  </div>
                </div>
                <div className='mb-3'>
                  <input
                    type="text"
                    name="nguonVao"
                    class="form-control"
                    placeholder="Nguồn vào"
                    value={formik.values.nguonVao}
                    onChange={formik.handleChange('nguonVao')}
                    onBlur={formik.handleBlur('nguonVao')}
                  />
                  <div className='error'>
                    {
                      formik.touched.nguonVao && formik.errors.nguonVao
                    }
                  </div>
                </div>
                <div className='mb-3'>
                  <input
                    type="text"
                    name="nguonRa"
                    class="form-control"
                    placeholder="Nguồn ra"
                    value={formik.values.nguonRa}
                    onChange={formik.handleChange('nguonRa')}
                    onBlur={formik.handleBlur('nguonRa')}
                  />
                  <div className='error'>
                    {
                      formik.touched.nguonRa && formik.errors.nguonRa
                    }
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
                  <div className='showImages d-flex flex-wrap gap-3'>
                    {(uploadState && uploadState.publicId) && (
                      <div className='position-relative'>
                        <button type="button" onClick={() => dispatch(DeleteImg(uploadState.publicId))} className='btn-close position-absolute' style={{ top: "10px", right: "10px" }}></button>
                        <img src={uploadState.url} alt="" width={200} height={200} />
                      </div>
                    )}
                  </div>
                </div>
                <button className='btn btn-success' type='submit'> {getProductId!==undefined?"Edit":"Add"} Product</button>
              </form>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default AddProduct