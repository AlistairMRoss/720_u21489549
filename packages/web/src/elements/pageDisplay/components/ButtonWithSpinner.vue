<script lang="ts">
export default {
  name: 'ButtonWithSpinner',
  props: ['btnClass', 'isBusy', 'disabled'],
  methods: {
    clicked () {
      this.$emit('btnClicked')
    }
  }
}
</script>
<template>
  <button class="btn" :class="[btnClass]" type="button" @click="clicked" :disabled="isBusy || disabled">
    <div class="row mx-0 align-items-center justify-content-center">
      <div class="col-auto ps-0 pe-2" v-if="isBusy">
        <div class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></div>
      </div>
      <div class="col p-0">
        <slot></slot>
      </div>
    </div>
  </button>
</template>
