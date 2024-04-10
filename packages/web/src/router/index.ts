import { createRouter, createWebHistory } from 'vue-router'
//  import { useAuthStore } from '../stores/authStore'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  ]
})

// router.beforeEach((to) => {
//   const authStore = useAuthStore()
//   console.log()
//   if (authStore.checkLoginStatus === undefined) {
//     return { name: 'Auth' }
//   } else if ((authStore.isLoggedIn === true && authStore.authDetails !== null) && (to.name === 'Auth')) {
//     return { name: 'Sites' }
//   } 
// })

export default router