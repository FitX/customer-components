import { createApp } from 'vue';
import App from './App.vue';
import customerComponents from '../dist/customer-components.es';

const app = createApp(App);
app.use(customerComponents);
app.mount('#app');
