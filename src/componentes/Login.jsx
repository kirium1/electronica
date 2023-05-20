import React,{useRef}  from 'react';
import {  Button, Form, Input, Space , Card, notification } from 'antd';
import { UserSwitchOutlined, CloseCircleOutlined, SmileOutlined } from '@ant-design/icons';

export const Login = ({setUser, login}) => {
  // return(
  const URL_LOGIN = "http://localhost/electronica/controlador/c_validar.php";
  const refUsuario = useRef(null);
  const refPass = useRef(null);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleLogin = async (values)=>{
      console.log('Success:', values);
      // const resp = await enviarDato(URL_LOGIN,values);
      const resp = await fetch(URL_LOGIN, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await resp.json();
    // console.log(data);
    if(data.respuesta === true){
      let usuario = {
        id: 1,
        name: values.username,
        permissions: ['admin']
      };
      // props.cambiarUsuario(usuario);
      setUser(usuario);
      // login();

      notification.open({
        message: 'Exito',
        description:
          `Usuario verificado correctamente!!`,
        icon: (
          <SmileOutlined
            style={{
              color: '#108ee9',
            }}
          />
        ),
      });
    }else{
      notification.open({
        message: 'Error',
        description:
          `Error al autentificar el usuario`,
        icon: (
          <CloseCircleOutlined
            style={{
              color: '#cf1322',
            }}
          />
        ),
      });
    }
    
      // props.acceder(resp.respuesta)
  }

  return(
      <Space
        direction="vertical"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <Card title={<><UserSwitchOutlined style={{color:'#1890ff',fontSize: '18px'}} /> Acceso al Sistema </>} 
          headStyle={{ background: '#d9d9d9', border: '1px solid #d9d9d9' }} 
          bodyStyle={{background:'#f5f5f5'}}
          size="small" style={{ width: 700,}}>
          <div className="login" >
            <Form name="basic" labelCol={{span: 8,}} wrapperCol={{span: 16,}} style={{maxWidth: 600,}} initialValues={{remember: true,}} onFinish={handleLogin} onFinishFailed={onFinishFailed} >
                <Form.Item label="Username" name="username" rules={[{required: true, message: 'Por favor ingrese su usuario!',},]}>
                    <Input ref={refUsuario} />
                </Form.Item>
                <Form.Item label="Password" name="password" rules={[{required: true, message: 'Por favor ingrese su password!',},]}>
                    <Input.Password ref={refPass} />
                </Form.Item>
                <Form.Item wrapperCol={{offset: 8, span: 16,}}>
                    <Button type="primary" htmlType="submit">
                      Acceder
                    </Button>
                </Form.Item>
            </Form>
          </div>
        </Card>
      </Space>
  );
}

