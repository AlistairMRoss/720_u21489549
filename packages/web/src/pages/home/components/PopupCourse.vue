<template>
    <PopUp @closePopup="closePopup">
        <template v-slot:header>
            <div class="d-flex justify-content-between">
                <div class="col">
                    <h3>{{ course.courseId }}</h3>
                </div>
                <span @click="goBack" class="pointer">
                    <i class="bi bi-chevron-left" /> Back
                </span>
            </div>
        </template>
        <div class="container justify-content-center align-items-center">
            <div class="row mt-5">
                <div class="col">
                    <h4>Description:</h4>
                    <p>{{ course.description }}</p>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col">
                    <h4>Lecturer:</h4>
                    <p>{{ course.lecture }}</p>
                </div>
            </div>
            <div class="row mt-5">
                <ButtonWithSpinner v-if="canApply && loaded" :disabled="isSaveDisabled" :isBusy="applying" @btnClicked="apply" btnClass="btn-primary" class="m-2">
                    <span v-if="applying">Applying...</span>
                    <span v-else-if="!applying">Apply</span>
                </ButtonWithSpinner>
            </div>
        </div>
    </PopUp>
</template>



<script lang="ts">
    import { defineComponent, ref, computed } from 'vue'
    import { useCourseStore } from '../../../stores/courseStore'
    import ButtonWithSpinner  from '../../../elements/pageDisplay/components/ButtonWithSpinner.vue'
    import PopUp from '../../../elements/popup/PopUp.vue'
    export default defineComponent({
        name: "PopupCourse",
        props: ["course", "closePopup"],
        components: { PopUp, ButtonWithSpinner },
        setup(props) {
            const courseStore = useCourseStore()
            const applying = ref(false)
            const isSaveDisabled = ref(false)
            courseStore.getMyCourses()
            const loaded = ref(false)

            const canApply = computed(() => {
                if(courseStore.myCourses === undefined){
                    console.log("this")
                    return true
                } else {
                    return !courseStore.myCourses?.find(course => course.courseId === props.course.courseId)
                }
                
            })
            
            if (courseStore.myCourses || courseStore.myCourses === undefined) {
                loaded.value = true
            }
            return { courseStore, applying, isSaveDisabled, canApply, loaded}
        },
        methods: {
            goBack() {
                this.closePopup()
            },
            async apply() {
                this.applying = true
                await this.courseStore.applyForCourse(this.course.courseId)
                this.goBack()
            }
        }
    })
</script>