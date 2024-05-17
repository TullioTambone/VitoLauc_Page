import { createRouter, createWebHistory } from "vue-router";

import landingPage from '../views/landingPage.vue';
import home from '../views/home.vue';
import works from '../views/works.vue';
import contact from '../views/contact.vue';

const routes = [
    {
        path: '/',
        name: 'landingPage',
        component: landingPage,
        meta: { transition: 'fade'}
    },
    {
        path: '/home',
        name: 'home',
        component: home,
        meta: { transition: 'fade'}
    },
    {
        path:'/contact',
        name:'contact',
        component: contact,
        meta: { transition: 'fade'}
    },
    {
        path:'/works',
        name:'works',
        component: works,
        meta: { transition: 'fade'},
    },
    {
        //path: '/search/:slug',
        path:'/work',
        name: 'work',
        props: true,
        component: () => import('../views/singleWork.vue'),
        meta: { transition: 'fade'}
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router