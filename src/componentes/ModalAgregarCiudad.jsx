import { Button, Modal, Form, Input , Select } from 'antd';
import { useState } from 'react';



const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const ModalAgregarCiudad = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const [ciudad,setCiudad] = useState({
    id:"",
    metodo:"agregarCiudad",
    nombre:"",
    estado: "1"
  });

  const changeValor = e =>{
    const {name,value} = e.target;
    setCiudad({...ciudad,[name]:value});
  }

  function handleChangeSelect(value) {
    setCiudad({...ciudad, estado: value})
    console.log(ciudad);
  }

  const onFinish = async () => {
      const resp = await fetch('http://localhost/electronica/controlador/c_departamento.php', {
        method: 'POST',
        body: JSON.stringify(ciudad),
        headers: { 'Content-Type': 'application/json' }
    });
    // console.log(resp);
    const respuesta = await resp.json();
    console.log(respuesta);
    if(Number.isInteger(respuesta.respuesta)){
      setCiudad({...ciudad, id: Number.parseInt(respuesta.respuesta)});
      setIsModalOpen(false);
    }
  };

  const selecionarCiudad = (ciudad,caso) =>{
    setCiudad(ciudad);
    console.log(ciudad);
    caso(caso==='Editar')&& abrirCerrarModalInsertar();
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Agregar departamento" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} 
        footer={[<Button onClick={abrirCerrarModalInsertar} type='primary' danger>Cancelar</Button>, <Button type='primary' form="myForm" key="submit" htmlType="submit" >Agregar</Button> ]}>
        <hr />
        <br />
        <Form id="myForm" name="basic" labelCol={{span: 8,}} wrapperCol={{span: 16,}} style={{maxWidth: 600,}} initialValues={{remember: true,}} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
          <Form.Item label="Nombre ciudad"
            rules={[
              {
                required: true,
                message: 'Escriba el nombre de la ciudad!',
              },
            ]}
          >
            <Input name="nombre" onChange={changeValor} />
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
    </>
  );
};
export default ModalAgregarCiudad;