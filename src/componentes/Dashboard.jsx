import { Link } from 'react-router-dom';
import { green } from '@ant-design/colors';
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
    QuestionCircleOutlined,
    EditOutlined,
    UploadOutlined
  } from '@ant-design/icons';
  import { Layout, Menu, theme, Table, Button, Modal, Form, Input , Select, InputNumber, message, Col, Row, Badge, Radio, Popconfirm, Space, Empty, Image } from 'antd';
  import React, { useState, useLayoutEffect, useRef } from 'react';
  import ModalAgregarProducto from './ModalAgregarProducto';
  import ModalEliminarProducto from './ModalEliminarProducto';

  const { Header, Sider, Content } = Layout;
  const URL_DEPARTAMENTO = "http://localhost/electronica/controlador/c_tienda.php";
  const URL_PRODUCTO = "http://localhost/electronica/controlador/c_producto.php";
  const URL_TIENDA_ALIEXPRESS = "http://localhost/electronica/controlador/c_tienda_aliexpress.php";
  const URL_COTIZACION_TIENDA_ALIEXPRESS = "http://localhost/electronica/controlador/c_cotizacion_tienda_aliexpress.php";
  const URL_COTIZACION_TIENDA_BOLIVIA = "http://localhost/electronica/controlador/c_cotizacion_tienda_bolivia.php";
  const TIENDA_BOLIVIA = "http://localhost/electronica/controlador/c_tienda_bolivia.php";

  const CATEGORIA = "http://localhost/electronica/controlador/c_categoria.php";

  // const dataSource = [];

  export const MyDashboard = () => {

    const [categorias,setCategorias] = useState([]);
    // const [idProducto,setIdProducto] = useState('');

    const [messageApi, contextHolder] = message.useMessage();

    const [idCotizacionBolivia,setIdCotizacionBolivia] = useState(0);
    const [idTiendaBolivia,setIdTiendaBolivia] = useState(0);
    const [tiendasBolivia,setTiendasBolivia] = useState(0);
    const [urlCotizacionBolivia,setUrlCotizacionBolivia] = useState('');
    const [precioUnitarioBolivia,setPrecioUnitarioBolivia] = useState(1);
    const [pagoExtraBolivia,setPagoExtraBolivia] = useState(0.0);
    const [stockBolivia,setStockBolivia] = useState(1);
    const [cantidadBolivia,setCantidadBolivia] = useState(1);
    const [cotizacionBolivia,setCotizacionBolivia] = useState(0.0);
    const [descuentoBolivia,setDescuentoBolivia] = useState(0.0);
    const [totalBolivia,setTotalBolivia] = useState(0.0);

    const [tiendaBolivaDefecto,setTiendaBolivaDefecto] = useState(null);

    const [existeProducto, setExisteProducto] = useState(1);
    const [disabledCotizacionBolivia, setDisabledCotizacionBolivia] = useState(false);

    const [textButton,setTextButton] = useState('Agregar Cotizacion');
    const [styleButton,setStyleButton] = useState(true);
    const [colorButton,setColorButton] = useState('#389e0d');

    const [cotizacionesBolivia,setCotizacionesBolivia] =  useState([]);
    const [optionProductoTienda, setOptionProductoTienda] = useState([]);
    const [isModalOpenCotizacionBolivia, setIsModalOpenCotizacionBolivia] = useState(false);

    const refPrecioUnitarioBolivia = useRef();
    const refPagoExtraBolivia = useRef();
    const refCantidadBolivia = useRef();
    const refCotizacionBolivia = useRef();
    const refDescuentoBolivia = useRef();
    const refTotalBolivia = useRef();

    const changeExistenciaProducto = (e) =>{
      setExisteProducto(e.target.value);
      if(e.target.value == 1){
        setDisabledCotizacionBolivia(false);
      }else{
        setDisabledCotizacionBolivia(true);
        setUrlCotizacionBolivia('');
      }
    }

    const handleOkCotizacionBolivia = () => {
      setIsModalOpenCotizacionBolivia(false);
    };
    const handleCancelCotizacionBolivia = () => {
      setStyleButton(true);
      setTextButton('Agregar Cotizacion');
      setColorButton('#389e0d');
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
      calcularTotalCotizacionBolivia();
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

    const cambiarStyloButtonCotizacionBolivia = () => {
      if(!styleButton){
        setTextButton('Agregar Cotizacion');
        setColorButton('#389e0d');
      }else{
        setTextButton('Editar Cotizacion');
        setColorButton('#d4b106');
      }
      setStyleButton(!styleButton);
    }

    const calcularTotalCotizacionBolivia = () => {
      let precioUnidad = refPrecioUnitarioBolivia.current.value;
      let pagoExtra = refPagoExtraBolivia.current.value;
      let cantidad = refCantidadBolivia.current.value;
      let cotizacion = (precioUnidad * cantidad) - pagoExtra;
      setCotizacionBolivia(cotizacion);
      let descuento = refDescuentoBolivia.current.value;
      let totalCotizacion = cotizacion - descuento;
      setTotalBolivia(totalCotizacion);
    }

    const onFinishCotizacionTiendaBolivia = async () => {     
      cargar();
      if(textButton === 'Agregar Cotizacion'){
        const resp = await fetch(URL_COTIZACION_TIENDA_BOLIVIA, {
          method: 'POST',
          body: JSON.stringify({metodo:'agregarCotizacionTiendaBolivia',idTiendaBolivia:idTiendaBolivia,idProducto:idProducto,urlCotizacionBolivia:urlCotizacionBolivia,
          precioUnitarioBolivia:precioUnitarioBolivia,pagoExtraBolivia:pagoExtraBolivia,stockBolivia:stockBolivia,cantidadBolivia:cantidadBolivia,
          cotizacionBolivia:cotizacionBolivia,descuentoBolivia:descuentoBolivia,totalBolivia:totalBolivia, existeProducto: existeProducto
        }),
          headers: { 'Content-Type': 'application/json' }
        });
        const respuesta = await resp.json();
        if(Number.isInteger(respuesta)){
          solicitarCotizacionesTiendaBolivia(idProducto);
          setUrlCotizacionBolivia('');
          setPrecioUnitarioBolivia(0.0);
          setPagoExtraBolivia(0.0);
          setStockBolivia(0);
          setCantidadBolivia(1);
          setCotizacionBolivia(0.0);
          setDescuentoBolivia(0.0);
          setTotalBolivia(0.0);
          setExisteProducto(1);
        }
      }else{

      }
    };

    const confirmEliminarCotizacionBolivia = async (e) => {
      // message.success('Click on Yes');
      const resp = await fetch(URL_COTIZACION_TIENDA_BOLIVIA, {
        method: 'POST',
        body: JSON.stringify({metodo:'eliminarCotizacionBolivia',idCotizacionBolivia}),
        headers: { 'Content-Type': 'application/json' }
      });
      const respuesta = await resp.json();
      if(respuesta.respuesta === 1){
        solicitarCotizacionesTiendaBolivia(idProducto);
      }
    };

    const cancelEliminarCotizacionBolivia = (e) => {
      message.error('Click on No');
    };

    const seleccionarCotizacion = (product,data,caso)=>{
      setIdCotizacionBolivia(data.id_cotizacion_tienda_bolivia);
      if(caso==='Editar'){
        setTiendaBolivaDefecto(data.id_tienda_bolivia);
        setUrlCotizacionBolivia(data.url_producto_tienda_bolivia);
        setPrecioUnitarioBolivia(parseFloat(data.precio_unidad));
        setPagoExtraBolivia(parseFloat(data.pago_extra));
        setStockBolivia(parseInt(data.stock_actual));
        setCotizacionBolivia(parseFloat(data.precio_cotizacion));
        setDescuentoBolivia(parseFloat(data.descuento_cotizacion));
        setTotalBolivia(parseFloat(data.total_cotizacion));

        cambiarStyloButtonCotizacionBolivia();
      }
    }

    // =====================================================

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id_producto',
        key: 'id_producto',
        align: 'center',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.id_producto - b.id_producto,
      },
      {
        title: 'Imagen',
        dataIndex: 'img_defecto',
        key: 'img_defecto',
        align: 'center',
        // render: (image) => image != ''? <img src={image} alt="Imagen" style={{ width: '100px' }} /> : <Empty />,
        render: (image) => image != null ? <Image src={image} width={150} height={150} /> :  <Image
        width={150}
        height={150}
        src="error"
        fallback="data:image/png;base64,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"
      />,
       
      },
      {
        title: 'Nombre',
        dataIndex: 'nombre_producto',
        key: 'nombre_producto',
        align: 'center',
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
        align: 'center',
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
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.id_cotizacion_tienda_bolivia - b.id_cotizacion_tienda_bolivia,
      },
      {
        title: 'Tiene',
        dataIndex: 'existe_producto_tienda',
        key: 'existe_producto_tienda',
        render: (text) => text == 1 ? <Badge status='success' text='Si' /> : <Badge status='warning' text='No' /> ,
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
        render: (text) => text === '' ? '' : <a href={text} target="_blank" rel="noreferrer" >Enlace</a>,
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
              <Button type='primary' onClick={()=>seleccionarCotizacion(producto,data,"Eliminar")}danger><DeleteFilled /></Button>
            </Popconfirm>
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
        render: (text) => <a href={text} target="_blank" rel="noreferrer">Enlace</a>,
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
      precio:0.0,
      detalle:"",
      estado: "1"
    });

    const [idProducto,setIdProducto] = useState(0);
    const [nombreEditar,setNombreEditar] = useState('');
    const [detalleEditar,setDetalleEditar] = useState('');
    const [precioEditar,setPrecioEditar] = useState(0.0);
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

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
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
      // (caso==='Eliminar') && abrirCerrarModalEliminar();
      if(caso === 'Eliminar'){
        setIsModalOpenEliminar(true);
      }
      (caso==='CotizacionAliexpress') && abrirCerrarModalProductoTienda();
      if(caso==='CotizacionAliexpress'){
        solicitarCotizacionesTiendaAliexpress();
      }
      (caso==='CotizacionBolivia') && abrirCerrarModalCotizacionBolivia();
      if(caso==='CotizacionBolivia'){
        solicitarCotizacionesTiendaBolivia(data.id_producto);
      }
    }

    const solicitarCotizacionesTiendaBolivia = async (id) => {
      const settings = {
          method: 'POST',
          body: JSON.stringify({metodo:'solicitarCotizacionesTiendaBolivia', idProducto:id}),
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          }
      };
      try {
          const fetchResponse = await fetch(URL_COTIZACION_TIENDA_BOLIVIA, settings);
          const datos = await fetchResponse.json();
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
    }

    const [tNavTienda,setNavTienda] = useState([]);
    useLayoutEffect(() => {
      getListaTiendasBolivia();
      getListaProductos();
      getListaTiendasAliexpress();
      getListaCategorias();
    }, []);

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
          let opciones = [];
          if(datos.length >= 1){
            datos.forEach(element => {
              let obj = {label: element.nombre_categoria, value:element.id_categoria}
              opciones.push(obj);
            });
          }
          setCategorias(opciones);
          return datos;
      } catch (e) {
          return e;
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
          let opciones = [];
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

    // const onFinishEliminar = async () => {     
    //   cargar();
    //   const resp = await fetch('http://localhost/electronica/controlador/c_producto.php', {
    //     method: 'POST',
    //     body: JSON.stringify({metodo:'eliminarProducto',idProducto}),
    //     headers: { 'Content-Type': 'application/json' }
    //   });
    //   const respuesta = await resp.json();
    //   if(respuesta.salida === 'Exito'){
    //     getListaProductos();
    //     setIsModalOpenEliminar(false);
    //   }
    // };

    //=================================================
    const [isModalOpenProductoTienda, setIsModalOpenProductoTienda] = useState(false);
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
            <Space direction="horizontal" style={{width: '100%', justifyContent: 'center'}}><h2>Listar productos</h2></Space>
            <Button type="primary" onClick={showModal}>Agregar producto</Button>
            <br />
            <br />
            <ModalAgregarProducto visible={isModalOpen} onCancel={handleCancel} handleOk={handleOk} categorias={categorias}  getListaProductos={getListaProductos} />

            <Modal title={<><EditOutlined style={{color:'#d4b106',fontSize: '18px'}} /> Editar producto </>} open={isModalOpenEditar} onOk={handleOkEditar} onCancel={handleCancelEditar}
              footer={[<Button onClick={abrirCerrarModalEditar} type='primary' danger>Cancelar</Button>, <Button type='primary' form="myFormEditar" key="submit" htmlType="submit" > Actualizar</Button> ]}>
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
            

            {/* <Modal title={<><PlusSquareOutlined /> Eliminar producto </>} open={isModalOpenEliminar} onOk={handleOkEliminar} onCancel={handleCancelEliminar}
              footer={[<Button onClick={abrirCerrarModalEliminar} type='primary' danger>Cancelar</Button>, <Button type='primary' form="myFormEliminar" key="submit" htmlType="submit" >Eliminar</Button> ]}>
              <hr />
              <br />
              <Form id="myFormEliminar" name="basic" style={{maxWidth: 600,}} initialValues={{remember: true,}} onFinish={onFinishEliminar} onFinishFailed={onFinishFailedEliminar} autoComplete="off">
                <span>Usted esta deacuerdo con eliminar el producto con nombre <strong>{nombreEditar}</strong> con precio de <strong>{precioEditar}</strong></span>
              </Form>
            </Modal> */}
            <ModalEliminarProducto visible={isModalOpenEliminar} getListaProductos={getListaProductos} precioProducto={precioEditar} nombreProducto={nombreEditar} idProducto={idProducto} onCancel={handleOkEliminar} />

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
                        <Input name="url_cotizacion_bolivia" disabled={disabledCotizacionBolivia}  onChange={changeURLCotizacionBolivia} value={urlCotizacionBolivia} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item label="Precio U." rules={[{required: true, message: 'Escriba el nombre de la ciudad!',},]}>
                        <InputNumber name="precioUnitario" disabled={disabledCotizacionBolivia} ref={refPrecioUnitarioBolivia} onChange={changePrecioUnitarioBolivia} value={precioUnitarioBolivia} style={{ width: '100%' }}/>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Pago extra" rules={[{required: true, message: 'Escriba el nombre de la ciudad!',},]}>
                        <InputNumber name="pagoExtra" disabled={disabledCotizacionBolivia} ref={refPagoExtraBolivia} onChange={changePagoExtraBolivia} value={pagoExtraBolivia} style={{ width: '100%' }}/>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Stock" rules={[{required: true, message: 'Escriba el nombre de la ciudad!',},]}>
                        <InputNumber name="stock" disabled={disabledCotizacionBolivia} onChange={changeStockBolivia} value={stockBolivia} style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={6}>
                      <Form.Item label="Cantidad" rules={[{required: true, message: 'Escriba el nombre de la ciudad!',},]}>
                        <InputNumber name="cantidad" disabled={disabledCotizacionBolivia} ref={refCantidadBolivia} onChange={changeCantidadBolivia} value={cantidadBolivia} style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="Cotizacion" rules={[{required: true, message: 'Escriba el nombre de la ciudad!',},]}>
                        <InputNumber name="cotizacion" disabled={disabledCotizacionBolivia} ref={refCotizacionBolivia} onChange={changeCotizacionTotalBolivia} value={cotizacionBolivia} style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="Descuento" rules={[{required: true, message: 'Escriba el nombre de la ciudad!',},]}>
                        <InputNumber name="descuento" disabled={disabledCotizacionBolivia} ref={refDescuentoBolivia} onChange={changeDescuentoTiendaBolivia} value={descuentoBolivia} style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="Total" rules={[{required: true, message: 'Escriba el nombre de la ciudad!',},]}>
                        <InputNumber name="total" disabled={disabledCotizacionBolivia} ref={refTotalBolivia} onChange={changeTotalTiendaBolivia}  value={totalBolivia} style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={12}>
                    <Col span={12}>
                      <Form.Item name="radio-group" label="Existe producto?">
                        <Radio.Group defaultValue={existeProducto} onChange={changeExistenciaProducto}>
                          <Radio value={1}>Si</Radio>
                          <Radio value={0}>No</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Button type="primary" block style={{background:colorButton, color:'white', height:'60%'}} htmlType="submit" > <SaveOutlined /> {textButton}</Button>
                    </Col>
                  </Row>
                  <hr />
                </Form> 
                <Table dataSource={cotizacionesBolivia}  style={{width: '100%'}} columns={columnsCotizacionBolivia} />
              </Modal>
            <Table dataSource={productos} bordered columns={columns} />;
          </Content>
        </Layout>
      </Layout>
    );
  };