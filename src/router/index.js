import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import UsersPage from '../views/UsersPage.vue';
import Wrapper from '../components/Wrapper.vue';

const routes = [
  {
    path: '/',
    component: Wrapper,
    children: [
      {
        path: '/',
        redirect: '/users',
      },
      {
        path: '/users',
        component: UsersPage,
      },
      {
        path: '/login',
        component: LoginPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
