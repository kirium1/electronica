  import { AppstoreOutlined, UserOutlined, MenuFoldOutlined, TagOutlined, PaperClipOutlined, ShopOutlined, MenuUnfoldOutlined, AimOutlined} from '@ant-design/icons';
  import { Button, Menu, Table } from 'antd';
  import { useState, useEffect, Fragment } from 'react';
  import { Link } from 'react-router-dom';
  import ModalAgregarCiudad from './ModalAgregarCiudad';

  const URL_LOGIN = "http://localhost/electronica/controlador/c_validar.php";
  const URL_DEPARTAMENTO = "http://localhost/electronica/controlador/c_departamento.php";

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem(<Link to="/productos">Producto</Link>,'1',<TagOutlined />),
    getItem(<Link to="/categorias">Categoria</Link>,'2',<PaperClipOutlined />),
    getItem(<Link to="/usuarios">Usuario</Link>,'3',<UserOutlined />),
    getItem(<Link to="/departamentos">Departamento</Link>,'4',<AimOutlined />),
    getItem(<Link to="/tiendasBolivia">Tiendas Bolivia</Link>, 'sub1', <ShopOutlined />, [
      getItem('Option 5', '5'),
      getItem('Option 6', '6'),
      getItem('Option 7', '7'),
      getItem('Option 8', '8'),
    ]),
    getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
      getItem(<Link to="/dashboard">Bolivia</Link>,'9'),
      getItem('Option 10', '10'),
      getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
    ]),
  ];
  
  const columns = [
    {
      title: 'Codigo',
      dataIndex: 'id_ciudad_bolivia',
      key: 'id_ciudad_bolivia',
    },
    {
      title: 'Ciudad',
      dataIndex: 'nombre_ciudad',
      key: 'nombre_ciudad',
    },
    {
      title: 'Estado',
      dataIndex: 'estado_ciudad',
      key: 'estado_ciudad',
    },
    {
      title: 'Acciones',
      dataIndex: 'acciones',
      render: (fila) => (
        <>
          <Button type='primary'>Editar</Button> {"  "}
          <Button type='primary' danger>Eliminar</Button>
        </>)
    }
  ];

  export const MenuAntDesing = () => {
    const [data,setData] = useState([]);

    useEffect(() => {
      let values = {username:'omarcasasolasmerida@gmail.com',password:'8046987'}
      // enviarDato(URL_LOGIN,values);
      // const verificaUsuario = async () => {
      //   let resp = await enviarDato(URL_LOGIN,values);
      //   // setUsers(users);
      //   console.log(resp)
      // };
    
      // verificaUsuario(); 
      getDepartamentos();
    },[]);

    const enviarDato = async (url, data) =>{
      let resp = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' }
      });
      let respuesta = await resp.json();
      console.log(respuesta);
      return respuesta;
    }

    const getDepartamentos = async () => {
      // const location = window.location.hostname;
      const settings = {
          method: 'POST',
          body: JSON.stringify({metodo:'listaDeDepartamentos'}),
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          }
      };
      try {
          const fetchResponse = await fetch(URL_DEPARTAMENTO, settings);
          const data = await fetchResponse.json();
          // console.log(data);
          setData(data);
          return data;
      } catch (e) {
          return e;
      }    
    }


    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
      setCollapsed(!collapsed);
    };
    return (
      <Fragment>
      <div
        style={{
          width: 256,
        }}
      >
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{
            marginBottom: 16,
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
        />
      </div>
        <ModalAgregarCiudad />
        <br />
        <Table dataSource={data} columns={columns} pagination={{ pageSize: 50 }} />;
      </Fragment>
    );
  };

//  export default MenuAntDesing;