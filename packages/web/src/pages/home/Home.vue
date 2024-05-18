<script lang="ts">
    import { defineComponent } from 'vue'
    import PageDisplay from '../../elements/pageDisplay/PageDisplay.vue'
    import PageOptionsBar from '../../elements/pageDisplay/PageOptionsBar.vue'
    export default defineComponent({
        name: 'HomePage',
        components: {
            PageDisplay,
            PageOptionsBar
        }
    })
</script>

<template>
    <PageDisplay>
        <template v-slot:header>
            <PageOptionsBar />
        </template>
    </PageDisplay>
</template>