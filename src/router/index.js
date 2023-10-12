import { createRouter, createWebHistory } from 'vue-router';
import useUserStore from '@/stores/user';
import Home from '@/views/Home.vue';

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
		component: () => import('@/views/Manage.vue'),
		meta: {authenticationRequired: true}
	},
	{
		name: 'sound',
		path: '/sound/:ID',
		component: () => import('@/views/Sound.vue')
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

router.beforeEach((to, from, next) => {
	if (!to.meta.authenticationRequired) {
		next();

		return;
	} else {
		const userStore = useUserStore();

		if (userStore.loggedIn) {
			next();
		} else {
			next({name: 'home'});
		};
	};
});

export default router;