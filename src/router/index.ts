import { createRouter, createWebHistory } from 'vue-router';
import type {RouteRecordRaw} from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'PaginaPrincipal', // Mejor sin espacios
    component: () => import('@/views/PaginaPrincipal.vue')
  },
  {
    path: '/inicio-sesion', // Mejor con guión en lugar de camelCase
    name: 'InicioSesion', // Nombre único y sin espacios
    component: () => import('@/views/InicioSesion.vue')
  },
  {
    path: '/auxilio-escolar/llegada', // todo en minúsculas
    name: 'AuxilioEscolarLlegada', // Nombre único
    component: () => import('@/views/AuxilioEscolar/Llegada.vue') // Asegurar mayúscula correcta
  },
  {
    path: '/boceto',
    name: 'Boceto',
    component: () => import('@/views/BocetoAgenda.vue')
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;