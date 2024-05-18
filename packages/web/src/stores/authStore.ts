import { defineStore } from 'pinia'
import { getCurrentUser, fetchAuthSession,fetchUserAttributes, autoSignIn } from '@aws-amplify/auth'
import type { AuthDetails } from '../../../sharedTypes/users'
import router from '../router/index'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authDetails: null as AuthDetails | null,
    isLoggedIn: false,
  }),
  actions: {
        // console.log(getCurrentUser())
        // console.log((await fetchAuthSession()).tokens?.idToken?.payload['cognito:groups'])
        // console.log(fetchUserAttributes())
        // this.authDetails = await getCurrentUser()
    async checkLoginStatus () {
        console.log(fetchAuthSession())
        if((await fetchAuthSession()).tokens !== undefined){
            this.isLoggedIn = true
            router.push('/')
        } else {
            router.push('/login')
        }
    },
    async getGroups() {
        return (await fetchAuthSession()).tokens?.idToken?.payload['cognito:groups']
    },
    persist: true
  }
})
