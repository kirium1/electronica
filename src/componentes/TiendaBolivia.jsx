import { Link } from 'react-router-dom';
import { blue, green, yellow } from '@ant-design/colors';
import ModalCrearTienda from './ModalCrearTienda';
import ModalEliminarTienda from './ModalEliminarTienda';
import ModalEditarTienda from './ModalEditarTienda';

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
  
  let nombreEditar = '';

  export const TiendaBolivia = () => {
    // modal crear tienda 
    const successColor = '#52c41a';
    const [modalVisible, setModalVisible] = useState(false);

    const handleCancel = () => {
      setModalVisible(false);
    };

    const handleSubmit = values => {
      console.log(values);
      setModalVisible(false);
    };
    //fin crear tienda

    //Eliminar tienda bolivia
    const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
    const [nombreEliminarTiendaBolivia, setNombreEliminarTiendaBolivia] = useState('');
    const [urlEliminarTiendaBolivia, setUrlEliminarTiendaBolivia] = useState('');
    const [idTiendaBolivia, setIdTiendaBolivia] = useState(0);

    const handleCancelEliminar = () => {
      setModalEliminarVisible(false);
    };
    //fin eliminar tienda

    // Editar tienda bolivia 
    const [modalEditarVisible, setModalEditarVisible] = useState(false);
    const [nombreEditarTiendaBolivia, setNombreEditarTiendaBolivia] = useState('');
    const handleCancelEditar = () => {
      setModalEditarVisible(false);
    };

    ///
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
          render: (text) => text === '' ? '' : <a href={text} target="_blank" rel="noreferrer" >Enlace</a>,
        },
        {
          title: 'Estado',
          dataIndex: 'estado_tienda_bolivia',
          key: 'estado_tienda_bolivia',
          align: 'center',
          render: (text) => text == 1 ? <Badge status='success' text='Si' /> : <Badge status='error' text='No' /> ,
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
      // console.log(data);
      if(caso === 'Eliminar'){
        setIdTiendaBolivia(data.id_tienda_bolivia);
        setNombreEliminarTiendaBolivia(data.nombre_tienda);
        setUrlEliminarTiendaBolivia(data.url_tienda_bolivia);
        setModalEliminarVisible(true);
      }
      if(caso === 'Editar'){
        setNombreEditarTiendaBolivia(data.nombre_tienda);
        nombreEditar = data.nombre_tienda;
        console.log(nombreEditar);
        setModalEditarVisible(true);
      }
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
                <Space direction="horizontal" style={{width: '100%', justifyContent: 'center'}}><h2>Lista tiendas en bolivia</h2></Space>
                <Button type="primary" style={{ backgroundColor: successColor, borderColor: successColor }} onClick={() => setModalVisible(true)}> Crear Tienda </Button>
                <br />
                <br />
            <Table dataSource={tiendasBolivia} columns={columns} />;
          </Content>
        </Layout>
        <ModalCrearTienda visible={modalVisible} onCancel={handleCancel} onSubmit={handleSubmit} successColor={successColor} tiendasBolivia={tiendasBolivia} setTiendasBolivia={setTiendasBolivia} />
        <ModalEliminarTienda visible={modalEliminarVisible} onCancel={handleCancelEliminar} tiendasBolivia={tiendasBolivia} setTiendasBolivia={setTiendasBolivia} nombreEliminarTiendaBolivia={nombreEliminarTiendaBolivia} urlEliminarTiendaBolivia= {urlEliminarTiendaBolivia} idTiendaBolivia={idTiendaBolivia} />
        <ModalEditarTienda  visible={modalEditarVisible} onCancel={handleCancelEditar} nombreEditar={nombreEditar}  nombreEditarTiendaBolivia={nombreEditarTiendaBolivia} />
      </Layout>
    );
  };