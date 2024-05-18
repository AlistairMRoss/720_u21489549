<script lang="ts">
    export default {
        name: 'PageOptionsBar'
    }
</script>

<template>
    <div class="row mx-0 secondTopBar pSide align-items-center vw-100 border-bottom bg-body">
      <div class="col-12 px-3">
        <slot />
      </div>
    </div>
</template>

<style scoped>
  .secondTopBar {
    position: fixed;
    top: 64px;
    height: 50px;
    z-index: 3;
  }
</style>