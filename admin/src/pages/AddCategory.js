import React, { useEffect } from 'react';
import { Checkbox } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreateCategory, GetCategory, UpdateCategory, resetState } from '../features/categories/categorySlice';

const categorySchema = yup.object({
  title: yup.string().required('Title is Required'),
  status: yup.boolean()
});

const AddCategory = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getCategoryId = location.pathname.split("/")[3];
  const categoryState = useSelector(state => state?.category?.ACategory)
  useEffect(() => {
    if (getCategoryId !== undefined) {
      dispatch(GetCategory(getCategoryId))
    } else {
      dispatch(resetState())
    }
  }, [getCategoryId])
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryState?.title || "",
      status: categoryState?.status || false,
    },
    validationSchema: categorySchema,
    onSubmit: values => {
      if (getCategoryId !== undefined) {
        const data = { id: getCategoryId, data: { ...values, id: getCategoryId } }
        dispatch(UpdateCategory(data))
        dispatch(resetState())
      } else {
        dispatch(CreateCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState())
        }, 300)
      }
    },
  });
  return (
    <div>
      <h3 className='mb-4'>{getCategoryId !== undefined ? "Edit" : "Add"} Category</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className='mb-3'>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Title"
              value={formik.values.title}
              onChange={formik.handleChange('title')}
              onBlur={formik.handleBlur('title')}
            />
            <div className='error'>
              {
                formik.touched.title && formik.errors.title
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
          <button className='btn btn-success' type='submit'>{getCategoryId !== undefined ? "Edit" : "Add"} Category</button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;