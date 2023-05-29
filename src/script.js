import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Application from './Application.vue';
import router from './router';
import './style.css';

const application = createApp(Application);

application.use(createPinia());
application.use(router);

application.mount('#root');