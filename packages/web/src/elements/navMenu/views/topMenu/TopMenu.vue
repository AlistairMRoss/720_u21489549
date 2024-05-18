<template>
  <div class="row mx-0 justify-content-between align-items-center">
    <div class="col-auto p-0 text-capitalize topmenu">
      <div class="row mx-0 align-items-center d-none d-lg-flex fw-bold">
        <div class="col-auto p-0 lh-1">
          {{currentRouteName}}
        </div>
      </div>
    </div>
    <div class="col-auto p-0">
      <MenuProfile />
    </div>
  </div>
</template>

<script lang="ts">
  import MenuProfile from './views/MenuProfile.vue'

  export default {
    name: 'TopMenu',
    computed: {
      currentRouteName () {
        return this.$route.name
      }
    },
    components: { MenuProfile }
  }
</script>
