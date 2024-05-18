<script lang="ts">
  import { useAuthStore } from '../../../../../stores/authStore'
  import LogoutComponent from '../components/LogoutComponent.vue'
  
  export default {
    name: 'MenuProfile',
    setup() {
        const authStore = useAuthStore()
        return {
          authStore
        }
      },
    data() {
      return {
        isShowProfile: false,
      }
    },
    components: {
      LogoutComponent
    },
    methods: {
      toggleProfile () {
        this.isShowProfile = !this.isShowProfile
      },
      close () {
        this.isShowProfile = false
      }
    }
  }
</script>

<template>
  <div class="row mx-0 align-items-center pointer" @click="toggleProfile">
    <div class="col-auto lh-1 fs-5 px-1">
      <i class="bi-person-circle"></i>
    </div>
    <div class="col-auto lh-1 px-1 text-truncate" v-if="authStore?.authDetails?.email">
      {{ authStore?.authDetails?.email }}
    </div>
    <div class="col-auto p-0 lh-1 small" :class="{rotateDown: isShowProfile, rotateUp: !isShowProfile}">
      <i class="bi-chevron-down"></i>
    </div>
  </div>
  <div class="bg-body-tertiary rounded-1 shadow-sm border mt-3 position-absolute end-0 me-3 py-2" v-if="isShowProfile">
    <LogoutComponent />
  </div>
</template>
