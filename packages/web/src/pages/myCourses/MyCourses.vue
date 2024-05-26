<template>
    <PageDisplay>
        <template v-slot:header>
            <PageOptionsBar />
        </template>
        <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 100vh;">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div v-else class="container mt-5">
            <div class="row">
                <div v-for="course in courses" :key="course.courseId" class="col-md-6 mb-4">
                    <Course :course="course" />
                </div>
            </div>
        </div>
    </PageDisplay>
</template>

<script lang="ts">
    import { defineComponent, ref, onMounted, watch } from 'vue'
    import PageDisplay from '../../elements/pageDisplay/PageDisplay.vue'
    import PageOptionsBar from '../../elements/pageDisplay/PageOptionsBar.vue'
    import Course from '../home/components/Course.vue'
    import { useCourseStore } from '../../stores/courseStore'
    import { type course } from '../../../../sharedTypes/course'
    
    export default defineComponent({
        name: 'MyCourses',
        components: {
            PageDisplay,
            PageOptionsBar,
            Course
        },
        setup() {
            const courseStore = useCourseStore()
            const loading = ref(true)
            const courses = ref<course[]>([])

            onMounted(async () => {
                await courseStore.getMyCourses()
                courses.value  = courseStore.myCourses || []
                loading.value = false
            })

            return { loading, courses }
        }
    })
</script>