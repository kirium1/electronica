import { Modal, Form, Input, InputNumber, Button, Select, Upload, Col, Row } from 'antd';
import { PlusSquareOutlined, UploadOutlined } from '@ant-design/icons';
const PRODUCTO = "http://localhost/electronica/controlador/agregar_producto.php";

const ModalAgregarProducto = ({ visible, handleOk, onCancel , onSubmit, successColor , tiendasBolivia, setTiendasBolivia, categorias, getListaProductos }) => {
  const { Option } = Select;    
  const [form] = Form.useForm();
  
    const handleSubmit = () => {
      const formData = new FormData();
      form.validateFields().then(values => {
        for (const name in values) {
          formData.append(name, values[name]); // there should be values.avatar which is a File object
        }
        values.files.fileList.forEach((file) => {
          formData.append('files[]', file.originFileObj);
        });
        agregarProducto(formData);
      });
    };

    const agregarProducto = async (values) => {
      console.log(values);
      const settings = {
        method: 'POST',
        body: values,
      };
      // console.log(values.getAll('files'));
      try {
          const fetchResponse = await fetch(PRODUCTO, settings);
          const datos = await fetchResponse.json();
          console.log(datos);
          if(datos.respuesta === 1){
            form.resetFields();
            getListaProductos();
            onCancel();
          }
          return datos;
      } catch (e) {
          console.log(e);
          return e;
      }    
    }
    
  
    return (
      <Modal 
        open={visible} 
        title={<><PlusSquareOutlined style={{color:'green',fontSize: '18px'}} /> Agregar producto </>} 
        onCancel={onCancel}
        footer={[<Button key="cancel" onClick={onCancel} type='primary' danger>Cancelar</Button>,
        <Button key="submit" type='primary' onClick={handleSubmit}>Agregar</Button> ]}>
        <hr />
        <br />
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item label="Nombre" name="nombre"
                rules={[
                    {
                      required: true,
                      message: 'Escriba el nombre de la ciudad!',
                    },
                  ]}
                >
                <Input/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Precio" name="precio"
                  rules={[
                    {
                      required: true,
                      message: 'Escriba el precio del producto!',
                    },
                  ]}
                >
                <InputNumber min={0} max={10000} defaultValue={1} step={0.1} style={{width:'100%'}}/>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Detalle producto" name="detalle"
            rules={[
              {
                required: true,
                message: 'Escriba detalle del producto!',
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Estado" name="estado" rules={[
                {
                  required: true,
                  message: 'Seleccione una opcion!',
                },
              ]}>
                <Select placeholder="Seleccione una opcion">
                  <Option value="1">Si</Option>
                  <Option value="0">No</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="Categoria" name="categoria" rules={[
                {
                  required: true,
                  message: 'Seleccione una opcion!',
                },
              ]}>
                <Select mode="multiple" options={categorias} filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          
          <Form.Item name="files" label="Imágenes">
            <Upload
              required
              getValueFromEvent={({file}) => file.originFileObj}
              name="files"
              multiple
              beforeUpload={() => false} // Evita la carga automática de archivos 
              accept="image/*" 
            >
              <Button icon={<UploadOutlined />}>Seleccionar archivos</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  export default ModalAgregarProducto;