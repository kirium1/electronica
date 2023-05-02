import { Link } from 'react-router-dom';
import { blue, green } from '@ant-design/colors';
import BreadcrumbProducto from './BreadcrumbProducto';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ShopOutlined,
    UserOutlined,
    VideoCameraOutlined,
    PlusSquareOutlined,
  } from '@ant-design/icons';
  import { Layout, Menu, theme, Table, Button, Modal, Form, Input , Select, InputNumber, message  } from 'antd';
  import React, { useState, useLayoutEffect } from 'react';
  const { Header, Sider, Content } = Layout;
  const URL_DEPARTAMENTO = "http://localhost/electronica/controlador/c_tienda.php";
  const URL_PRODUCTO = "http://localhost/electronica/controlador/c_producto.php";
  const URL_TIENDA_ALIEXPRESS = "http://localhost/electronica/controlador/c_tienda_aliexpress.php";


  // const dataSource = [];

  export const MyDashboard = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [optionProductoTienda, setOptionProductoTienda] = useState([]);
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
            <Button type='primary' onClick={()=>seleccionarProducto(producto,data,"Eliminar")}danger>Eliminar</Button>{"  "}
            <Button style={{background:green.primary, color:'white'}} onClick={()=>seleccionarProducto(producto,data,"Cotizacion")}>Cotizacion</Button>
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

    const [precioProductoTiendaAliexpress,setPrecioProductoTiendaAliexpress] =  useState(1);
    const [urlProductoTiendaAliexpress,setUrlProductoTiendaAliexpress] =  useState('');
  
  
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

    function editPrecio(value) {
      setPrecioEditar(value);
    }

    const editDetalle = e =>{
      const {name,value} = e.target;
      setDetalleEditar(value);
    }

    const seleccionarProducto = (product,data,caso)=>{
      setIdProducto(data.id_producto);
      setNombreEditar(data.nombre_producto);
      setDetalleEditar(data.detalle_producto);
      setEstadoEditar(data.estado_producto);
      setPrecioEditar(data.precio_estandar);
      (caso==='Editar') && abrirCerrarModalEditar();
      (caso==='Eliminar') && abrirCerrarModalEliminar();
      (caso==='Cotizacion') && abrirCerrarModalProductoTienda();
    }

    function cargar(){
      message.success('Loading finished', 2.5);
    }


    const onFinishEditar = async () => {     
      cargar();
      const resp = await fetch('http://localhost/electronica/controlador/c_producto.php', {
        method: 'POST',
        body: JSON.stringify({metodo:'editarProducto',idProducto,nombreEditar,detalleEditar,estadoEditar,precioEditar}),
        headers: { 'Content-Type': 'application/json' }
      });
      const respuesta = await resp.json();
      console.log(Number.isInteger(respuesta.respuesta));
      if(Number.isInteger(respuesta.respuesta)){
        getListaProductos();
        setIsModalOpenEditar(false);
      }
    };

    // const abrirCerrarModalEditar
    function handleChangeNumberPrecioTiendaAliexpress(value) {
      setPrecioProductoTiendaAliexpress(value);
      // console.log(value);
    }

    /////////////////////////////////////////
    function obtenerPrductosTienta(first){
      console.log(first);
    }

    const [tNavTienda,setNavTienda] = useState([]);
    useLayoutEffect(() => {
      getListaTiendasBolivia();
      getListaProductos();
      getListaTiendasAliexpress();
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

    const getListaTiendasAliexpress = async () => {
      const settings = {
          method: 'POST',
          body: JSON.stringify({metodo:'listarTiendasAliexpress'}),
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          }
      };
      try {
          const fetchResponse = await fetch(URL_TIENDA_ALIEXPRESS, settings);
          const datos = await fetchResponse.json();
          // setOptionProductoTienda(datos);
          let opciones = [];
          datos.forEach(element => {
            opciones.push({value:element.id_tienda_bolivia, label: element.nombre_tienda});
          });
          setOptionProductoTienda(opciones);
          console.log(datos);
          return datos;
      } catch (e) {
          return e;
      }    
    }

    const [isModalOpenEliminar, setIsModalOpenEliminar] = useState(false);
    // const showModalEliminar = () => {
    //   setIsModalOpenEliminar(true);
    // };
    const handleOkEliminar = () => {
      setIsModalOpenEliminar(false);
    };
    const handleCancelEliminar = () => {
      setIsModalOpenEliminar(false);
    };
    const abrirCerrarModalEliminar = () =>{
      setIsModalOpenEliminar(!isModalOpenEliminar);
    }
    const onFinishFailedEliminar = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    const onFinishEliminar = async () => {     
      // console.log('aqui');
      cargar();
      const resp = await fetch('http://localhost/electronica/controlador/c_producto.php', {
        method: 'POST',
        body: JSON.stringify({metodo:'eliminarProducto',idProducto}),
        headers: { 'Content-Type': 'application/json' }
      });
      const respuesta = await resp.json();
      console.log(respuesta);
      // console.log(Number.isInteger(respuesta.respuesta));
      if(respuesta.respuesta === 1){
        getListaProductos();
        setIsModalOpenEliminar(false);
      }
    };

    //=================================================
    const [isModalOpenProductoTienda, setIsModalOpenProductoTienda] = useState(false);
    // const showModalEliminar = () => {
    //   setIsModalOpenEliminar(true);
    // };
    const handleOkProductoTienda = () => {
      setIsModalOpenProductoTienda(false);
    };
    const handleCancelProductoTienda = () => {
      setIsModalOpenProductoTienda(false);
    };
    const abrirCerrarModalProductoTienda = () =>{
      setIsModalOpenProductoTienda(!isModalOpenProductoTienda);
    }
    const onFinishFailedProductoTienda = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    const handleUrlProductoTiendaAliexpress = e =>{
      const {name,value} = e.target;
      // setDetalleEditar(value);
      setUrlProductoTiendaAliexpress(value);
    }

    const onFinishProductoTienda = async () => {     
      cargar();
      const resp = await fetch('http://localhost/electronica/controlador/c_producto.php', {
        method: 'POST',
        body: JSON.stringify({metodo:'eliminarProducto',idProducto}),
        headers: { 'Content-Type': 'application/json' }
      });
      const respuesta = await resp.json();
      console.log(respuesta);
      // console.log(Number.isInteger(respuesta.respuesta));
      if(respuesta.respuesta === 1){
        getListaProductos();
        setIsModalOpenEliminar(false);
      }
    };
    

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

            <Modal title={<><PlusSquareOutlined /> Editar producto </>} open={isModalOpenEditar} onOk={handleOkEditar} onCancel={handleCancelEditar}
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
                  <InputNumber name="precioEditar" onChange={editPrecio}  value={precioEditar} />
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

            <Modal title={<><PlusSquareOutlined /> Eliminar producto </>} open={isModalOpenEliminar} onOk={handleOkEliminar} onCancel={handleCancelEliminar}
              footer={[<Button onClick={abrirCerrarModalEliminar} type='primary' danger>Cancelar</Button>, <Button type='primary' form="myFormEliminar" key="submit" htmlType="submit" >Eliminar</Button> ]}>
              <hr />
              <br />
              <Form id="myFormEliminar" name="basic" style={{maxWidth: 600,}} initialValues={{remember: true,}} onFinish={onFinishEliminar} onFinishFailed={onFinishFailedEliminar} autoComplete="off">
                <span>Usted esta deacuerdo con eliminar el producto con nombre <strong>{nombreEditar}</strong> con precio de <strong>{precioEditar}</strong></span>
              </Form>
            </Modal>

            <Modal title={<><PlusSquareOutlined /> Productos por tienda </>} open={isModalOpenProductoTienda} onOk={handleOkProductoTienda} onCancel={handleCancelProductoTienda}
              footer={[<Button onClick={abrirCerrarModalProductoTienda} type='primary' danger>Cancelar</Button>, <Button type='primary' form="myFormProductoTienda" key="submit" htmlType="submit" >Agregar</Button> ]}>
              <hr />
              <br />
              <Form id="myFormProductoTienda" name="basic" labelCol={{span: 8,}} wrapperCol={{span: 16,}} style={{maxWidth: 600,}} initialValues={{remember: true,}} onFinish={onFinishProductoTienda} onFinishFailed={onFinishFailedProductoTienda} autoComplete="off">
                <Form.Item label="Estado" rules={[
                    {
                      required: true,
                      message: 'Seleccione una opcion!',
                    },
                  ]}>
                  <Select options={optionProductoTienda}></Select>
                </Form.Item>

                <Form.Item label="Precio producto"
                  rules={[
                    {
                      required: true,
                      message: 'Escriba el precio del producto!',
                    },
                  ]}
                >
                  <InputNumber name="precioTiendaAliexpress" value={precioProductoTiendaAliexpress} onChange={handleChangeNumberPrecioTiendaAliexpress} />
                </Form.Item>

                <Form.Item label="URL del producto"
                  rules={[
                    {
                      required: true,
                      message: 'Escriba dirrecion del producto!',
                    },
                  ]}
                >
                  <Input name="urlProductoTiendaAliexpress" onChange={handleUrlProductoTiendaAliexpress} value={urlProductoTiendaAliexpress} />
                </Form.Item>
              </Form>
            </Modal>

            <Table dataSource={productos} columns={columns} />;
          </Content>
        </Layout>
      </Layout>
    );
  };