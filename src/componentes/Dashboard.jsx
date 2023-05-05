import { Link } from 'react-router-dom';
import { blue, green, yellow } from '@ant-design/colors';
// import Button from 'react-bootstrap/Button';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ShopOutlined,
    UserOutlined,
    VideoCameraOutlined,
    PlusSquareOutlined,
    DeleteFilled,
    EditFilled,
    SaveOutlined,
    QuestionCircleOutlined
  } from '@ant-design/icons';
  import { Layout, Menu, theme, Table, Button, Modal, Form, Input , Select, InputNumber, message, Col, Row, Space, Radio, Popconfirm } from 'antd';
  import React, { useState, useLayoutEffect } from 'react';
  const { Header, Sider, Content } = Layout;
  const URL_DEPARTAMENTO = "http://localhost/electronica/controlador/c_tienda.php";
  const URL_PRODUCTO = "http://localhost/electronica/controlador/c_producto.php";
  const URL_TIENDA_ALIEXPRESS = "http://localhost/electronica/controlador/c_tienda_aliexpress.php";
  const URL_COTIZACION_TIENDA_ALIEXPRESS = "http://localhost/electronica/controlador/c_cotizacion_tienda_aliexpress.php";
  const URL_COTIZACION_TIENDA_BOLIVIA = "http://localhost/electronica/controlador/c_cotizacion_tienda_bolivia.php";
  const TIENDA_BOLIVIA = "http://localhost/electronica/controlador/c_tienda_bolivia.php";

  // const dataSource = [];

  export const MyDashboard = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const [idCotizacionBolivia,setIdCotizacionBolivia] = useState(0);
    const [idTiendaBolivia,setIdTiendaBolivia] = useState(0);
    const [tiendasBolivia,setTiendasBolivia] = useState(0);
    const [urlCotizacionBolivia,setUrlCotizacionBolivia] = useState('');
    const [precioUnitarioBolivia,setPrecioUnitarioBolivia] = useState(0.0);
    const [pagoExtraBolivia,setPagoExtraBolivia] = useState(0.0);
    const [stockBolivia,setStockBolivia] = useState(1);
    const [cantidadBolivia,setCantidadBolivia] = useState(1);
    const [cotizacionBolivia,setCotizacionBolivia] = useState(0.0);
    const [descuentoBolivia,setDescuentoBolivia] = useState(0.0);
    const [totalBolivia,setTotalBolivia] = useState(0.0);
    const [checkNick, setCheckNick] = useState(false);

    const [cotizacionesBolivia,setCotizacionesBolivia] =  useState([]);
    const [optionProductoTienda, setOptionProductoTienda] = useState([]);
    const [isModalOpenCotizacionBolivia, setIsModalOpenCotizacionBolivia] = useState(false);
    const handleOkCotizacionBolivia = () => {
      setIsModalOpenCotizacionBolivia(false);
    };
    const handleCancelCotizacionBolivia = () => {
      setIsModalOpenCotizacionBolivia(false);
    };
    const abrirCerrarModalCotizacionBolivia = () =>{
      setIsModalOpenCotizacionBolivia(!isModalOpenCotizacionBolivia);
    }

    function handleChangeTiendaBolivia(value) {
      setIdTiendaBolivia(value)
    }

    const changeURLCotizacionBolivia = e =>{
      const {name,value} = e.target;
      setUrlCotizacionBolivia(value);
    }
    function changePrecioUnitarioBolivia(value) {
      setPrecioUnitarioBolivia(value);
    }
    function changePagoExtraBolivia(value) {
      setPagoExtraBolivia(value);
    }
    function changeStockBolivia(value) {
      setStockBolivia(value);
    }
    function changeCantidadBolivia(value) {
      setCantidadBolivia(value);
    }
    function changeCotizacionTotalBolivia(value) {
      setCotizacionBolivia(value);
    }
    function changeDescuentoTiendaBolivia(value) {
      setDescuentoBolivia(value);
    }

    function changeTotalTiendaBolivia(value) {
      setTotalBolivia(value);
    }

    const onFinishCotizacionTiendaBolivia = async () => {     
      // cargar();
      const resp = await fetch(URL_COTIZACION_TIENDA_BOLIVIA, {
        method: 'POST',
        body: JSON.stringify({metodo:'agregarCotizacionTiendaBolivia',idTiendaBolivia:idTiendaBolivia,idProducto:idProducto,urlCotizacionBolivia:urlCotizacionBolivia,
        precioUnitarioBolivia:precioUnitarioBolivia,pagoExtraBolivia:pagoExtraBolivia,stockBolivia:stockBolivia,cantidadBolivia:cantidadBolivia,
        cotizacionBolivia:cotizacionBolivia,descuentoBolivia:descuentoBolivia,totalBolivia:totalBolivia
      }),
        headers: { 'Content-Type': 'application/json' }
      });
      const respuesta = await resp.json();
      // console.log(respuesta);
      // if(respuesta.respuesta === 1){
      //   getListaProductos();
      //   setIsModalOpenEliminar(false);
      // }
    };

    const confirmEliminarCotizacionBolivia = async (e) => {
      console.log(e);
      // message.success('Click on Yes');
      const resp = await fetch(URL_COTIZACION_TIENDA_BOLIVIA, {
        method: 'POST',
        body: JSON.stringify({metodo:'eliminarCotizacionBolivia',idCotizacionBolivia}),
        headers: { 'Content-Type': 'application/json' }
      });
      const respuesta = await resp.json();
      if(respuesta.respuesta === 1){
        // getListaProductos();
        let myData = cotizacionesBolivia.filter(item => item.id_cotizacion_tienda_bolivia !== idCotizacionBolivia);
        console.log(myData);
        setCotizacionBolivia(myData);
      }
      // console.log(respuesta)
    };
    const cancelEliminarCotizacionBolivia = (e) => {
      console.log(e);
      message.error('Click on No');
    };

    const seleccionarCotizacion = (product,data,caso)=>{
      setIdCotizacionBolivia(data.id_cotizacion_tienda_bolivia);
      // setNombreEditar(data.nombre_producto);
      // setDetalleEditar(data.detalle_producto);
      // setEstadoEditar(data.estado_producto);
      // setPrecioEditar(data.precio_estandar);
      // if(caso==='Eliminar'){
      //   eliminarCotizacionTiendaBolivia();
      // }
      if(caso==='Editar'){
        solicitarCotizacionesTiendaBolivia();
      }
    }

    const eliminarCotizacionTiendaBolivia = async () =>{
      
      const resp = await fetch(URL_COTIZACION_TIENDA_BOLIVIA, {
        method: 'POST',
        body: JSON.stringify({metodo:'eliminarCotizacionBolivia',idCotizacionBolivia}),
        headers: { 'Content-Type': 'application/json' }
      });
      const respuesta = await resp.json();
      console.log(respuesta)
      // if(respuesta.respuesta === 1){
      //   getListaProductos();
      //   setIsModalOpenEliminar(false);
      // }
    }

    // =====================================================

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
            <Button style={{background:green.primary, color:'white'}} onClick={()=>seleccionarProducto(producto,data,"CotizacionAliexpress")}>Aliexpress</Button>
            <Button style={{background:green.primary, color:'white'}} onClick={()=>seleccionarProducto(producto,data,"CotizacionBolivia")}>Bolivia</Button>
          </>)
      }
    ];

    const columnsCotizacionBolivia = [
      {
        title: 'ID',
        dataIndex: 'id_cotizacion_tienda_bolivia',
        key: 'id_cotizacion_tienda_bolivia',
      },
      {
        title: 'Nombre',
        dataIndex: 'nombre_tienda',
        key: 'nombre_tienda',
      },
      {
        title: 'Fecha',
        dataIndex: 'fecha_cotizacion',
        key: 'fecha_cotizacion',
      },
      {
        title: 'Direccion URL',
        dataIndex: 'url_producto_tienda_bolivia',
        key: 'url_producto_tienda_bolivia',
        render: (text) => <a href={text}>Enlace</a>,
      },
      {
        title: 'Precio U.',
        dataIndex: 'precio_unidad',
        key: 'precio_unidad',
      },
      {
        title: 'Cantidad',
        dataIndex: 'cantidad_producto',
        key: 'cantidad_producto',
      },
      {
        title: 'Precio C.',
        dataIndex: 'precio_cotizacion',
        key: 'precio_cotizacion',
      },
      {
        title: 'Descuento',
        dataIndex: 'descuento_cotizacion',
        key: 'descuento_cotizacion',
      },
      {
        title: 'Pago E.',
        dataIndex: 'pago_extra',
        key: 'pago_extra',
      },
      {
        title: 'Total',
        dataIndex: 'total_cotizacion',
        key: 'total_cotizacion',
      },
      {
        title: 'Stock',
        dataIndex: 'stock_actual',
        key: 'stock_actual',
      },
      {
        title: 'Acciones',
        dataIndex: 'acciones',
        render: (producto,data) => (
          <>
            <Button type='primary' onClick={()=>seleccionarCotizacion(producto,data,"Editar")}><EditFilled /></Button> {"  "}
            <Popconfirm
              title="eliminar cotizacion"
              description='Usted esta seguto que desea eliminar esta cotizacion?'
              onCancel={cancelEliminarCotizacionBolivia}
              onConfirm={confirmEliminarCotizacionBolivia}
              okText="Si"
              cancelText="No"
              icon={<QuestionCircleOutlined
                      style={{
                        color: 'red',
                      }}
                    />
                  }>
              {/* <Button type="link">Delete</Button> */}
              <Button type='primary' onClick={()=>seleccionarCotizacion(producto,data,"Eliminar")}danger><DeleteFilled /></Button>
            </Popconfirm>
            {/* <Button type='primary' onClick={()=>seleccionarCotizacion(producto,data,"Eliminar")}danger><DeleteFilled /></Button> */}
          </>)
      }
    ];


    const [cotizaciones,setCotizaciones] =  useState([]);
    const columnsProductosTiendaAliexpress = [
      {
        title: 'ID',
        dataIndex: 'id_cotizacion_tienda_aliexpress',
        key: 'id_cotizacion_tienda_aliexpress',
      },
      {
        title: 'Tienda',
        dataIndex: 'nombre_tienda',
        key: 'nombre_tienda',
      },
      {
        title: 'Fecha',
        dataIndex: 'fecha_cotizacion',
        key: 'fecha_cotizacion',
      },
      {
        title: 'Direccion URL',
        dataIndex: 'url_producto_tienda_aliexpress',
        key: 'url_producto_tienda_aliexpress',
        render: (text) => <a href={text}>Enlace</a>,
      },
      {
        title: 'Precio U.',
        dataIndex: 'precio_unidad',
        key: 'precio_unidad',
      },

      {
        title: 'Cantidad',
        dataIndex: 'cantidad_producto',
        key: 'cantidad_producto',
      },
      {
        title: 'Precio C.',
        dataIndex: 'precio_cotizacion',
        key: 'precio_cotizacion',
      },
      {
        title: 'Descuento',
        dataIndex: 'descuento_cotizacion',
        key: 'descuento_cotizacion',
      },
      {
        title: 'Pago E.',
        dataIndex: 'pago_extra',
        key: 'pago_extra',
      },
      {
        title: 'Total',
        dataIndex: 'total_cotizacion',
        key: 'total_cotizacion',
      },
      {
        title: 'Stock',
        dataIndex: 'stock_actual',
        key: 'stock_actual',
      },
      {
        title: 'Acciones',
        dataIndex: 'acciones',
        render: (producto,data) => (
          <>
            <Button type='primary' onClick={()=>seleccionarProducto(producto,data,"Editar")}><EditFilled /></Button> {"  "}
            <Button type='primary' onClick={()=>seleccionarProducto(producto,data,"Eliminar")}danger><DeleteFilled /></Button>
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
      (caso==='CotizacionAliexpress') && abrirCerrarModalProductoTienda();
      if(caso==='CotizacionAliexpress'){
        solicitarCotizacionesTiendaAliexpress();
      }
      (caso==='CotizacionBolivia') && abrirCerrarModalCotizacionBolivia();
      if(caso==='CotizacionBolivia'){
        solicitarCotizacionesTiendaBolivia();
      }
    }

    const solicitarCotizacionesTiendaBolivia = async () => {
      const settings = {
          method: 'POST',
          body: JSON.stringify({metodo:'solicitarCotizacionesTiendaBolivia', idProducto:idProducto}),
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          }
      };
      try {
          const fetchResponse = await fetch(URL_COTIZACION_TIENDA_BOLIVIA, settings);
          const datos = await fetchResponse.json();
          // console.log(datos);
          setCotizacionesBolivia(datos);
          return datos;
      } catch (e) {
          return e;
      }    
    }

    const solicitarCotizacionesTiendaAliexpress = async () => {
      const settings = {
          method: 'POST',
          body: JSON.stringify({metodo:'solicitarCotizacionesTiendaAliexpress'}),
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          }
      };
      try {
          const fetchResponse = await fetch(URL_COTIZACION_TIENDA_ALIEXPRESS, settings);
          const datos = await fetchResponse.json();
          setCotizaciones(datos);
          return datos;
      } catch (e) {
          return e;
      }    
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
          const fetchResponse = await fetch(TIENDA_BOLIVIA, settings);
          const datos = await fetchResponse.json();
          // let tiendas = [];
          // let index = 0;
          // data.forEach(element => {
          //   let myKey = String(index + 1);
          //   tiendas.push({ label: (<Button type="primary" block onClick={({}) => obtenerPrductosTienta(element.id_tienda_bolivia)}>{element.nombre_tienda}</Button>), key: myKey });
          //   index++;
          // });
          // setNavTienda(tiendas);
          let opciones = [];
          console.log(datos);
          datos.forEach(element => {
            opciones.push({value:element.id_tienda_bolivia, label: element.nombre_tienda});
          });
          setTiendasBolivia(opciones);
          return datos;
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

            <Modal title={<><PlusSquareOutlined /> Productos por tienda </>} width={1500} open={isModalOpenProductoTienda} onOk={handleOkProductoTienda} onCancel={handleCancelProductoTienda}
              footer={[<Button onClick={abrirCerrarModalProductoTienda} type='primary' danger>Cancelar</Button>, <Button type='primary' form="myFormProductoTienda" key="submit" htmlType="submit" >Agregar</Button> ]}>
              <hr />
              <br />
              <Form layout="vertical" id="myFormProductoTienda" name="basic" initialValues={{remember: true,}} onFinish={onFinishProductoTienda} onFinishFailed={onFinishFailedProductoTienda} autoComplete="off">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Tienda Aliexpress" rules={[
                        {
                          required: true,
                          message: 'Seleccione una opcion!',
                        },
                      ]}>
                      <Select options={optionProductoTienda}></Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Detalle producto"
                      rules={[
                          {
                            required: true,
                            message: 'Escriba detalle del producto!',
                          },
                        ]}
                      >
                      <Input name="nombreProducto"/>
                    </Form.Item>
                  </Col>
                </Row>

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
                <Table dataSource={cotizaciones}  className="your-table" columns={columnsProductosTiendaAliexpress} />;
              </Form>
            </Modal>
            <Modal title="Cotizacion de tiendas en Bolivia" width={1500} open={isModalOpenCotizacionBolivia} onOk={handleOkCotizacionBolivia} onCancel={handleCancelCotizacionBolivia} 
                footer={[<Button onClick={abrirCerrarModalCotizacionBolivia} type='primary' danger>Cancelar</Button> ]}>
                <hr />
                <br />
                <Form id="formAddCotizacionTiendaBolivia"  name="basic" layout="vertical" initialValues={{remember: true,}} onFinish={onFinishCotizacionTiendaBolivia} onFinishFailed={onFinishFailed} autoComplete="off">
                  <Row gutter={16}>
                    <Col span={7}>
                      <Form.Item label="Tienda Bolivia" rules={[{required: true, message: 'Escriba el nombre de la ciudad!',},]}>
                        <Select options={tiendasBolivia} onChange={handleChangeTiendaBolivia}></Select>
                      </Form.Item>
                    </Col>
                    <Col span={7}>
                      <Form.Item label="Producto" rules={[{required: true, message: 'Escriba el nombre de la ciudad!',},]}>
                        <Input name="nombreProducto" disabled value={nombreEditar}/>
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Form.Item label="Url" rules={[{required: true, message: 'Escriba el nombre de la ciudad!',},]}>
                        <Input name="url_cotizacion_bolivia" onChange={changeURLCotizacionBolivia} value={urlCotizacionBolivia} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item label="Precio U." rules={[{required: true, message: 'Escriba el nombre de la ciudad!',},]}>
                        <InputNumber name="precioUnitario" onChange={changePrecioUnitarioBolivia} value={precioUnitarioBolivia} style={{ width: '100%' }}/>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Pago extra" rules={[{required: true, message: 'Escriba el nombre de la ciudad!',},]}>
                        <InputNumber name="pagoExtra" onChange={changePagoExtraBolivia} value={pagoExtraBolivia} style={{ width: '100%' }}/>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Stock" rules={[{required: true, message: 'Escriba el nombre de la ciudad!',},]}>
                        <InputNumber name="stock" onChange={changeStockBolivia} value={stockBolivia} style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={6}>
                      <Form.Item label="Cantidad" rules={[{required: true, message: 'Escriba el nombre de la ciudad!',},]}>
                        <Input name="cantidad" onChange={changeCantidadBolivia} value={cantidadBolivia} style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="Cotizacion" rules={[{required: true, message: 'Escriba el nombre de la ciudad!',},]}>
                        <InputNumber name="cotizacion" onChange={changeCotizacionTotalBolivia} value={cotizacionBolivia} style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="Descuento" rules={[{required: true, message: 'Escriba el nombre de la ciudad!',},]}>
                        <InputNumber name="descuento" onChange={changeDescuentoTiendaBolivia} value={descuentoBolivia} style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="Total" rules={[{required: true, message: 'Escriba el nombre de la ciudad!',},]}>
                        <InputNumber name="total" onChange={changeTotalTiendaBolivia}  value={totalBolivia} style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={12}>
                    <Col span={12}>
                      <Form.Item name="radio-group" label="Existe producto?">
                        <Radio.Group>
                          <Radio value="si">Si</Radio>
                          <Radio value="no">No</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Button type="primary" block style={{background:green.primary, color:'white', height:'60%'}} htmlType="submit" > <SaveOutlined /> Agregar Cotizacion</Button>
                    </Col>
                  </Row>
                  <hr />
                </Form> 
                <Table dataSource={cotizacionesBolivia}  style={{width: '100%'}} columns={columnsCotizacionBolivia} />
              </Modal>

            <Table dataSource={productos} columns={columns} />;
          </Content>
        </Layout>
      </Layout>
    );
  };