<script lang="ts">
import Logo from '../logo/LogoComponent.vue'
export default {
  name: 'HeaderComponent',
  props: ['size'],
  components: {
    Logo
  }
}
</script>
<template>
  <div class="row mx-0">
    <div class="col-12 text-center fs-1 py-2">
      <Logo :size="size"/>
    </div>
  </div>
</template>
