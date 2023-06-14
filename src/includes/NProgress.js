import nProgress from "nprogress";

function NProgress(router) {
	router.beforeEach((to, from, next) => {
		nProgress.start();

		next();
	});

	router.afterEach(() => {nProgress.done()});
};

export default NProgress;