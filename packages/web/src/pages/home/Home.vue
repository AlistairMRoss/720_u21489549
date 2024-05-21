<script lang="ts">
    import { defineComponent } from 'vue'
    import PageDisplay from '../../elements/pageDisplay/PageDisplay.vue'
    import PageOptionsBar from '../../elements/pageDisplay/PageOptionsBar.vue'
    import Course from './components/Course.vue'

    export default defineComponent({
        name: 'HomePage',
        components: {
            PageDisplay,
            PageOptionsBar,
            Course
        },
        data() {
            return {
                courses: ["COS301", "COS320", "COS330"]
            }
        }
    })
</script>

<template>
    <PageDisplay>
        <template v-slot:header>
            <PageOptionsBar />
        </template>
        <div class="container mt-5">
            <div class="row">
                <div v-for="course in courses" :key="course" class="col-md-6 mb-4">
                    <Course :courseName="course" />
                </div>
            </div>
        </div>
    </PageDisplay>
</template>
