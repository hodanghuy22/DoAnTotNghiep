import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Modal, Col } from 'react-bootstrap'
import { FaPlus, FaSearch } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { useDispatch } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom'
import { GetProduct, GetSearchProduct, GetSearchProductByNameAndCategory } from '../features/products/productSlice';
import FormatData from '../utils/FormatData';
import { Helmet } from 'react-helmet';

const Compare = ({ categoryId }) => {
    const dispatch = useDispatch();
    console.log(categoryId);
    const [Product1, setProduct1] = useState(null);
    const [Product2, setProduct2] = useState(null);
    const [Product3, setProduct3] = useState(null);
    const [ProductSearch, setProductSearch] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();
    const currentUrl = location.pathname;
    let { phones } = useParams();
    useEffect(() => {
        let ProductName1, ProductName2, ProductName3;

        if (phones.includes('-vs-')) {
            const parts = phones.split('-vs-');
            ProductName1 = parts[0].trim(); // Lấy phần tử đầu tiên và loại bỏ khoảng trắng
            if (parts.length === 2) {
                ProductName2 = parts[1].trim(); // Lấy phần tử thứ hai nếu có và loại bỏ khoảng trắng
                ProductName3 = ''; // Đặt ProductName3 là rỗng nếu chỉ có 2 phần tử
            } else if (parts.length === 3) {
                ProductName2 = parts[1].trim(); // Lấy phần tử thứ hai
                ProductName3 = parts[2].trim(); // Lấy phần tử thứ ba và loại bỏ khoảng trắng
            }
        } else {
            ProductName1 = phones.trim(); // Nếu không có -vs-, đặt ProductName1 và loại bỏ khoảng trắng
            ProductName2 = '';
            ProductName3 = '';
        }

        if (ProductName1) {
            dispatch(GetSearchProduct({
                searchQuery: FormatData.replaceHyphensWithSpaces(ProductName1)
            })).then(response => {
                setProduct1(response.payload[0]);
                console.log(ProductName1);
                console.log(response.payload[0]);
            });
        }

        if (ProductName2) {
            dispatch(GetSearchProduct({
                searchQuery: FormatData.replaceHyphensWithSpaces(ProductName2)
            })).then(response => {
                setProduct2(response.payload[0]);
                console.log(ProductName2);
                console.log(response.payload[0]);
            });
        }
        if (ProductName3) {
            dispatch(GetSearchProduct({
                searchQuery: FormatData.replaceHyphensWithSpaces(ProductName3)
            })).then(response => {
                setProduct3(response.payload[0]);
                console.log(ProductName3);
                console.log(response.payload[0]);
            });
        }
        console.log(currentUrl);
    }, [dispatch, currentUrl]);

    const handleAddPhone = (e) => {
        dispatch(GetProduct(e))
        handleClose()
    };
    const handleDeletePhone = (e) => {
        if (e === 1) {
            if (Product3 == null) {
                window.location.href = `/so-sanh/${FormatData.removeVietnameseTones(Product1?.category?.title)}/${FormatData.removeVietnameseTones(Product2?.name)}`;
            } else {
                window.location.href = `/so-sanh/${FormatData.removeVietnameseTones(Product1?.category?.title)}/${FormatData.removeVietnameseTones(Product2?.name)}-vs-${FormatData.removeVietnameseTones(Product3?.name)}`;
            }
        } else if (e === 2) {
            if (Product3 == null) {
                window.location.href = `/so-sanh/${FormatData.removeVietnameseTones(Product1?.category?.title)}/${FormatData.removeVietnameseTones(Product1?.name)}`;
            } else {
                window.location.href = `/so-sanh/${FormatData.removeVietnameseTones(Product1?.category?.title)}/${FormatData.removeVietnameseTones(Product1?.name)}-vs-${FormatData.removeVietnameseTones(Product3?.name)}`;
            }
        } else if (e === 3) {
            window.location.href = `/so-sanh/${FormatData.removeVietnameseTones(Product1?.category?.title)}/${FormatData.removeVietnameseTones(Product1?.name)}-vs-${FormatData.removeVietnameseTones(Product2?.name)}`;
        }
    }
    //Hiên thị modal danh sách sp
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submit search with term:', searchTerm);
        if (searchTerm === '') {
            setProductSearch([])
        }
        else {

            dispatch(GetSearchProductByNameAndCategory({
                searchQuery: FormatData.replaceHyphensWithSpaces(searchTerm),
                categoryId: categoryId
            })).then(response => {
                console.log({
                    searchQuery: FormatData.replaceHyphensWithSpaces(searchTerm),
                    categoryId: categoryId
                });
                setProductSearch(response?.payload);
            });
        }
        setSearchTerm('');
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const renderSpecifications = (specifications) => {
        return (
            <ul className="technical-content rounded-3 border">
                {specifications.map((spec, index) => (
                    <li key={index} className="d-flex align-items-center justify-content-between p-2 border-bottom">
                        <div className='col-3 border-right'>{spec.label}:</div>
                        <div className='col-9'>
                            {spec.value}
                        </div>
                    </li>
                ))}
            </ul>

        );
    };
    let specifications = [];
    switch (categoryId) {
        case 1:
            specifications = [
                {
                    label: 'Kích thước màn hình',
                    value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                {Product1?.size}
                            </div>

                            <div className='col-4'>
                                {Product2?.size}
                            </div>

                            <div className='col-4'>
                                {Product3?.size}
                            </div>
                        </div>
                    )
                },
                {
                    label: 'Công nghệ màn hình', value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                {Product1?.screen}
                            </div>

                            <div className='col-4'>
                                {Product2?.screen}
                            </div>
                            <div className='col-4'>
                                {Product3?.screen}
                            </div>
                        </div>
                    )
                },
                {
                    label: 'Camera sau', value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                {Product1?.rearCamera}
                            </div>

                            <div className='col-4'>
                                {Product2?.rearCamera}
                            </div>
                            <div className='col-4'>
                                {Product3?.rearCamera}
                            </div>
                        </div>
                    )
                },
                {
                    label: 'Camera trước', value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                {Product1?.frontCamera}
                            </div>

                            <div className='col-4'>
                                {Product2?.frontCamera}
                            </div>
                            <div className='col-4'>
                                {Product3?.frontCamera}
                            </div>
                        </div>
                    )
                },
                {
                    label: 'Chipset', value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                {Product1?.chip}
                            </div>

                            <div className='col-4'>
                                {Product2?.chip}
                            </div>
                            <div className='col-4'>
                                {Product3?.chip}
                            </div>
                        </div>
                    )
                },
                {
                    label: 'Dung lượng RAM', value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                {Product1?.ram}
                            </div>

                            <div className='col-4'>
                                {Product2?.ram}
                            </div>
                            <div className='col-4'>
                                {Product3?.ram}
                            </div>
                        </div>
                    )
                },
                {
                    label: 'Bộ nhớ trong', value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                {Product1?.rom}
                            </div>

                            <div className='col-4'>
                                {Product2?.rom}
                            </div>
                            <div className='col-4'>
                                {Product3?.rom}
                            </div>
                        </div>
                    )
                },
                {
                    label: 'Pin', value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                {Product1?.battery} {Product1?.chargingEfficiency}
                            </div>

                            <div className='col-4'>
                                {Product2?.battery} {Product2?.chargingEfficiency}
                            </div>
                            <div className='col-4'>
                                {Product3?.battery} {Product3?.chargingEfficiency}
                            </div>
                        </div>
                    )
                },
                {
                    label: 'Hệ điều hành', value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                {Product1?.os}
                            </div>

                            <div className='col-4'>
                                {Product2?.os}
                            </div>
                            <div className='col-4'>
                                {Product3?.os}
                            </div>
                        </div>
                    )
                },
                {
                    label: 'Trọng lượng', value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                {Product1?.weight}
                            </div>

                            <div className='col-4'>
                                {Product2?.weight}
                            </div>
                            <div className='col-4'>
                                {Product3?.weight}
                            </div>
                        </div>
                    )
                },
                {
                    label: 'Hãng', value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                {Product1?.brand?.title}
                            </div>

                            <div className='col-4'>
                                {Product2?.brand?.title}
                            </div>
                            <div className='col-4'>
                                {Product3?.brand?.title}
                            </div>
                        </div>
                    )
                },
            ];
            break;
        case 2:
            specifications = [
                {
                    label: 'Dung lượng pin', value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                {Product1?.battery}
                            </div>

                            <div className='col-4'>
                                {Product2?.battery}
                            </div>
                            <div className='col-4'>
                                {Product3?.battery}
                            </div>
                        </div>
                    )
                },
                {
                    label: 'Hiệu suất sạc', value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                {(Product1) ? (`${(Product1?.chargingEfficiency * 100)?.toFixed(0)}%`) : ('')}
                            </div>

                            <div className='col-4'>
                                {(Product2) ? (`${(Product2?.chargingEfficiency * 100)?.toFixed(0)}%`) : ('')}
                            </div>
                            <div className='col-4'>
                                {(Product3) ? (`${(Product3?.chargingEfficiency * 100)?.toFixed(0)}%`) : ('')}
                            </div>
                        </div>
                    )
                },
                {
                    label: 'Lõi pin', value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                {Product1?.batteryCore}
                            </div>

                            <div className='col-4'>
                                {Product2?.batteryCore}
                            </div>
                            <div className='col-4'>
                                {Product3?.batteryCore}
                            </div>
                        </div>
                    )
                },
                {
                    label: 'Công nghệ/Tiện ích', value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4' style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                {Product1?.features}
                            </div>
                            <div className='col-4' style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                {Product2?.features}
                            </div>
                            <div className='col-4' style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                {Product3?.features}
                            </div>
                        </div>
                    )
                },
                {
                    label: 'Thời gian sạc đầy pin', value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                {Product1?.chargingTime}
                            </div>

                            <div className='col-4'>
                                {Product2?.chargingTime}
                            </div>
                            <div className='col-4'>
                                {Product3?.chargingTime}
                            </div>
                        </div>
                    )
                },
                {
                    label: 'Nguồn vào', value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                {Product1?.input}
                            </div>

                            <div className='col-4'>
                                {Product2?.input}
                            </div>
                            <div className='col-4'>
                                {Product3?.input}
                            </div>
                        </div>
                    )
                },
                {
                    label: 'Nguồn ra', value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                <ul>
                                    {Product1?.output?.split(', ').map((tech, index) => (
                                        <li key={index}>
                                            {tech}
                                            <br />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='col-4'>
                                <ul>
                                    {Product2?.output?.split(', ').map((tech, index) => (
                                        <li key={index}>
                                            {tech}
                                            <br />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='col-4'>
                                <ul>
                                    {Product3?.output?.split(', ').map((tech, index) => (
                                        <li key={index}>
                                            {tech}
                                            <br />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )
                },
                {
                    label: 'Kích thước', value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                {Product1?.size}
                            </div>

                            <div className='col-4'>
                                {Product2?.size}
                            </div>
                            <div className='col-4'>
                                {Product3?.size}
                            </div>
                        </div>
                    )
                },
                {
                    label: 'Trọng lượng', value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                {Product1?.weight}
                            </div>

                            <div className='col-4'>
                                {Product2?.weight}
                            </div>
                            <div className='col-4'>
                                {Product3?.weight}
                            </div>
                        </div>
                    )
                },
                {
                    label: 'Hãng', value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                {Product1?.brand?.title}
                            </div>

                            <div className='col-4'>
                                {Product2?.brand?.title}
                            </div>
                            <div className='col-4'>
                                {Product3?.brand?.title}
                            </div>
                        </div>
                    )
                },
            ];
            break;
        case 3:
            specifications = [
                {
                    label: 'Thời lượng pin tai nghe',
                    value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                {`${Product1?.battery} ${Product1?.chargingTime}`}
                            </div>

                            <div className='col-4'>
                                {`${Product2?.battery} ${Product2?.chargingTime}`}
                            </div>
                            <div className='col-4'>
                                {`${Product3?.battery} ${Product3?.chargingTime}`}
                            </div>
                        </div>
                    )
                },
                {
                    label: 'Thời lượng pin hộp sạc',
                    value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                {Product1?.chargingCase}
                            </div>

                            <div className='col-4'>
                                {Product2?.chargingCase}
                            </div>
                            <div className='col-4'>
                                {Product3?.chargingCase}
                            </div>
                        </div>
                    )
                },
                {
                    label: 'Tương thích',
                    value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                <ul>
                                    {Product1?.accessibility?.split(',').map((tech, index) => (
                                        <li key={index}>
                                            {tech}
                                            <br />
                                        </li>
                                    ))}
                                </ul>

                            </div>

                            <div className='col-4'>
                                <ul>
                                    {Product2?.accessibility?.split(',').map((tech, index) => (
                                        <li key={index}>
                                            {tech}
                                            <br />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='col-4'>
                                <ul>
                                    {Product3?.accessibility?.split(',').map((tech, index) => (
                                        <li key={index}>
                                            {tech}
                                            <br />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )
                },
                {
                    label: 'Cổng sạc',
                    value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                {Product1?.input}
                            </div>

                            <div className='col-4'>
                                {Product2?.input}
                            </div>
                            <div className='col-4'>
                                {Product3?.input}
                            </div>
                        </div>
                    )
                },
                {
                    label: 'Công nghệ âm thanh',
                    value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                <ul>
                                    {Product1?.audioTechnology?.split('|').map((tech, index) => (
                                        <li key={index}>
                                            {tech}
                                            <br />
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className='col-4'>
                                <ul>
                                    {Product2?.audioTechnology?.split('|').map((tech, index) => (
                                        <li key={index}>
                                            {tech}
                                            <br />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='col-4'>
                                <ul>
                                    {Product3?.audioTechnology?.split('|').map((tech, index) => (
                                        <li key={index}>
                                            {tech}
                                            <br />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )
                },
                {
                    label: 'Kích thước',
                    value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                {Product1?.size}
                            </div>

                            <div className='col-4'>
                                {Product2?.size}
                            </div>
                            <div className='col-4'>
                                {Product3?.size}
                            </div>
                        </div>
                    )
                },
                {
                    label: 'Công nghệ kết nối',
                    value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                {Product1?.connectivity}
                            </div>

                            <div className='col-4'>
                                {Product2?.connectivity}
                            </div>
                            <div className='col-4'>
                                {Product3?.connectivity}
                            </div>
                        </div>
                    )
                },
                {
                    label: 'Hãng',
                    value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                {Product1?.brand?.title}
                            </div>

                            <div className='col-4'>
                                {Product2?.brand?.title}
                            </div>
                            <div className='col-4'>
                                {Product3?.brand?.title}
                            </div>
                        </div>
                    )
                },
            ];
            break;
        case 4:
            specifications = [
                // { label: 'Công nghệ âm thanh', value: product?.audioTechnology },
                {
                    label: 'Tương thích', value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                <ul>
                                    {Product1?.accessibility?.split('|').map((tech, index) => (
                                        <li key={index}>
                                            {tech}
                                            <br />
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className='col-4'>
                                <ul>
                                    {Product2?.accessibility?.split('|').map((tech, index) => (
                                        <li key={index}>
                                            {tech}
                                            <br />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='col-4'>
                                <ul>
                                    {Product3?.accessibility?.split('|').map((tech, index) => (
                                        <li key={index}>
                                            {tech}
                                            <br />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )
                },
                {
                    label: 'Jack cắm', value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                {Product1?.input}
                            </div>

                            <div className='col-4'>
                                {Product2?.input}
                            </div>
                            <div className='col-4'>
                                {Product3?.input}
                            </div>
                        </div>
                    )
                },
                {
                    label: 'Điều khiển bằng', value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                <ul>
                                    {Product1?.controls?.split('/').map((tech, index) => (
                                        <li key={index}>
                                            {tech}
                                            <br />
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className='col-4'>
                                <ul>
                                    {Product2?.controls?.split('/').map((tech, index) => (
                                        <li key={index}>
                                            {tech}
                                            <br />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='col-4'>
                                <ul>
                                    {Product3?.controls?.split('/').map((tech, index) => (
                                        <li key={index}>
                                            {tech}
                                            <br />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )
                },
                {
                    label: 'Kết nối cùng lúc', value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                {(Product1?.connectivity) ? (Product1?.connectivity) : ('Chưa cập nhật')}
                            </div>

                            <div className='col-4'>
                                {(Product2?.connectivity) ? (Product2?.connectivity) : ('Chưa cập nhật')}
                            </div>

                            <div className='col-4'>
                                {(Product3?.connectivity) ? (Product3?.connectivity) : ('Chưa cập nhật')}
                            </div>
                        </div>
                    )
                },
                {
                    label: 'Trọng lượng', value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                {(Product1?.weight) ? (Product1?.weight) : ('Chưa cập nhật')}
                            </div>
                            <div className='col-4'>
                                {(Product2?.weight) ? (Product2?.weight) : ('Chưa cập nhật')}
                            </div>
                            <div className='col-4'>
                                {(Product3?.weight) ? (Product3?.weight) : ('Chưa cập nhật')}
                            </div>
                        </div>
                    )
                },
                {
                    label: 'Hãng', value: (
                        <div className='d-flex w-100 px-4'>
                            <div className='col-4'>
                                {(Product1?.brand?.title) ? (Product1?.brand?.title) : ('Chưa cập nhật')}
                            </div>

                            <div className='col-4'>
                                {(Product2?.brand?.title) ? (Product2?.brand?.title) : ('Chưa cập nhật')}
                            </div>

                            <div className='col-4'>
                                {(Product3?.brand?.title) ? (Product3?.brand?.title) : ('Chưa cập nhật')}
                            </div>
                        </div>
                    )
                },
            ];
            break;
        default:
            return null;
    }
    return (
        <div>
            <Container>
                <Helmet>
                    <title>So sánh| HUBI</title>
                </Helmet>
                <Row className='d-flex justify-content-end w-100'>
                    <div className='col-3'>
                        <div className=' mt-5'>
                            <h6 className='' style={{ textTransform: 'uppercase' }}>
                                So sánh
                            </h6>
                            <p>{Product1?.name}</p>
                            <p> {Product2?.name ? ('&') : ('')} </p>
                            <p>{Product2?.name}</p>
                            <p> {Product3?.name ? ('&') : ('')} </p>
                            <p>{Product3?.name}</p>
                        </div>
                    </div>
                    <div className='col-3 d-flex justify-content-center'>
                        {Product1 ? (
                            <div className='p-3 text-center' style={{ marginBottom: '10px' }}>
                                <div className='d-flex justify-content-end'>
                                    <TiDelete style={{ fontSize: '20px' }} className={(Product2 == null) ? ('d-none') : ('d-block')} onClick={() => { handleDeletePhone(1) }} />
                                </div>
                                <div className='  bg-transparent' border='1' >
                                    <Link className="card-link" style={{ textDecoration: 'none', divor: 'inherit' }}>
                                        <div className='border-0 '>
                                            <img className='card-image mb-3' variant="top" src={Product1?.thumnailUrl} alt='zxczxc' width={'200px'} height={'200px'} />

                                            <div>
                                                <div>{Product1?.name}</div>
                                                <p className='text-danger font-size-bold amount'>
                                                    {
                                                        FormatData.formatNumber(Product1?.productDetails[0].retailPrice)
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div style={{ marginBottom: '10px' }} className=' p-3 text-center d-flex justify-content-center align-items-center '>
                                <Button
                                    className='bg-transparent text-info p-3'
                                    style={{ borderStyle: 'dashed' }}
                                    onClick={handleShow}
                                >
                                    <FaPlus style={{ fontSize: '30px' }} />
                                    <p>Thêm sản phẩm</p>
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className='col-3 d-flex justify-content-center'>
                        {Product2 ? (
                            <div className='p-3 text-center' style={{ marginBottom: '10px' }}>
                                <div className='d-flex justify-content-end'>
                                    <TiDelete style={{ fontSize: '20px' }} onClick={() => { handleDeletePhone(2) }} />
                                </div>
                                <div className='  bg-transparent' border='1' >
                                    <Link className="card-link" style={{ textDecoration: 'none', divor: 'inherit' }}>
                                        <div className='border-0 '>
                                            <img className='card-image mb-3' variant="top" src={Product2?.thumnailUrl} alt='zxczxc' width={'200px'} height={'200px'} />
                                            <div>
                                                <div>{Product2?.name}</div>
                                                <p className='text-danger font-size-bold amount'>
                                                    {
                                                        FormatData.formatNumber(Product2?.productDetails[0].retailPrice)
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div style={{ marginBottom: '10px' }} className=' p-3 text-center d-flex justify-content-center align-items-center '>
                                <Button
                                    className='bg-transparent text-info p-3'
                                    style={{ borderStyle: 'dashed' }}
                                    onClick={handleShow}
                                >
                                    <FaPlus style={{ fontSize: '30px' }} />
                                    <p>Thêm sản phẩm</p>
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className='col-3 d-flex justify-content-center'>
                        {Product3 ? (
                            <div className='p-3 text-center' style={{ marginBottom: '10px' }}>
                                <div className='d-flex justify-content-end'>
                                    <TiDelete style={{ fontSize: '20px' }} onClick={() => { handleDeletePhone(3) }} />
                                </div>
                                <div className='  bg-transparent' border='1' >
                                    <Link className="card-link" style={{ textDecoration: 'none', divor: 'inherit' }}>
                                        <div className='border-0 '>
                                            <img className='card-image mb-3' variant="top" src={Product3?.thumnailUrl} alt='zxczxc' width={'200px'} height={'200px'} />
                                            <div>
                                                <div>{Product3?.name}</div>
                                                <p className='text-danger font-size-bold amount'>
                                                    {
                                                        FormatData.formatNumber(Product3?.productDetails[0].retailPrice)
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div style={{ marginBottom: '10px' }} className=' p-3 text-center d-flex justify-content-center align-items-center '>
                                <Button
                                    className='bg-transparent text-info p-3'
                                    style={{ borderStyle: 'dashed' }}
                                    onClick={handleShow}
                                >
                                    <FaPlus style={{ fontSize: '30px' }} />
                                    <p>Thêm sản phẩm</p>
                                </Button>
                            </div>
                        )}
                    </div>
                </Row>

                <Row>
                    <h4 className='text-uppercase'>Thông tin cơ bản</h4>
                </Row>
                <Row className='w-100'>
                    <div className='shadow p-3 mb-5 bg-body rounded-3-'>
                        <div className="is-flex is-justify-content-space-between is-align-items-center"><h2 className="title is-6 mb-3">Thông số kỹ thuật</h2>
                        </div>
                        {renderSpecifications(specifications)}
                    </div>
                </Row>
            </Container>
            <Modal
                show={show}
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                size='xl'
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Tìm sản phẩm để so sánh</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container style={{ height: '60vh', overflow: 'scroll' }}>
                        <Row >
                            <Col className='col-4 mb-4'>
                                <form onSubmit={handleSubmit} className='w-100'>
                                    <div className='d-flex w-100 px-4'>
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={handleChange}
                                            id="text-search"
                                            placeholder="Bạn tìm gì"
                                            aria-label="Bạn tìm gì"
                                            className='w-100 p-2'
                                        />
                                        <button type="submit" className='px-2'><FaSearch /></button>
                                    </div>
                                </form>
                            </Col>
                        </Row>
                        <Row>
                            {
                                ProductSearch && ProductSearch?.map((item, index) => {
                                    return (
                                        <Col xl={3} md={4} sm={6} className='' key={index}>
                                            <Link to={`${currentUrl}-vs-${FormatData.removeVietnameseTones(item?.name)}`} className="card-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <div className='p-3'>
                                                    <img className='card-image' width={"200px"} height={'200px'} src={item?.thumnailUrl} alt={item.name} />
                                                    <div className='mt-4'>
                                                        <p className='text-title'>{item.name}</p>
                                                        <div>
                                                            <p className='text-price  font-size-bold amount' >
                                                                {FormatData.formatNumber(item.productDetails[0].retailPrice)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Button className='w-100' onClick={() => { handleAddPhone(item.id) }}>
                                                        <FaPlus /> So sánh ngay
                                                    </Button>
                                                </div>
                                            </Link>
                                        </Col>
                                    )
                                })

                            }
                        </Row>
                    </Container>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default Compare

