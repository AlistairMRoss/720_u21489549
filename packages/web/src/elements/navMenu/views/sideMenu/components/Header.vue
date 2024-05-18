<script lang="ts">
    import LogoComponent from '../../../../../components/logo/LogoComponent.vue'

    export default {
        name: 'HeaderPage',
        props:['size'],
        components: {
            LogoComponent
        }
    }
</script>

<template>
    <div class="topBar" :class="'sideMenu-width'">
        <div class="row mx-0 h-100 align-items-center border_bottom">
            <div class="col-auto col-lg-11 text-center">
                <LogoComponent :size="size"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.sideMenu-width {
  width: 230px;
}
@media (min-width: 992px) {
  .border_bottom {
    border-bottom: 1px solid;
  }
}
</style>