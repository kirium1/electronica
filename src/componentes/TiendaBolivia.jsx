import { Link } from 'react-router-dom';
import { blue, green, yellow } from '@ant-design/colors';
// import Button from 'react-bootstrap/Button';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ShopOutlined,
    UserOutlined,
    TagOutlined,
    StarOutlined
  } from '@ant-design/icons';
  import { Layout, Menu, theme, Table, Button, Modal, Form, Input , Select, InputNumber, message, Col, Row, Badge, Radio, Popconfirm, Space } from 'antd';
  import React, { useState, useLayoutEffect, useRef } from 'react';
  const { Header, Sider, Content } = Layout;
  const TIENDA_BOLIVIA = "http://localhost/electronica/controlador/c_tienda_bolivia.php";

  export const TiendaBolivia = () => {
    const [tiendasBolivia,setTiendasBolivia] = useState([]);

    useLayoutEffect(() => {
        getListaTiendasBolivia();
    }, []);

    const columns = [
        {
          title: 'ID',
          dataIndex: 'id_tienda_bolivia',
          key: 'id_tienda_bolivia',
          align: 'center',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.id_tienda_bolivia - b.id_tienda_bolivia,
        },
        {
          title: 'Nombre',
          dataIndex: 'nombre_tienda',
          key: 'nombre_tienda',
          align: 'center',
        },
        {
          title: 'direccion',
          dataIndex: 'url_tienda_bolivia',
          key: 'url_tienda_bolivia',
        },
        {
          title: 'Estado',
          dataIndex: 'estado_tienda_bolivia',
          key: 'estado_tienda_bolivia',
          align: 'center',
        },
        {
          title: 'Acciones',
          dataIndex: 'acciones',
          render: (tienda,data) => (
            <>
              <Button type='primary' onClick={()=>seleccionarTienda(tienda,data,"Editar")}>Editar</Button> {"  "}
              <Button type='primary' onClick={()=>seleccionarTienda(tienda,data,"Eliminar")}danger>Eliminar</Button>
            </>)
        }
    ];

    const seleccionarTienda = (tienda ,data,caso)=>{
        console.log('click');
    }

    const getListaTiendasBolivia = async () => {
        const settings = {
            method: 'POST',
            body: JSON.stringify({metodo:'listarTiendasBolivia'}),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        };
        try {
            const fetchResponse = await fetch(TIENDA_BOLIVIA, settings);
            const datos = await fetchResponse.json();
            setTiendasBolivia(datos);
            return datos;
        } catch (e) {
            return e;
        }    
      }

    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer },
    } = theme.useToken();
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed} style={{minHeight:'100vh'}}>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['2']}
                items={[
                {
                    key: '1',
                    icon: <StarOutlined />,
                    label: <Link to="/Productos">Productos</Link>,
                },
                {
                    key: '2',
                    icon: <ShopOutlined />,
                    label: <Link to="/tiendaBolivia">Tiendas Bolivia</Link>,
                },
                {
                    key: '3',
                    icon: <ShopOutlined />,
                    label: <Link to="/Home">Tiendas Aliexpress</Link>,
                },
                {
                    key: '4',
                    icon: <TagOutlined />,
                    label: <Link to="/Categoria">Categorias</Link>,
                },
                {
                    key: '6',
                    icon: <UserOutlined />,
                    label: <Link to="/Usuarios">Usuarios</Link>,
                },
                ]}
            />
        </Sider>
        <Layout className="site-layout">
          <Header style={{ padding: 5, marginLeft: 15, background: colorBgContainer,}}>   
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
            <span>   </span> Minimizar 
          </Header>
            <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: colorBgContainer, }}>
                <Space direction="horizontal" style={{width: '100%', justifyContent: 'center'}}><h2>Lista tiendas</h2></Space>
            <Table dataSource={tiendasBolivia} columns={columns} />;
          </Content>
        </Layout>
      </Layout>
    );
  };