import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';
import PageLayout from "@/layout/PageLayout.vue";

const router = createRouter({
    history: createWebHistory('/'),
    routes: [
        {
            path: '/',
            component: PageLayout,
            children: [
                {
                    path: '/',
                    name: 'about',
                    component: () => import('@/views/public/About.vue')
                },
                {
                    path: '/reports',
                    name: 'reports',
                    component: () => import('@/views/public/Reports.vue')
                },
                {
                    path: '/events',
                    name: 'events',
                    component: () => import('@/views/public/Events.vue')
                },
            ],
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },
        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        },
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/new_report',
                    alias: '/admin',
                    name: 'New Report',
                    component: () => import('@/views/pages/ReportEditor.vue')
                },
                {
                    path: '/edit_report/:id?',
                    name: 'Edit Report',
                    component: () => import('@/views/pages/ReportEditor.vue'),
                    props: true,
                },
                {
                    path: '/new_event',
                    name: 'New Event',
                    component: () => import('@/views/pages/EventEditor.vue')
                },
                {
                    path: '/edit_event/:id?',
                    name: 'Edit Event',
                    component: () => import('@/views/pages/EventEditor.vue'),
                    props: true,
                },
            ]
        },
    ]
});

export default router;
