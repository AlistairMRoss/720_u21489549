import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { Amplify } from 'aws-amplify'
import App from './App.vue'
import router from './router'
import 'bootstrap-icons/font/bootstrap-icons.css'

// import './assets/base.scss'
// import './assets/base.css'

Amplify.configure({
  Auth: {
    region: ''
    userPoolId: ''
    userPoolWebClientId: ''
  },
  API: {
    endpoints: [
      {
        name: 'api',
        endpoint: 'https://igsogpvil4.execute-api.us-east-1.amazonaws.com', //import.meta.env.VITE_APP_API_URL,
        region: 'us-east-1' //import.meta.env.VITE_APP_REGION
      }
    ]
  }
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
createApp(App).use(router).use(pinia).mount('#app')
