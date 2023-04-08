import React, { useState } from 'react';
// import Login from './componentes/Login';
// import Menu from './componentes/Menu';
import 'antd/dist/reset.css';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Landing, Home, Admin, Analytics , Dashboard } from './pages';
import { ProtectRoute } from './componentes/ProtectRoute';
// const App = () => (
//   <div className="App">
//     <Login/>
//   </div>
// );

// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import Home from './routes/home';
// import Aliexpress from "./routes/aliexpress";
// import Bolivia from "./routes/bolivia";

// const router = createBrowserRouter([
//   {
//       path:'/',
//       element: <Home />,
//       errorElement: <h1>Error</h1>
//   },
//   {
//       path:'/Bolivia',
//       element: <Bolivia />,
//   },
//   {
//       path:'/Aliexpress',
//       element:  <Aliexpress />,
//   },
// ]);

function App(){
  // const [conectado,setConectado] = useState(false);
  // const acceder = (estado) =>{
  //   setConectado(estado);
  // }
  // return (conectado ? <Menu/> : <Login acceder={acceder} /> );
  // return <Menu/>
  // <RouterProvider router={router}/>

  const [user, setUser] = useState(null);

  const login = () => {
    setUser({
      id:1,
      name: "Jhon",
      permissions: ['analiz']
    })
  }

  const logout = () => setUser(null)

  return (
    <BrowserRouter>
      <Navigation/>

      {
        user ? (<button onClick={logout}>Logout</button>) : (<button onClick={login}> Login</button>)
      }

      <Routes> 
        <Route index element={<Landing/>} />
        <Route path='/landing' element={<Landing/>} />
        <Route element={<ProtectRoute isAllowed={!!user}/>}>
          <Route path='/home' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard/>} />
        </Route>
        <Route path='/analytics' element={
          <ProtectRoute 
            isAllowed={!!user && user.permissions.includes('analize')} 
            redirectTo="/home"
          > 
            
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
        <Link to="/landing">Landing</Link>
      </li>
      <li>
        <Link to="/home">Home</Link>
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