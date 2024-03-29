import './assets/scss/all.scss';
import '/node_modules/bootstrap/dist/js/bootstrap.min'
import * as bootstrap from 'bootstrap'
// import 'bootstrap/dist/js/bootstrap.js';
import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)

app.mount('#app')
