import React, { useState } from 'react';
// import Login from './componentes/Login';
// import Menu from './componentes/Menu';
import 'antd/dist/reset.css';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Landing, Home, Admin, Analytics , Dashboard, MyTiendaBolivia, MyCategoria, MyLogin } from './pages';
import { ProtectRoute } from './componentes/ProtectRoute';

function App(){
  const [user, setUser] = useState(null);
  const login = () => {
    // setUser({
    //   id:1,
    //   name: "Jhon",
    //   permissions: ['analiz']
    // })
    console.log('estos');
  }

  const cambiarUsuario = (valor) => {
    setUser(valor);
  }

  const logout = () => setUser(null);

  return (
    <BrowserRouter>
      {/* <Navigation/>
      {
        user ? (<button onClick={logout}>Logout</button>) : (<button onClick={login}> Login</button>)
      } */}
      <Routes> 
        <Route index element={<MyLogin login={login} setUser={setUser} cambiarUsuario={cambiarUsuario} />}  />
        <Route path='/login' element={<MyLogin login={login} setUser={setUser} cambiarUsuario={cambiarUsuario} />}  />
        {/* <Route index element={<Landing/>} /> */}
        {/* <Route path='/login' element={<MyLogin />} /> */}
        <Route path='/landing' element={<Landing/>} />
        <Route path='/tiendaBolivia' element={<MyTiendaBolivia/>} />
        <Route path='/categoria' element={<MyCategoria/>} />
        <Route element={<ProtectRoute isAllowed={!!user}/>}>
          <Route path='/home' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard/>} />
        </Route>
        <Route path='/analytics' element={
          <ProtectRoute isAllowed={!!user && user.permissions.includes('analize')} redirectTo="/home"> 
            <Analytics/>
          </ProtectRoute> 
        } />
        <Route path='/admin' element={<Admin/>} />
      </Routes>
    </BrowserRouter>
  )
}

function Navigation(){
  return <nav>
    <ul>
      <li>
        <Link to="/login">Login</Link>
      </li> 
      <li>
        <Link to="/landing">Landing</Link>
      </li>
      <li>
        <Link to="/home">Tiendas Aliexpress</Link>
      </li>
      <li>
        <Link to="/tiendaBolivia">Tiendas Bolivia</Link>
      </li>
      <li>
        <Link to="/categoria">Categoria</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/admin">Admin</Link>
      </li>
      <li>
        <Link to="/analytics">Analytics</Link>
      </li>
    </ul>
  </nav>
}

export default App;