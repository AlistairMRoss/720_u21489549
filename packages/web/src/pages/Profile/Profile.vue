<template>
    <PageDisplay>
        <template v-slot:header>
            <PageOptionsBar />
        </template>
    </PageDisplay>
</template>

<script lang="ts">
    import PageDisplay from '../../elements/pageDisplay/PageDisplay.vue'
    import PageOptionsBar from '../../elements/pageDisplay/PageOptionsBar.vue'

    export default {
        name: "Profile",
        components: {
            PageDisplay,
            PageOptionsBar
        }
    }
</script>