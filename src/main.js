import { createApp } from 'vue';
/* import {
  ErrorIcon,
} from '../dist/customer-components.es'; */
import install from '../dist/customer-components.umd';
// import '../dist/customer-components.css';
import App from './App.vue';

const app = createApp(App);
app.use(install);
// app.component('ErrorIcon', ErrorIcon);
app.mount('#app');
