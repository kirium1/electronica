import { Link } from 'react-router-dom';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ShopOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
  import { Layout, Menu, theme, Table } from 'antd';
  import React, { useState } from 'react';
  const { Header, Sider, Content } = Layout;
  const URL_DEPARTAMENTO = "http://localhost/electronica/controlador/c_departamento.php";

  let index = 3;

  // const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  //   const key = String(index + 1);
  //   return {
  //     key: `sub${key}`,
  //     icon: React.createElement(icon),
  //     label: `subnav ${key}`,
      
  //   };
  // });

  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  export const MyDashboard = () => {

    // useLayoutEffect(() => {
    //   getListaTiendasBolivia();
    // }, []);
    
    // const getListaTiendasBolivia = async () => {
    //   const settings = {
    //       method: 'POST',
    //       body: JSON.stringify({metodo:'listarTiendasBolivia'}),
    //       headers: {
    //           Accept: 'application/json',
    //           'Content-Type': 'application/json',
    //       }
    //   };
    //   try {
    //       const fetchResponse = await fetch(URL_DEPARTAMENTO, settings);
    //       const data = await fetchResponse.json();
    //       // console.log(data);
    //       setData(data);
    //       return data;
    //   } catch (e) {
    //       return e;
    //   }    
    // }

    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer },
    } = theme.useToken();
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              
              {
                key: '1',
                icon: <UserOutlined />,
                label: <Link to="/Home">Home</Link>,
              },
              {
                key: '2',
                icon: <VideoCameraOutlined />,
                label: 'nav 2',
                children: [{ label: 'item 4', key: 'submenu-item-1' } , { label: 'item 3', key: 'submenu-item-2' }, { label: 'item 3', key: 'submenu-item-2' } ],
              },
              {
                key: '3',
                icon: <ShopOutlined />,
                label: <Link to="/Home">Tiendas en bolivia</Link>,
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            style={{
              padding: 5,
              marginLeft: 20,
              background: colorBgContainer,
            }}
          >   
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
            <span>           </span> Cabezera
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Table dataSource={dataSource} columns={columns} />;
          </Content>
        </Layout>
      </Layout>
    );
  };