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
		// alias: '/management',
		component: Manage
	},
	{
		name: 'catchAll',
		path: '/:catchAll(.*)*',
		redirect: {name: 'home'}
	}
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
	linkExactActiveClass: 'text-yellow-500'
});

export default router;