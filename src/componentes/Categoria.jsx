import { Link } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined, 
  UserOutlined,
  TagOutlined,
  StarOutlined,
  SmileOutlined,
  DeleteOutlined,
  PlusOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme, Table, Button, Modal, Form, Input , Select, Col, Row, Badge, Space, notification, Typography } from 'antd';
import React, { useState, useLayoutEffect, useRef } from 'react';
const { Header, Sider, Content } = Layout;
const CATEGORIA = "http://localhost/electronica/controlador/c_categoria.php";

  export const Categoria = () => {
    const { Option } = Select;
    const [formAgregar] = Form.useForm();
    const { Text, Link } = Typography;

    // modal crear tienda 
    const successColor = '#52c41a';
    const [modalVisibleAgregar, setModalVisibleAgregar] = useState(false);

    const handleCancelAgregar = () => {
      setModalVisibleAgregar(false);
    };

    const handleSubmitAgregar = () => {
      // setModalVisibleAgregar(false);
      formAgregar.validateFields().then(values => {
        // formAgregar.resetFields();
        // onSubmit(values);
        values.metodo = 'agregarCategoria';
        agregarCategoria(values);
      });
    };

    const agregarCategoria = async (values) => {     
      console.log(values);
      const resp = await fetch(CATEGORIA, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' }
      });
      const datos = await resp.json();
      if(Number.isInteger(datos.respuesta)){
        formAgregar.resetFields();
        handleCancelAgregar();
        let nuevoElemento = {'id_categoria':datos.respuesta, 'nombre_categoria': values.nombre, 
        'estado_categoria':values.estado,'descripcion_categoria':values.descripcion};
        setCategorias([...categorias, nuevoElemento]);
        notification.open({
          message: 'Exito',
          description:
            `Se ha agregado una nueva categoria ${values.nombre}`,
          icon: (
            <SmileOutlined
              style={{
                color: '#108ee9',
              }}
            />
          ),
        });
      }
    };
    //fin crear tienda

    //Eliminar tienda bolivia
    const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
    const [nombreCategoria, setNombreCategoria] = useState('');
    const [idCategoria, setIdCategoria] = useState(0);

    const handleCancelEliminar = () => {
      setModalEliminarVisible(false);
    };

    const handleSubmitEliminar = () => {
      eliminarCategoria();
    };

    const eliminarCategoria = async () =>{
      const settings = {
        method: 'POST',
        body: JSON.stringify({metodo:'eliminarCategoria',idCategoria}),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
      };
      try {
          const fetchResponse = await fetch(CATEGORIA, settings);
          const datos = await fetchResponse.json();
          setModalEliminarVisible(false);
          if(datos.respuesta === true){
            let nuevoArreglo = categorias.filter((item) => item.id_categoria !== idCategoria);
            setCategorias(nuevoArreglo);
            notification.open({
              message: 'Exito',
              description:
                `Se ha elimando la categoria ${nombreCategoria} correctamente!!`,
              icon: (
                <SmileOutlined
                  style={{
                    color: '#108ee9',
                  }}
                />
              ),
            });
          }else{
            notification.open({
              message: 'Error',
              description:
                `Error se produjo en ${datos.respuesta}`,
              icon: (
                <CloseCircleOutlined
                  style={{
                    color: '#cf1322',
                  }}
                />
              ),
            });
          }
          // setCategorias(datos);
          return datos;
      } catch (e) {
          return e;
      }    
    }

    //fin eliminar tienda

    // Editar tienda bolivia 
    const [modalEditarVisible, setModalEditarVisible] = useState(false);
    const [editarTienda, setEditarTienda] = useState({
      nombre:'prueba',
      direccion:'url prueba'
    });

    const handleCancelEditar = () => {
      setModalEditarVisible(false);
    };

    const handleSubmitActualizar = () => {
      formAgregar.validateFields().then(values => {
        // form.resetFields();
        // onSubmit(values);
        values.metodo = 'actualizarTiendaBolivia';
        values.idCategoria = idCategoria;
        actualizarTiendaBolivia(values);
      });
    };

    ///
    const [categorias,setCategorias] = useState([]);

    useLayoutEffect(() => {
      getListaCategorias();
    }, []);

    const columns = [
        {
          title: 'ID',
          dataIndex: 'id_categoria',
          key: 'id_categoria',
          align: 'center',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.id_categoria - b.id_categoria,
        },
        {
          title: 'Nombre',
          dataIndex: 'nombre_categoria',
          key: 'nombre_categoria',
          align: 'center',
        },
        {
          title: 'Descripcion',
          dataIndex: 'descripcion_categoria',
          key: 'descripcion_categoria',
        },
        {
          title: 'Estado',
          dataIndex: 'estado_categoria',
          key: 'estado_categoria',
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
      setIdCategoria(data.id_categoria);
      if(caso === 'Eliminar'){
        setNombreCategoria(data.nombre_categoria);
        setModalEliminarVisible(true);
      }
      if(caso === 'Editar'){
        formAgregar.setFieldsValue({ nombre: data.nombre_tienda });
        formAgregar.setFieldsValue({ direccion: data.url_tienda_bolivia });
        formAgregar.setFieldsValue({ estado: data.estado_tienda_bolivia });
        setModalEditarVisible(true);
      }
    }

    const actualizarTiendaBolivia = async (values) => {     
      console.log(values);
      const resp = await fetch(CATEGORIA, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' }
      });
      const respuesta = await resp.json();
      console.log(respuesta);
      setModalEditarVisible(false);
      if(respuesta.respuesta === 1){
        formAgregar.resetFields();
        // let nuevoElemento = {'id_tienda_bolivia':respuesta.respuesta, 'nombre_tienda': values.nombre, 
        // 'estado_tienda_bolivia':values.estado,'url_tienda_bolivia':values.direccion};
        // setTiendasBolivia([...tiendasBolivia, nuevoElemento])
        getListaCategorias();
      }
    };

    const getListaCategorias = async () => {
      const settings = {
        method: 'POST',
        body: JSON.stringify({metodo:'listarCategorias'}),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
      };
      try {
          const fetchResponse = await fetch(CATEGORIA, settings);
          const datos = await fetchResponse.json();
          setCategorias(datos);
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
                defaultSelectedKeys={['4']}
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
                <Space direction="horizontal" style={{width: '100%', justifyContent: 'center'}}><h2>Lista categorias</h2></Space>
                <Button type="primary" style={{ backgroundColor: successColor, borderColor: successColor }} onClick={() => setModalVisibleAgregar(true)}> Crear Categoria </Button>
                <br />
                <br />
            <Table dataSource={categorias} columns={columns} pagination={{ pageSize: 50 }} />;
          </Content>
        </Layout>
        <Modal
        open={modalVisibleAgregar}
        title={<><PlusOutlined  style={{color:'#73d13d',fontSize: '18px'}} /> Crear categoria </>}
        onCancel={handleCancelAgregar}
        footer={[ <Button key="cancel" onClick={handleCancelAgregar}> Cancel </Button>,    
        <Button key="submit" type="primary" style={{ backgroundColor: successColor, borderColor: successColor }} onClick={handleSubmitAgregar}>Agregar </Button>,]}>
          <hr />
          <Form form={formAgregar} layout="vertical">
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="nombre" label="Nombre" rules={[{ required: true, message: 'Escriba el nombre de la categoria!' }]}>
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
                    <Form.Item name="descripcion" label="Descripcion" rules={[{ required: true, message: 'Escriba la descripcion de la categoria!' }]}>
                        {/* <Input/> */}
                        <Input.TextArea showCount maxLength={5000}/>
                    </Form.Item>
                </Col>
            </Row>
          </Form>

        </Modal>
        
        <Modal open={modalEliminarVisible} title={<><DeleteOutlined style={{color: '#f5222d', fontSize: '18px'}} /> Eliminar categoria </>} onCancel={handleCancelEliminar}
            footer={[<Button onClick={handleCancelEliminar} type='primary' danger>Cancelar</Button>, <Button type='primary' onClick={handleSubmitEliminar} key="submit" htmlType="submit" >Eliminar</Button> ]}>
            <hr />
            <br />
            <Form style={{maxWidth: 600,}} initialValues={{remember: true,}} autoComplete="off">
              <span>¿Usted esta deacuerdo con eliminar la categoria con nombre <strong>{nombreCategoria}</strong>?</span>
              <br />
              <br />
              <Text type="danger">*Solo podra eliminar si no existe algun prodcto relacionado con la categoria</Text>
            </Form>
        </Modal>
        
        
        <Modal 
        open={modalEditarVisible}
        title={<><PlusOutlined  style={{color:'#73d13d',fontSize: '18px'}} /> Editar tienda Bolivia </>}
        onCancel={handleCancelEditar}
        footer={[ <Button key="cancel" onClick={handleCancelEditar}> Cancel </Button>,    
        <Button key="submit" type="primary" style={{ backgroundColor: successColor, borderColor: successColor }} onClick={handleSubmitActualizar}>Actualizar </Button>,]}>
            <hr />
            <br />
          <Form  layout="vertical" initialValues={editarTienda}>
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