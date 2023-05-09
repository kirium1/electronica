// import { MenuAntDesing } 
import { MenuAntDesing } from '../componentes/MenuAntDesing';
import { MyDashboard } from '../componentes/Dashboard';
import { TiendaBolivia } from '../componentes/TiendaBolivia';

export const Landing = () => <h2>My landing (Public)</h2>

export const Home = () => {    
    // return <h2>Home Page (Private)</h2>
    return <MenuAntDesing />
}

export const Dashboard = () => {
    return <MyDashboard />
}

export const MyTiendaBolivia = () => {
    return <TiendaBolivia />
}

export const Analytics = () => <h2>My Analytics (Private , permission: 'analize')</h2>

export const Admin = () => <h2>My Admin (Private , permission: 'admi')</h2>
