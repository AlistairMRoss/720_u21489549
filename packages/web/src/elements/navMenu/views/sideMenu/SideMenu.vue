<script lang="ts">
    import { defineComponent, ref, onMounted } from 'vue'
    import MenuItem from './components/MenuItem.vue'
    import Header from './components/Header.vue'
    import { useAuthStore } from '../../../../stores/authStore'

    interface MenuItem {
      pageTitle: string
      routePath: string
      icon: string
    }

    export default defineComponent({
        name: 'SideMenuPage',
        props: ['size'],
        components: {
            MenuItem,
            Header
        },
        setup() {
          const authStore = useAuthStore()
          const authDetails = ref<string[]>()
          const menuItems = ref<MenuItem[]>()
          
          onMounted(async () => {
            authDetails.value = await authStore.getGroups() as string[]
            if(authDetails.value === undefined) {
              menuItems.value = [
                { pageTitle: 'Courses', routePath: '/', icon: 'bi bi-bank' },
                { pageTitle: 'Profile', routePath: '/profile', icon: 'bi bi-person' }
              ]
            }
            else if(authDetails.value[0] === 'admin') {
              menuItems.value = [
                { pageTitle: 'Courses', routePath: '/', icon: 'bi bi-bank' },
                { pageTitle: 'Users', routePath: '/users', icon: 'bi bi-people' }
              ]
            } else if (authDetails.value[0] === 'student') {
              menuItems.value = [
                { pageTitle: 'Courses', routePath: '/', icon: 'bi bi-bank' },
                { pageTitle: 'My Courses', routePath: '/courses', icon: 'bi bi-collection' },
                { pageTitle: 'Profile', routePath: '/profile', icon: 'bi bi-person' }
              ]
            }
          })
          return { menuItems }
        }
    })
</script>

<template>
    <div class="top-0 start-0 vh-100 w-100 menuHolder bg-body-tertiary">
        <div class="row m-0 h-100">
            <transition name="expandMenu">
                <div class="col-12 col-sm-6 col-md-4 col-lg-12 p-0 h-100 infront">
                    <div class="d-flex align-items-end flex-column h-100 w-100">
                        <div class="w-100 border-end">
                            <Header :size="size"/>
                        </div>
                        <div class="w-100">
                            <div class="row mx-1">
                              <MenuItem v-for="menuItem, index in menuItems" :key="index" :pageTitle="menuItem.pageTitle" :routePath="menuItem.routePath" :icon="menuItem.icon"></MenuItem>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
    
</template>

<style scoped>
  .behind {
    z-index: 1;
  }
  .infront {
    z-index: 2;
    overflow-y: auto;
    max-height: 100vh;
  }
  .menuHolder {
    position: fixed;
  }

  .fade-enter-active,

  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  @media (min-width: 992px) {
   .menuHolder {
     position: absolute;
     max-width: 230px;
    }
  }
</style>