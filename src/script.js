import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Application from './Application.vue';
import router from './router';
import NProgress from './includes/NProgress';
import { authentication } from './includes/fireBase';
import GlobalComponentsPlugIn from './includes/globalComponents';
import i18n from './includes/i18n/i18n';
import VeeValidatePlugIn from './includes/veeValidate';
import IconDirective from './directives/icon';
import 'nprogress/nprogress.css';
import './style/tailWind.css';
import './style/style.css';

NProgress(router);

let application;

authentication.onAuthStateChanged(() => {
	if (!application) {
		application = createApp(Application);

		application.use(createPinia());
		application.use(router);
		application.use(GlobalComponentsPlugIn);
		application.use(i18n);
		application.use(VeeValidatePlugIn);

		application.directive('icon', IconDirective);

		application.mount('#root');
	};
});