import { createRouter, createWebHistory } from 'vue-router';
import type {RouteRecordRaw} from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Pagina Principal',
    component: () => import('@/views/PaginaPrincipal.vue')
  },
  {
    path: '/inicioSesion',
    name: 'Inicio de sesion',
    component: () => import('@/views/InicioSesion.vue')
  },
  {
    path: '/Boceto',
    name: 'Boceto',
    component: () => import('@/views/BocetoAgenda.vue')
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;