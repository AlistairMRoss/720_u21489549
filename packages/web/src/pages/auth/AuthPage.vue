<script lang="ts">
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-vue'
import HeaderComponent from '../../components/display/HeaderComponent.vue'
import '@aws-amplify/ui-vue/styles.css'

export default {
  props: {
    size: {
        type: String, 
        default: '200px'
      }
  },
  setup () {
    const auth = useAuthenticator()
    return {
      auth
    }
  },
  components: {
    HeaderComponent,
    Authenticator
  },
  methods: {
    goToPrivacy() {
      this.$router.push('privacy')
    }
  }
}
</script>

<template>
  <div class="row mx-0 vh-100 vw-100  align-items-center">
    <div class="col-12">
      <HeaderComponent :size="size"/>
      <br>
      <div class="row justify-content-center">
        <Authenticator :login-mechanisms="['email']" :hide-sign-up="false"></Authenticator>
      </div>
    </div>
    <div class="d-flex justify-content-center align-items-ceenter mt-3">
        <a @click="goToPrivacy" class="privacy-link">Privacy Policy</a>
    </div>
  </div>
</template>

<style scoped>
  .privacy-link {
    color: blue;
    text-decoration: underline;
    cursor: pointer;
  }
</style>