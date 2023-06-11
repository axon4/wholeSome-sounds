import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Application from './Application.vue';
import router from './router';
import VeeValidatePlugIn from './includes/veeValidate';
import { authentication } from './includes/fireBase';
import IconDirective from './directives/icon';
import './style/tailWind.css';
import './style/style.css';

let application;

authentication.onAuthStateChanged(() => {
	if (!application) {
		application = createApp(Application);

		application.use(createPinia());
		application.use(router);
		application.use(VeeValidatePlugIn);

		application.directive('icon', IconDirective);

		application.mount('#root');	
	};
});