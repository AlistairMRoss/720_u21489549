<script lang="ts">
    import { defineComponent } from 'vue'
    import PageDisplay from '../../elements/pageDisplay/PageDisplay.vue'
    import PageOptionsBar from '../../elements/pageDisplay/PageOptionsBar.vue'
    import Course from './components/Course.vue'
    import { useCourseStore } from '../../stores/courseStore'

    export default defineComponent({
        name: 'HomePage',
        components: {
            PageDisplay,
            PageOptionsBar,
            Course
        }, setup () {
            const courseStore = useCourseStore()
            return { courseStore }
        }, data() {
            return {
            }
        }, mounted() {
            this.courseStore.getAllCourses()
        }, computed: {
            courses() {
                console.log(this.courseStore.courseList)
                return this.courseStore.courseList
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
                <div v-for="course in courses" :key="course.courseId" class="col-md-6 mb-4">
                    <Course :course="course" />
                </div>
            </div>
        </div>
    </PageDisplay>
</template>
