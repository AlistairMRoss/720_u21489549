import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from '../pages/auth/AuthPage.vue'
import Course from '../pages/home/Home.vue'
import MyCourses from '../pages/myCourses/MyCourses.vue'
import Profile from '../pages/Profile/Profile.vue'
import Users from '../pages/users/Users.vue'
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
      component: Course
    },
    {
      path: '/courses',
      name: "My Courses",
      component: MyCourses
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/users',
      name: "Users",
      component: Users
    }
  ]
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  authStore.checkLoginStatus()
})

export default router