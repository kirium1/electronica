import { Button, Modal, Form, Input , InputNumber, Select ,Row , Col, Table } from 'antd';
import { useState } from 'react';
import {DeleteFilled, EditFilled, } from '@ant-design/icons';

const URL_COTIZACION_TIENDA_BOLIVIA = "http://localhost/electronica/controlador/c_cotizacion_tienda_bolivia.php";

let abrirCerrarModalProductoTiendaBolivia;
const CotizacionBolivia = (props) => {
  const columns = [
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
          <Button type='primary' onClick={()=>seleccionarCotizacion(producto,data,"Eliminar")}danger><DeleteFilled /></Button>
        </>)
    }
  ];
  
  const [idProducto,setIdProducto] = useState(0);
  const [idTienda,setIdTienda] = useState(0);
  const [precioUnitario,setPrecioUnitario] = useState(0.0);
  const [pagoExtra,setPagoExtra] = useState(0.0);
  const [stock,setStock] = useState(1);
  const [cantidad,setCantidad] = useState(1);
  const [cotizacion,setCotizacion] = useState(0.0);
  const [descuento,setDescuento] = useState(0.0);
  const [total,setTotal] = useState(0.0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  abrirCerrarModalProductoTiendaBolivia = () =>{
    abrirCerrarModalProductoTiendaBolivia(!isModalOpen);
  }

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    // setIsModalOpen(!isModalOpen);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const abrirCerrarModalInsertar = () =>{
    setIsModalOpen(!isModalOpen);
  }

  const seleccionarCotizacion = (product,data,caso)=>{
    console.log(data);
    // setIdProducto(data.id_producto);
    // setNombreEditar(data.nombre_producto);
    // setDetalleEditar(data.detalle_producto);
    // setEstadoEditar(data.estado_producto);
    // setPrecioEditar(data.precio_estandar);
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = () => {
    console.log('Enviado..');
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Cotizacion de tiendas" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} 
        footer={[<Button onClick={abrirCerrarModalInsertar} type='primary' danger>Cancelar</Button> ]}>
        <hr />
        <br />
        <Form id="myForm" name="basic" labelCol={{span: 8,}} wrapperCol={{span: 16,}} style={{maxWidth: 600,}} initialValues={{remember: true,}} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Tienda Bolivia" rules={[{required: true, message: 'Escriba el nombre de la ciudad!',},]}>
                <Select options={props.optionTiendasBolivia}></Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Producto" rules={[{required: true, message: 'Escriba el nombre de la ciudad!',},]}>
                <Input name="nombreProducto" value={props.nombre_producto}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Precio U." rules={[{required: true, message: 'Escriba el nombre de la ciudad!',},]}>
                <Input name="precioUnitario"/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Pago extra" rules={[{required: true, message: 'Escriba el nombre de la ciudad!',},]}>
                <InputNumber name="pagoExtra"/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Stock" rules={[{required: true, message: 'Escriba el nombre de la ciudad!',},]}>
                <InputNumber name="stock"/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="Cantidad" rules={[{required: true, message: 'Escriba el nombre de la ciudad!',},]}>
                <Input name="cantidad"/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Cotizacion" rules={[{required: true, message: 'Escriba el nombre de la ciudad!',},]}>
                <InputNumber name="cotizacion"/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Descuento" rules={[{required: true, message: 'Escriba el nombre de la ciudad!',},]}>
                <InputNumber name="descuento"/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Total" rules={[{required: true, message: 'Escriba el nombre de la ciudad!',},]}>
                <InputNumber name="total"/>
              </Form.Item>
            </Col>
          </Row>
          <Table dataSource={cotizacionesTiendaBolivia}  className="your-table" columns={columnsProductosTiendaBolivia} />;
        </Form>
      </Modal>
    </>
  );
};
export {abrirCerrarModalProductoTiendaBolivia};
export default CotizacionBolivia;