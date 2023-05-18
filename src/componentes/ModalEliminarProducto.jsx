import { Modal, Form, Button } from 'antd';
import {DeleteOutlined } from '@ant-design/icons';
const PRODUCTO = "http://localhost/electronica/controlador/c_producto.php";

const ModalEliminarProducto = ({ visible, onCancel , getListaProductos, nombreProducto , precioProducto, idProducto}) => {
    const dangerColor = '#f5222d';
  
    const eliminarProducto = async() =>{
        const resp = await fetch(PRODUCTO, {
        method: 'POST',
        body: JSON.stringify({metodo:'eliminarProducto',idProducto}),
        headers: { 'Content-Type': 'application/json' }
        });
        const respuesta = await resp.json();
        if(respuesta.salida === 'Exito'){
            getListaProductos();
            onCancel();
        }
    }

    return (
        <Modal title={<><DeleteOutlined style={{color:dangerColor,fontSize: '18px'}} /> Eliminar tienda bolivia </>} open={visible} onCancel={onCancel}
            footer={[<Button onClick={onCancel} type='primary' danger>Cancelar</Button>, <Button type='primary' onClick={eliminarProducto} key="submit" htmlType="submit" >Eliminar</Button> ]}>
            <hr />
            <br />
            <Form id="myFormEliminar" name="basic" style={{maxWidth: 600,}} initialValues={{remember: true,}} onFinish={onCancel} onFinishFailed={onCancel} autoComplete="off">
            <span>Usted esta de acuerdo con eliminar el producto <strong>{nombreProducto}</strong> con el precio actual de <strong>{precioProducto}</strong></span>
            </Form>
        </Modal>

    );
  };

  export default ModalEliminarProducto;