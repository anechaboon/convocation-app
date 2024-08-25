import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import Swal from 'sweetalert2';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPhone, faChair, faIdCard, faUsers } from "@fortawesome/free-solid-svg-icons";

library.add([faPhone, faChair, faIdCard, faUsers]);

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.component('VueDatePicker', VueDatePicker);
app.use(router);
app.use(pinia);

// Register FontAwesomeIcon as a global component
app.component('font-awesome-icon', FontAwesomeIcon)

app.config.globalProperties.$showAlert = (title, text, icon = 'success') => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: 'Ok'
  });
};

app.mount('#app');
