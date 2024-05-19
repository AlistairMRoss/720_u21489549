<script lang="ts">
import NavMenu from '../navMenu/NavMenu.vue'
export default {
    name: 'PageDisplay',
    components: { NavMenu }
}
</script>

<template>
    <div class="min-vh-100">
        <NavMenu />
        <slot name="header" />
        <div class="row mx-0 pSide pTop">
          <slot />
        </div>
    </div>
</template>

<style scoped>
.behind {
    z-index: 1;
}
.infront {
    z-index: 2;
}
</style>
