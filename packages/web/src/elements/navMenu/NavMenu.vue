<script lang="ts">
    import { storeToRefs } from 'pinia'
    import { defineComponent } from 'vue'
    import SideMenu from './views/sideMenu/SideMenu.vue'
    import TopMenu from './views/topMenu/TopMenu.vue'
    import SideMenuHeader from './views/sideMenu/components/Header.vue'

    export default defineComponent({
        name: 'NavMenu',
        props: {
          size: {
            type: String, 
            default: '100px'
          }
        },
        components: {
            SideMenu,
            TopMenu,
            SideMenuHeader
        },
        data() {
            return {
                showMenu: true
            }
        }

    })
</script>

<template>
  <div class="fixed-top vw-100">
    <div class="row mx-0 topBar align-items-center border-bottom bg-body-tertiary">
      <div class="col-auto position-relative p-0">
        <SideMenuHeader v-model="showMenu" :size="size"/>
        <SideMenu class="d-none d-lg-block" v-model="showMenu" :size="size"/>
      </div>
      <div class="col px-md-4 lh-1">
        <TopMenu />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .link:hover {
    background-color: var(--bs-light)
  }
  .maxWidth {
    max-width: 150px;
  }
  .expandMenu-enter-active {
  transition: all 0.3s ease-out;
  }
  .expandMenu-leave-active {
    transition: all 0.3s ease-in;
  }

  .expandMenu-enter-from {
    opacity: 1;
    transform: translateX(-100%);
  }
  .expandMenu-enter-to {
    opacity: 1;
    transform: translateX(0);
  }
  .expandMenu-leave-to {
    opacity: 1;
    transform: translateX(-100%);
  }
  .expandMenu-leave-from {
    opacity: 1;
    transform: translateX(0);
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>