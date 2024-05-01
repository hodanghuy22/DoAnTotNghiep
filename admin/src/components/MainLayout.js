import React, { useState } from 'react';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import { MdCategory, MdColorLens, MdDashboard } from "react-icons/md";
import { FaUserPlus, FaUser, FaUserGroup, FaProductHunt  } from "react-icons/fa6";
import { GrCapacity } from "react-icons/gr";
import { TbBrand4Chan, TbBrandAbstract, TbBrandAdobe, TbSlideshow  } from "react-icons/tb";
import { PiSignOut } from "react-icons/pi";
import { useDispatch } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Layout, Menu, Button, theme } from 'antd';
import { Logout } from '../features/auths/authSlice';
import { IoColorWandSharp } from 'react-icons/io5';
import { ImPlus } from 'react-icons/im';
import { RiSlideshowLine } from 'react-icons/ri';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo"></div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key === 'signout') {
              dispatch(Logout());
              navigate('/');
            }
            else {
              navigate(key);
            }
          }}
          items={[
            {
              key: '',
              icon: <MdDashboard  className='fs-5' />,
              label: 'Dashboard',
            },
            {
              key: 'user',
              icon: <FaUser className='fs-5' />,
              label: 'Users',
              children: [
                {
                  key: 'add-admin',
                  icon: <FaUserPlus className='fs-5' />,
                  label: 'Add Admin',
                },
                {
                  key: 'user-list',
                  icon: <FaUserGroup  className='fs-5' />,
                  label: 'List User',
                },
              ]
            },
            {
              key: 'product-cata',
              icon: <FaProductHunt  className='fs-5' />,
              label: 'Products',
              children: [
                {
                  key: 'product',
                  icon: <ImPlus className='fs-5' />,
                  label: 'Add Product',
                },
                {
                  key: 'product-list',
                  icon: <FaProductHunt   className='fs-5' />,
                  label: 'List Products',
                },
                {
                  key: 'productDetail',
                  icon: <ImPlus className='fs-5' />,
                  label: 'Add product Detail',
                },
                {
                  key: 'productDetail-list',
                  icon: <FaProductHunt   className='fs-5' />,
                  label: 'List product Detail',
                },
              ]
            },
            {
              key: 'capacity-cata',
              icon: <GrCapacity className='fs-5' />,
              label: 'Capacities',
              children: [
                {
                  key: 'capacity',
                  icon: <ImPlus className='fs-5' />,
                  label: 'Add Capacity',
                },
                {
                  key: 'capacity-list',
                  icon: <GrCapacity  className='fs-5' />,
                  label: 'List Capacity',
                },
              ]
            },
            {
              key: 'brand-cata',
              icon: <TbBrand4Chan className='fs-5' />,
              label: 'Brands',
              children: [
                {
                  key: 'brand',
                  icon: <ImPlus className='fs-5' />,
                  label: 'Add Brand',
                },
                {
                  key: 'brand-list',
                  icon: <TbBrandAdobe  className='fs-5' />,
                  label: 'List Brand',
                },
              ]
            },
            {
              key: 'color-cata',
              icon: <MdColorLens  className='fs-5' />,
              label: 'Colors',
              children: [
                {
                  key: 'color',
                  icon: <ImPlus  className='fs-5' />,
                  label: 'Add Color',
                },
                {
                  key: 'color-list',
                  icon: <IoColorWandSharp   className='fs-5' />,
                  label: 'List Color',
                },
              ]
            },
            {
              key: 'category-cata',
              icon: <MdCategory   className='fs-5' />,
              label: 'Categories',
              children: [
                {
                  key: 'category',
                  icon: <ImPlus   className='fs-5' />,
                  label: 'Add Category',
                },
                {
                  key: 'category-list',
                  icon: <MdCategory    className='fs-5' />,
                  label: 'List Category',
                },
              ]
            },
            {
              key: 'slideshow-cata',
              icon: <TbSlideshow className='fs-5' />,
              label: 'Slideshows',
              children: [
                {
                  key: 'slideshow',
                  icon: <ImPlus   className='fs-5' />,
                  label: 'Add Category',
                },
                {
                  key: 'slideshow-list',
                  icon: <RiSlideshowLine className='fs-5' />,
                  label: 'List Category',
                },
              ]
            },
            {
              key: 'signout',
              icon: <PiSignOut  className='fs-5' />,
              label: 'Sign Out',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;