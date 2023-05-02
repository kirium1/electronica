import {Table} from 'antd';
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