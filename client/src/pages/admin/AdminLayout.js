import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navigate, redirect } from 'react-router-dom';
import path from 'utils/path';
import icons from 'utils/icons';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import withBaseComponent from 'hocs/withBaseComponent';
const { Header, Sider, Content } = Layout;
const {
  AiOutlineDashboard, 
  HiOutlineUsers, 
  MdOutlineProductionQuantityLimits,
  BiPurchaseTag,
  ImBlog ,
  AiFillHome,
  MdOutlineDiscount
} = icons;

const AdminLayout = ({navigate}) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const {isLoggedIn, current} = useSelector(state => state.user)
  if (!isLoggedIn || !current || current.role !== 'admin') return <Navigate to={`/${path.LOGIN}`} replace={true} />
  
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo hover:cursor-pointer" onClick={() => navigate("/")} >
          <h1 className='text-white fs-5 text-center py-3 text-bold mb-0'>
            <span className='lg-logo'>TechShop</span>
            <span className='sm-logo'>TS</span>
          </h1>
        </div>
        <Menu
          onClick={({key}) => {
            if (key == 'home') {
              navigate('/');
            } else {
              navigate(key);
            }
          }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          items={[
            {
              key: 'dashboard',
              icon: <AiOutlineDashboard size={24}/>,
              label: 'Dashboard',
            },
            {
              key: 'manage-user',
              icon: <HiOutlineUsers size={24}/>,
              label: 'Users',
            },
            {
              key: 'Catalog',
              icon: <MdOutlineProductionQuantityLimits size={24}/>,
              label: 'Products',
              children: [
                {
                  key: 'manage-product',
                  icon: <MdOutlineProductionQuantityLimits size={24}/>,
                  label: 'Products List',
                },
                {
                  key: 'create-product',
                  icon: <MdOutlineProductionQuantityLimits size={24}/>,
                  label: 'Create Product',
                },
              ]
            },
            {
              key: 'manage-order',
              icon: <BiPurchaseTag size={24}/>,
              label: 'Orders',
            },
            {
              key: 'manage-blog',
              icon: <ImBlog size={24} />,
              label: 'Blogs',
              children: [
                  {
                    key: 'manage-blog',
                    icon: <ImBlog size={24}/>,
                    label: 'Blogs',
                  },
                  {
                    key: 'create-blog',
                    icon: <ImBlog size={24} />,
                    label: 'Create Blog',
                  },  
              ]
            },
            {
              key: 'manage-deal-daily',
              icon: <MdOutlineDiscount size={24} />,
              label: 'Deal Daily'
              
            },
            {
              key: 'home',
              icon: <AiFillHome size={24}/>,
              label: 'Home'
            }
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
        </Content>
      </Layout>
    </Layout>
  )
}

export default withBaseComponent(AdminLayout)

