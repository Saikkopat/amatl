import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import router from './router'
import { configure, defineRule } from 'vee-validate'
import { required } from '@vee-validate/rules'

const app = createApp(App)

configure({
  validateOnInput: true, // Valida al escribir
  validateOnChange: true, // Valida al cambiar
})

defineRule('required', required)

app.use(router)
app.mount('#app')