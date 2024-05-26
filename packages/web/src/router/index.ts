import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from '../pages/auth/AuthPage.vue'
import Course from '../pages/home/Home.vue'
import MyCourses from '../pages/myCourses/MyCourses.vue'
import CreateCourse from '../pages/home/components/CreateCourse.vue'
import Profile from '../pages/Profile/Profile.vue'
import Users from '../pages/users/Users.vue'
import UserInfo from '../pages/users/UserInfo.vue'
import Privacy from '../pages/auth/Privacy.vue'
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
    },
    {
      path: '/userinfo/:username',
      name: 'Info',
      component: UserInfo
    },
    {
      path: '/createcourse',
      name: 'Create Course',
      component: CreateCourse
    },
    {
      path: '/privacy',
      name: 'Privacy',
      component: Privacy
    }
  ]
})

router.beforeEach(async(to, from, next) => {
  if (to.path === '/login') {
    return next()
  } else if (to.path === '/createcourse' || to.path === '/userinfo/:username' || to.path ===  '/users'){
    const authStore = useAuthStore()
    const groups = await authStore.getGroups() as string[]
    if (groups.indexOf('admin') !== -1) {
      return next()
    } else {
      return next(from)
    }
  } else {
    return next()
  }
  
})

export default router