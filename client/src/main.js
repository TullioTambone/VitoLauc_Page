import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
//importare bootstrap js
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"


createApp(App).use(router).mount('#app')
