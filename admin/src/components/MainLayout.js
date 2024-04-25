import React, { useState } from 'react';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import { MdDashboard } from "react-icons/md";
import { FaUserPlus, FaUser, FaUserGroup  } from "react-icons/fa6";
import { GrCapacity } from "react-icons/gr";
import { TbBrand4Chan, TbBrandAbstract, TbBrandAdobe  } from "react-icons/tb";
import { PiSignOut } from "react-icons/pi";
import { useDispatch } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Layout, Menu, Button, theme } from 'antd';
import { Logout } from '../features/auths/authSlice';

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
              key: 'capacity-cata',
              icon: <GrCapacity className='fs-5' />,
              label: 'Capacities',
              children: [
                {
                  key: 'capacity',
                  icon: <GrCapacity className='fs-5' />,
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
                  icon: <TbBrandAbstract className='fs-5' />,
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