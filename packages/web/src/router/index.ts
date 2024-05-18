import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from '../pages/auth/AuthPage.vue'
import Home from '../pages/home/Home.vue'
import { useAuthStore } from '../stores/authStore'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Auth',
      component: AuthPage
    },
    {
      path: '/',
      name: 'Courses',
      component: Home
    }
  ]
})

router.beforeEach((to) => {
  console.log('did this')
  // const authStore = useAuthStore()
  // authStore.checkLoginStatus()
})

export default router