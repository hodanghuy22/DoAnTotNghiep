import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { UpdateUser } from '../../features/auths/authSlice';

const infoSchema = yup.object({
    name: yup.string().required('Chưa nhập tên'),
    age: yup.number()
    .moreThan(0, 'Giá trị phải lớn hơn 0'),
    phoneNumber: yup.string()
    .matches(/^(0\d{9})$/, 'Số điện thoại không hợp lệ'),
    address: yup.string(),
});

const InfoAccount = () => {
    const dispatch = useDispatch()
    const userState = useSelector(state => state?.auth?.user);
    const formik = useFormik({
        initialValues: {
            id: userState?.id,
            name: userState?.name || '',
            age: userState?.age || '',
            phoneNumber: userState?.phoneNumber || '',
            address: userState?.address || '',
            email: userState?.email,
            userName: userState?.userName,
            token: userState?.token,
            expiration: userState?.expiration,
        },
        validationSchema: infoSchema,
        onSubmit: values => {
            const data = { id: userState.id, data: values }
            dispatch(UpdateUser(data))
        },
    });
    return (
        <div className='p-5'>
            <div className=''>
                <div>
                    <p>THÔNG TIN TẢI KHOẢN</p>
                </div>
                <div className=''>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='d-flex p-2 mb-3'>
                            <div className='col-3 mt-1'>
                                <p>Họ tên</p>
                            </div>
                            <div className='col-8'>
                                <input
                                    type='text'
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange('name')}
                                    onBlur={formik.handleBlur('name')}
                                    className='text-dark w-100 p-2'
                                />
                                <div className='error'>
                                    {
                                        formik.touched.name && formik.errors.name
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='d-flex p-2 mb-3'>
                            <div className='col-3 mt-1'>
                                <p>Tuổi</p>
                            </div>
                            <div className='col-8'>
                                <input
                                    type='numbet'
                                    name="age"
                                    value={formik.values.age}
                                    onChange={formik.handleChange('age')}
                                    onBlur={formik.handleBlur('age')}
                                    className='text-dark w-100 p-2'
                                />
                                <div className='error'>
                                    {
                                        formik.touched.age && formik.errors.age
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='d-flex p-2 mb-3'>
                            <div className='col-3 mt-1'>
                                <p>Số điện thoại</p>
                            </div>
                            <div className='col-8'>
                                <input
                                    type='text'
                                    name="phoneNumber"
                                    value={formik.values.phoneNumber}
                                    onChange={formik.handleChange('phoneNumber')}
                                    onBlur={formik.handleBlur('phoneNumber')}
                                    className='text-dark w-100 p-2'
                                />
                                <div className='error'>
                                    {
                                        formik.touched.phoneNumber && formik.errors.phoneNumber
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='d-flex p-2 mb-3'>
                            <div className='col-3 mt-1'>
                                <p>Địa chỉ</p>
                            </div>
                            <div className='col-8'>
                                <input
                                    type='text'
                                    name="address"
                                    value={formik.values.address}
                                    onChange={formik.handleChange('address')}
                                    onBlur={formik.handleBlur('address')}
                                    className='text-dark w-100 p-2'
                                />
                                <div className='error'>
                                    {
                                        formik.touched.address && formik.errors.address
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='d-flex p-2'>
                        <div className='col-3 mt-1'>
                        </div>
                        <div className='col-8 '>
                            <button type='submit' className='w-100 btn bg-danger p-2 text-light fw-bold mb-2'>Lưu thay đổi</button>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default InfoAccount
