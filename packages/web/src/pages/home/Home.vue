<template>
    <PageDisplay>
        <template v-slot:header>
            <PageOptionsBar>
                <div class="d-flex justify-content-end align-items-end px-5" v-if="isAdmin">
                    <button type="button" class="btn btn-primary" @click="openCreate">Create Course</button>
                </div>
            </PageOptionsBar>
        </template>
        <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 100vh;">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div v-else class="container mt-5">
            <div class="row">
                <div v-for="course in courses" :key="course.courseId" class="col-md-6 mb-4">
                    <Course :course="course" @click="openPopup(course)"/>                 
                </div>
            </div>
        </div>
        <PopupCourse v-if="showCourse" :course="popCourse" :closePopup="closePopup"/>
    </PageDisplay>
</template>

<script lang="ts">
    import { defineComponent, ref, onMounted, watch } from 'vue'
    import PageDisplay from '../../elements/pageDisplay/PageDisplay.vue'
    import PageOptionsBar from '../../elements/pageDisplay/PageOptionsBar.vue'
    import Course from './components/Course.vue'
    import PopupCourse from './components/PopupCourse.vue'
    import { useCourseStore } from '../../stores/courseStore'
    import { useAuthStore } from '../../stores/authStore'
    import { type course } from '../../../../sharedTypes/course'
    
    export default defineComponent({
        name: 'HomePage',
        components: {
            PageDisplay,
            PageOptionsBar,
            Course,
            PopupCourse
        },
        setup() {
            const courseStore = useCourseStore()
            const authStore = useAuthStore()
            const loading = ref(true)
            const courses = ref<course[]>([])
            const isAdmin = ref(false)
            let popCourse = ref<course>()
            
            onMounted(async () => {
                if (courseStore.courseList === null) {
                    await courseStore.getAllCourses()
                }
                const groups = await authStore.getGroups() as string[]
                if (groups) {
                    if (groups.indexOf('admin') !== -1) {
                    isAdmin.value = true
                }
                }
                courses.value  = courseStore.courseList || []
                loading.value = false
            })

            watch(() => courseStore.courseList,(newCourseList) => {
                    if (newCourseList !== courses.value) {
                    courses.value = newCourseList || []
                    }
                })

            return { loading, courses, popCourse, isAdmin }
        },
        data () {
            return {
                showCourse: false
            }
        },
        methods: {
            openPopup(course: course) {
                this.popCourse = course
                this.showCourse = true
            },
            closePopup() {
                this.showCourse = false
            },
            openCreate() {
                this.$router.push("/createcourse")
            }   
        }
    })
</script>

