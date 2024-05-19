<script lang="ts">

export default {
  name: 'MenuItem',
  props: ['pageTitle', 'routePath', 'icon', 'isMobile'],
  emits: ['closeMenu'],
  
  methods: {
    goTo () {
      if (this.isMobile) {
        this.$emit('closeMenu')
        setTimeout(() => {
          this.$router.push(this.routePath)
        }, 300)
      } else {
        this.$router.push(this.routePath)
      }
    }
  },
  computed: {
    isActive () {
      if (this.$route.path.toLowerCase() === this.routePath) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<template>
  <div class="col-12 py-4 my-0 menuItem pointer border-bottom" :class="{isActive: isActive}">
    <div class="row mx-0 align-items-center" @click="goTo">
      <div class="col-2 fs-5 lh-1">
        <i :class="icon" v-if="icon"></i>
      </div>
      <div class="col text-capitalize lh-1">
        {{pageTitle}}
      </div>
    </div>
  </div>
</template>

<style scoped>
  .menuItem.isActive {
    background-color: #F0EEEE;
  }
  .menuItem:hover {
    color: var(--bs-secondary);
  }
</style>