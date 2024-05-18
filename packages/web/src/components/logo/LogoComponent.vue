<script lang="ts">
import Logo from './Logo.svg'

export default {
  name: 'BeamIcon',
  props: ['size'],
  components: {
    Logo
  }
}
</script>

<template>
    <Logo :style="{ width: size, height: 'auto' }"/>
</template>
