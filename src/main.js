import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.component('VueDatePicker', VueDatePicker);
app.use(router);
app.use(pinia);
app.mount('#app');
