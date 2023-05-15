import { Modal, Form, Input, Button, Col, Row, Select } from 'antd';
import {DeleteOutlined } from '@ant-design/icons';
const TIENDA_BOLIVIA = "http://localhost/electronica/controlador/c_tienda_bolivia.php";

const ModalEliminarTiendaBolivia = ({ visible, onCancel, onSubmit , tiendasBolivia, setTiendasBolivia, nombreEliminarTiendaBolivia , urlEliminarTiendaBolivia, idTiendaBolivia}) => {
    const [form] = Form.useForm();
    const dangerColor = '#f5222d';
  
    const eliminarTiendaBolivia = async() =>{
        const resp = await fetch(TIENDA_BOLIVIA, {
            method: 'POST',
            body: JSON.stringify({metodo:'eliminarTiendaBolivia', idTiendaBolivia}),
            headers: { 'Content-Type': 'application/json' }
        });
        const respuesta = await resp.json();
        if(respuesta.respuesta === true){
            onCancel();
            let nuevoArreglo = tiendasBolivia.filter((item) => item.id_tienda_bolivia !== idTiendaBolivia);
            setTiendasBolivia(nuevoArreglo);
        }
    }

    return (
        <Modal title={<><DeleteOutlined style={{color:dangerColor,fontSize: '18px'}} /> Eliminar tienda bolivia </>} open={visible} onCancel={onCancel}
            footer={[<Button onClick={onCancel} type='primary' danger>Cancelar</Button>, <Button type='primary' onClick={eliminarTiendaBolivia} key="submit" htmlType="submit" >Eliminar</Button> ]}>
            <hr />
            <br />
            <Form id="myFormEliminar" name="basic" style={{maxWidth: 600,}} initialValues={{remember: true,}} onFinish={onCancel} onFinishFailed={onCancel} autoComplete="off">
            <span>Usted esta deacuerdo con eliminar la tienda con nombre <strong>{nombreEliminarTiendaBolivia}</strong> con la direcion de la pagina web <strong><a href={urlEliminarTiendaBolivia} target="_blank" rel="noopener noreferrer">{urlEliminarTiendaBolivia}</a></strong></span>
            </Form>
        </Modal>

    );
  };

  export default ModalEliminarTiendaBolivia;