import { Link } from 'react-router-dom';
import { blue, green, yellow } from '@ant-design/colors';
import ModalCrearTienda from './ModalCrearTienda';
import ModalEliminarTienda from './ModalEliminarTienda';
import { PlusOutlined } from '@ant-design/icons';
// import ModalEditarTienda from './ModalEditarTienda';

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
    const { Option } = Select;
    const [form] = Form.useForm();

    // modal crear tienda 
    const successColor = '#52c41a';
    const [modalVisible, setModalVisible] = useState(false);

    const handleCancel = () => {
      setModalVisible(false);
    };

    const handleSubmit = values => {
      // console.log(values);
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
    const [editarTienda, setEditarTienda] = useState({
      nombre:'prueba',
      direccion:'url prueba'
    });

    const handleCancelEditar = () => {
      form.resetFields();
      setModalEditarVisible(false);
    };

    const handleSubmitActualizar = () => {
      form.validateFields().then(values => {
        // form.resetFields();
        // onSubmit(values);
        values.metodo = 'actualizarTiendaBolivia';
        values.idTiendaBolivia = idTiendaBolivia;
        actualizarTiendaBolivia(values);
      });
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
      console.log(data);
      setIdTiendaBolivia(data.id_tienda_bolivia);
      if(caso === 'Eliminar'){
        setNombreEliminarTiendaBolivia(data.nombre_tienda);
        setUrlEliminarTiendaBolivia(data.url_tienda_bolivia);
        setModalEliminarVisible(true);
      }
      if(caso === 'Editar'){
        form.setFieldsValue({ nombre: data.nombre_tienda });
        form.setFieldsValue({ direccion: data.url_tienda_bolivia });
        form.setFieldsValue({ estado: data.estado_tienda_bolivia });
        setModalEditarVisible(true);
      }
    }

    const actualizarTiendaBolivia = async (values) => {     
      console.log(values);
      const resp = await fetch(TIENDA_BOLIVIA, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' }
      });
      const respuesta = await resp.json();
      console.log(respuesta);
      setModalEditarVisible(false);
      if(respuesta.respuesta === 1){
        form.resetFields();
        // let nuevoElemento = {'id_tienda_bolivia':respuesta.respuesta, 'nombre_tienda': values.nombre, 
        // 'estado_tienda_bolivia':values.estado,'url_tienda_bolivia':values.direccion};
        // setTiendasBolivia([...tiendasBolivia, nuevoElemento])
        getListaTiendasBolivia();
      }
    };

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
        <Modal 
        open={modalEditarVisible}
        title={<><PlusOutlined  style={{color:'#73d13d',fontSize: '18px'}} /> Editar tienda Bolivia </>}
        onCancel={handleCancelEditar}
        footer={[ <Button key="cancel" onClick={handleCancelEditar}> Cancel </Button>,    
        <Button key="submit" type="primary" style={{ backgroundColor: successColor, borderColor: successColor }} onClick={handleSubmitActualizar}>Actualizar </Button>,]}>
            <hr />
            <br />
          <Form form={form} layout="vertical" initialValues={editarTienda}>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="nombre" label="Nombre" rules={[{ required: true, message: 'Escriba el nombre de la tienda!' }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="estado" label="Estado" rules={[{ required: true, message: 'Seleccione el estado!' }]}>
                        <Select placeholder="Seleccione una opcion">
                            <Option value="1">Si</Option>
                            <Option value="0">No</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Form.Item name="direccion" label="Direccion" rules={[{ required: true, message: 'Escriba la direccion url de la tienda!' }]}>
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>
          </Form>
        </Modal>
      </Layout>
    );
  };