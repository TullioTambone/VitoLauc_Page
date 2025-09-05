import { createRouter, createWebHistory } from 'vue-router';

import landingPage from '../views/landingPage.vue';
import home from '../views/home.vue';
import works from '../views/works.vue';
import contact from '../views/contact.vue';
import login from '../views/LoginAdmin.vue';
import adminDashboard from '../views/AdminDashboard.vue';

import { isAdminLoggedIn } from '../services/auth.js';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: { transition: 'fade'}
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: adminDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    name: 'landingPage',
    component: landingPage,
    meta: { transition: 'fade' }
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    meta: { transition: 'fade' }
  },
  {
    path: '/contact',
    name: 'contact',
    component: contact,
    meta: { transition: 'fade' }
  },
  {
    path: '/works',
    name: 'works',
    component: works,
    meta: { transition: 'fade' }
  },
  {
    path: '/work',
    name: 'work',
    props: true,
    component: () => import('../views/singleWork.vue'),
    meta: { transition: 'fade' }
  },
  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: () => import('../views/unauthorized.vue'),
    meta: { transition: 'fade' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAdminLoggedIn()) {
    next({ name: 'unauthorized' });
  } else {
    next();
  }
});

export default router;