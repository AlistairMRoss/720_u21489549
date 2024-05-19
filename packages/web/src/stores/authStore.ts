import { defineStore } from 'pinia'
import { getCurrentUser, fetchAuthSession, fetchUserAttributes, signOut } from '@aws-amplify/auth'
import type { AuthDetails } from '../../../sharedTypes/users'
import router from '../router/index'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authDetails: null as AuthDetails | null,
    isLoggedIn: false,
  }),
  actions: {
    async checkLoginStatus () {
      const attributes =  await fetchUserAttributes()
      const session = await fetchAuthSession();
      if(this.isLoggedIn) {
        if(session.tokens?.accessToken && this.checkTokenValid(session.tokens.accessToken.payload.exp as number)) {
          this.logout();
        } else {
          return;
        }
      }
      if(session.tokens !== undefined && !this.isLoggedIn) {
        const currentUser = await getCurrentUser()
        this.isLoggedIn = true
        this.login(currentUser, session, attributes)
        router.push('/')
      } else if (!this.isLoggedIn && session.tokens === undefined) {
          router.push('/login')
      }
    },
    async getGroups() {
        return (await fetchAuthSession()).tokens?.idToken?.payload['cognito:groups']
    },
    async login (val: any, session: any, attributes: any) {
      await this.setUser(val, session, attributes)
      this.isLoggedIn = true
    },
    async logout () {
      try {
        await signOut()
        router.push('/login')
      } catch (error) {
        console.log('error signing out: ', error);
      }
      await this.setUser(null, null, null)
      this.isLoggedIn = false
    },
    setUser (val: any, session: any, attributes: any) {
      if (val === null) {
        this.authDetails = val
      } else {
        this.authDetails = {
          userId: attributes.sub,
          email: attributes.email,
          token: session.tokens.accessToken.toString(),
          emailVerified: attributes.email_verified
        }
        console.log("got here")
      }
      return val
    },
    checkTokenValid(expiry: number) {
      if(expiry*1000 < Date.now()) {
        return true
      } else return false
    }
  },
  getters: {
    getUserAuthDetails (): AuthDetails | null {
      return this.authDetails as AuthDetails
    }
  },
  persist: true
})
