import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Manage from '@/views/Manage.vue';

const routes = [
	{
		name: 'home',
		path: '/',
		component: Home
	},
	{
		name: 'manage',
		path: '/manage',
		component: Manage
	}
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
});

export default router;