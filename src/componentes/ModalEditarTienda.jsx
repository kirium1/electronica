import { Modal, Form, Input, Button, Col, Row, Select } from 'antd';
import React, { useRef, useState } from 'react';
import {PlusOutlined } from '@ant-design/icons';
const TIENDA_BOLIVIA = "http://localhost/electronica/controlador/c_tienda_bolivia.php";

const ModalEditarTienda = ({ visible, onCancel, onSubmit, successColor , tiendasBolivia, setTiendasBolivia, nombreEditarTiendaBolivia, nombreEditar }) => {
    const { Option } = Select;
    const [form] = Form.useForm();

    const handleSubmit = () => {
      form.validateFields().then(values => {
        form.resetFields();
        onSubmit(values);
        values.metodo = 'agregarTiendaBolivia';
        agregarTiendaBolivia(values)
      });
    };

    const agregarTiendaBolivia = async (values) => {     
        console.log(values);
        const resp = await fetch(TIENDA_BOLIVIA, {
          method: 'POST',
          body: JSON.stringify(values),
          headers: { 'Content-Type': 'application/json' }
        });
        const respuesta = await resp.json();
        if(Number.isInteger(respuesta.respuesta)){
          let nuevoElemento = {'id_tienda_bolivia':respuesta.respuesta, 'nombre_tienda': values.nombre, 
          'estado_tienda_bolivia':values.estado,'url_tienda_bolivia':values.direccion};
          setTiendasBolivia([...tiendasBolivia, nuevoElemento])
          // getListaTiendasBolivia();
        }
      };
  
    return (
        <Modal 
        open={visible}
        title={<><PlusOutlined  style={{color:'#73d13d',fontSize: '18px'}} /> Editar tienda Bolivia </>}
        onCancel={onCancel}
        footer={[ <Button key="cancel" onClick={onCancel}> Cancel </Button>,    
        <Button key="submit" type="primary" style={{ backgroundColor: successColor, borderColor: successColor }} onClick={handleSubmit}>Agregar </Button>,]}>
            <hr />
            <br />
          <Form form={form} layout="vertical">
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="nombreE" label="Nombre" rules={[{ required: true, message: 'Escriba el nombre de la tienda!' }]}>
                        <Input defaultValue={nombreEditar} />
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
    );
  };

  export default ModalEditarTienda;