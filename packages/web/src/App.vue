<script lang='ts'>
  import router from './router'
  import { useAuthStore } from './stores/authStore'
  import { Hub } from 'aws-amplify/utils'

  export default {
    name:  'App',
    setup() {
      const authStore = useAuthStore()
      return { authStore }
    },
    created() {
      Hub.listen('auth', (data) => {
        const { payload } = data;
        if (payload.event === 'signedIn') {
          this.authCheck();
        }
      });
    },
    mounted () {
      this.authStore.checkLoginStatus()
      if (this.authStore.isLoggedIn === true ) { // && this.authStore.authDetails !== null
        router.push('/')
      } else {
        router.push('/login')
      }
    },
    methods: {
      async authCheck () {
        await this.authStore.checkLoginStatus()
      },
    }
  }
</script>

<template>
  <RouterView />
</template>
