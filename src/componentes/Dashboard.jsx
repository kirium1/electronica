import { Link } from 'react-router-dom';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ShopOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
  import { Layout, Menu, theme, Table, Button, Modal, Form, Input , Select, InputNumber  } from 'antd';
  import React, { useState, useLayoutEffect } from 'react';
  const { Header, Sider, Content } = Layout;
  const URL_DEPARTAMENTO = "http://localhost/electronica/controlador/c_tienda.php";
  const URL_PRODUCTO = "http://localhost/electronica/controlador/c_producto.php";

  // const dataSource = [];

  export const MyDashboard = () => {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id_producto',
        key: 'id_producto',
      },
      {
        title: 'Nombre',
        dataIndex: 'nombre_producto',
        key: 'nombre_producto',
      },
      {
        title: 'Detalle',
        dataIndex: 'detalle_producto',
        key: 'detalle_producto',
      },
      {
        title: 'Precio',
        dataIndex: 'precio_estandar',
        key: 'precio_estandar',
      },
      {
        title: 'Acciones',
        dataIndex: 'acciones',
        render: (producto,data) => (
          <>
            <Button type='primary' onClick={()=>seleccionarProducto(producto,data,"Editar")}>Editar</Button> {"  "}
            <Button type='primary' danger>Eliminar</Button>
          </>)
      }
    ];

    const [producto,setProducto] = useState({
      id:"",
      metodo:"agregarProducto",
      nombre:"",
      precio:"",
      detalle:"",
      estado: "1"
    });

    const [idProducto,setIdProducto] = useState(0);
    const [nombreEditar,setNombreEditar] = useState('');
    const [detalleEditar,setDetalleEditar] = useState('');
    const [precioEditar,setPrecioEditar] = useState('');
    const [estadoEditar,setEstadoEditar] = useState(1);

    const [productos,setProductos] =  useState([]);
  
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const abrirCerrarModalInsertar = () =>{
      setIsModalOpen(!isModalOpen);
    }
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    const changeValor = e =>{
      const {name,value} = e.target;
      setProducto({...producto,[name]:value});
      console.log(producto);
    }
    
    function handleChangeSelect(value) {
      setProducto({...producto, estado: value})
    }

    function handleChangeNumber(value) {
      setProducto({...producto, precio: value})
    }

    const onFinish = async () => {
      const resp = await fetch('http://localhost/electronica/controlador/c_producto.php', {
        method: 'POST',
        body: JSON.stringify(producto),
        headers: { 'Content-Type': 'application/json' }
      });
      const respuesta = await resp.json();
      if(Number.isInteger(respuesta.respuesta)){
        setProducto({...producto, id: Number.parseInt(respuesta.respuesta)});
        getListaProductos();
        setIsModalOpen(false);
      }
    };

    const [isModalOpenEditar, setIsModalOpenEditar] = useState(false);
    const showModalEditar = () => {
      setIsModalOpenEditar(true);
    };
    const handleOkEditar = () => {
      setIsModalOpenEditar(false);
    };
    const handleCancelEditar = () => {
      setIsModalOpenEditar(false);
    };
    const abrirCerrarModalEditar = () =>{
      setIsModalOpenEditar(!isModalOpenEditar);
    }
    const onFinishFailedEditar = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    
    const editNombre = e =>{
      const {name,value} = e.target;
      setNombreEditar(value);
    }

    const editPrecio = e =>{
      const {name,value} = e.target;
      setPrecioEditar(value);
    }

    const editDetalle = e =>{
      const {name,value} = e.target;
      setDetalleEditar(value);
    }

    // const editEst = e =>{
    //   const {name,value} = e.target;
    //   setNombreEditar(value);
    // }

    const seleccionarProducto = (product,data,caso)=>{
      // setProducto(data);
      // console.log(data);
      // // console.log(producto);
      // setNombreEditar(data.nombre_producto);
      // setProducto({...producto,precio: data.precio_estandar});
      // setProducto({...producto,nombre: data.nombre_producto});
      // setProducto({...producto,detalle: data.detalle_producto});
      // setProducto({...producto,estado: data.estado_producto});
      setIdProducto(data.id_producto);
      setNombreEditar(data.nombre_producto);
      setDetalleEditar(data.detalle_producto);
      setEstadoEditar(data.estado_producto);
      setPrecioEditar(data.precio_estandar);
      // console.log(producto);
      (caso==='Editar') && abrirCerrarModalEditar();
    }

    const onFinishEditar = async () => {
      // console.log('click');
      const resp = await fetch('http://localhost/electronica/controlador/c_producto.php', {
        method: 'POST',
        body: JSON.stringify({metodo:'editarProducto',idProducto,nombreEditar,detalleEditar,estadoEditar,precioEditar}),
        headers: { 'Content-Type': 'application/json' }
      });
      const respuesta = await resp.json();
      console.log(respuesta);
      // if(Number.isInteger(respuesta.respuesta)){
      //   setProducto({...producto, id: Number.parseInt(respuesta.respuesta)});
      //   getListaProductos();
      //   setIsModalOpen(false);
      // }
    };

    // const abrirCerrarModalEditar

    /////////////////////////////////////////
    function obtenerPrductosTienta(first){
      console.log(first);
    }

    const [tNavTienda,setNavTienda] = useState([]);
    useLayoutEffect(() => {
      getListaTiendasBolivia();
      getListaProductos();
    }, []);
    
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
          const fetchResponse = await fetch(URL_PRODUCTO, settings);
          const data = await fetchResponse.json();
          let tiendas = [];
          let index = 0;
          data.forEach(element => {
            let myKey = String(index + 1);
            tiendas.push({ label: (<Button type="primary" block onClick={({}) => obtenerPrductosTienta(element.id_tienda_bolivia)}>{element.nombre_tienda}</Button>), key: myKey });
            index++;
          });
          setNavTienda(tiendas);
          return data;
      } catch (e) {
          return e;
      }    
    }

    const getListaProductos = async () => {
      const settings = {
          method: 'POST',
          body: JSON.stringify({metodo:'listarProductos'}),
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          }
      };
      try {
          const fetchResponse = await fetch(URL_PRODUCTO, settings);
          const datos = await fetchResponse.json();
          setProductos(datos);
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
                children: tNavTienda,
              },
              {
                key: '3',
                icon: <ShopOutlined />,
                label: <Link to="/Home">Tiendas en bolivia</Link>,
              },
              {
                key: '4',
                icon: <ShopOutlined />,
                label: <Link to="/Productos">Productos</Link>,
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
            <h2>Listar productos</h2>
            <Button type="primary" onClick={showModal}>Agregar</Button>
            <Modal title="Agregar Producto" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
              footer={[<Button onClick={abrirCerrarModalInsertar} type='primary' danger>Cancelar</Button>, <Button type='primary' form="myForm" key="submit" htmlType="submit" >Agregar</Button> ]}>
              <hr />
              <br />
              <Form id="myForm" name="basic" labelCol={{span: 8,}} wrapperCol={{span: 16,}} style={{maxWidth: 600,}} initialValues={{remember: true,}} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                <Form.Item label="Nombre producto"
                  rules={[
                    {
                      required: true,
                      message: 'Escriba el nombre de la ciudad!',
                    },
                  ]}
                >
                  <Input name="nombre" onChange={changeValor} />
                </Form.Item>

                <Form.Item label="Precio producto"
                  rules={[
                    {
                      required: true,
                      message: 'Escriba el precio del producto!',
                    },
                  ]}
                >
                  <InputNumber name="precio" onChange={handleChangeNumber} />
                </Form.Item>

                <Form.Item label="Detalle producto"
                  rules={[
                    {
                      required: true,
                      message: 'Escriba detalle del producto!',
                    },
                  ]}
                >
                  <Input name="detalle" onChange={changeValor} />
                </Form.Item>

                <Form.Item label="Estado" rules={[
                    {
                      required: true,
                      message: 'Seleccione una opcion!',
                    },
                  ]}>
                  <Select defaultValue="1" name="estado" onChange={handleChangeSelect}>
                    <Select.Option value="1">Activo</Select.Option>
                    <Select.Option value="0">Inactivo</Select.Option>
                  </Select>
                </Form.Item>
              </Form>
            </Modal>

            <Modal title="Editar Producto" open={isModalOpenEditar} onOk={handleOkEditar} onCancel={handleCancelEditar}
              footer={[<Button onClick={abrirCerrarModalEditar} type='primary' danger>Cancelar</Button>, <Button type='primary' form="myFormEditar" key="submit" htmlType="submit" >Agregar</Button> ]}>
              <hr />
              <br />
              <Form id="myFormEditar" name="basic" labelCol={{span: 8,}} wrapperCol={{span: 16,}} style={{maxWidth: 600,}} initialValues={{remember: true,}} onFinish={onFinishEditar} onFinishFailed={onFinishFailedEditar} autoComplete="off">
                <Form.Item label="Nombre producto"
                  rules={[
                    {
                      required: true,
                      message: 'Escriba el nombre de la ciudad!',
                    },
                  ]}
                >
                  <Input name="nombre" onChange={editNombre} value={nombreEditar}/>
                </Form.Item>

                <Form.Item label="Precio producto" 
                  rules={[
                    {
                      required: true,
                      message: 'Escriba el precio del producto!',
                    },
                  ]}
                >
                  <InputNumber name="precio" onChange={editPrecio}  value={precioEditar} />
                </Form.Item>

                <Form.Item label="Detalle producto"
                  rules={[
                    {
                      required: true,
                      message: 'Escriba detalle del producto!',
                    },
                  ]}
                >
                  <Input name="detalle" onChange={editDetalle} value={detalleEditar} />
                </Form.Item>

                <Form.Item label="Estado" rules={[
                    {
                      required: true,
                      message: 'Seleccione una opcion!',
                    },
                  ]}>
                  <Select defaultValue="1" name="estado" value={estadoEditar}>
                    <Select.Option value="1">Activo</Select.Option>
                    <Select.Option value="0">Inactivo</Select.Option>
                  </Select>
                </Form.Item>
              </Form>
            </Modal>

            <Table dataSource={productos} columns={columns} />;
          </Content>
        </Layout>
      </Layout>
    );
  };