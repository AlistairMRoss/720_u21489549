<script lang="ts">
  import { useAuthStore } from '../../../../../stores/authStore'

  export default {
    name: 'LogoutComponent',
    setup () {
      const authStore = useAuthStore()
      return {
        authStore
      }
    },
    data () {
      return {
        isLoading: false
      }
    },
    methods: {
      async logout () {
        this.isLoading = true
        // await this.authStore.logout()
        this.$router.push('/auth')
        this.isLoading = false
      }
    }
  }
</script>

<template>
  <div class="row mx-0 align-items-center link pointer p-2" @click="logout">
    <div class="col-auto">
      <div class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="isLoading"></div>
      <i class="bi bi-box-arrow-right" v-else />
    </div>
    <div class="col ps-0 px-5">
      Logout
    </div>
  </div>
</template>

<style scoped>
  .link:hover {
    background-color: var(--bs-body-bg)
  }
</style>
