import Home from './pages/Home';
import AppointmentList from './pages/Appointments';

const routes = [
  {
    component: Home,
    name: 'Agendamento',
    path: '/',
  },
  {
    component: AppointmentList,
    name: 'Calendário de Vacinação',
    path: '/appointments',
  },
];

export default routes;
