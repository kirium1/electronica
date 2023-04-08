import React,{useRef}  from 'react';
import {  Button, Form, Input  } from 'antd';

const URL_LOGIN = "http://localhost/electronica/controlador/c_validar.php";

// const onFinish = (values) => {
//     console.log('Success:', values);
//     const data = { username: values.username , pass: values.password};
  
//     fetch("http://localhost/electronica/controlador/c_validar.php", {
//       method: "POST", 
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Success:", data);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

const enviarDato = async (url, data) =>{

    const resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    });

    // console.log(resp);
    const respuesta = await resp.json();
    console.log(respuesta);
    return respuesta;
}

export default function Login(props){

    const refUsuario = useRef(null);
    const refPass = useRef(null);

    const handleLogin = async (values)=>{
        console.log('Success:', values);
        const resp = await enviarDato(URL_LOGIN,values);
        // const data = {
        //     "usernname" : refUsuario.current.value,
        //     "pass": refPass.current.value
        // };
        // console.log(data);
        // return respuesta;
        // props(props.acceder(respuesta))
        props.acceder(resp.respuesta)
    }

    return(
        <div className="login">
            <Form name="basic" labelCol={{span: 8,}} wrapperCol={{span: 16,}} style={{maxWidth: 600,}} initialValues={{remember: true,}} onFinish={handleLogin} onFinishFailed={onFinishFailed} >
                <Form.Item label="Username" name="username" rules={[{required: true, message: 'Por favor ingrese su usuario!',},]}>
                    <Input ref={refUsuario} />
                </Form.Item>
                <Form.Item label="Password" name="password" rules={[{required: true, message: 'Por favor ingrese su password!',},]}>
                    <Input.Password ref={refPass} />
                </Form.Item>
                <Form.Item wrapperCol={{offset: 8, span: 16,}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}