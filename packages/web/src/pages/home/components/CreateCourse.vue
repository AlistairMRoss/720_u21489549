<template>
    <PageDisplay>
        <template v-slot:header>
            <PageOptionsBar>
                <span @click="goBack" class="pointer">
                    <i class="bi bi-chevron-left" /> Back
                </span> 
            </PageOptionsBar>
        </template>
        <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 100vh;">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div v-else class="row mx-0 pTopMore mt-5">
            <div class="container">
                <div class="mb-5">
                    <label for="siteName" class="form-label">Course Name</label>
                    <input type="text" class="form-control" id="name" v-model="name" @input="checkUpdate"/>
                </div>
                <div class="mb-5">
                    <label for="siteId" class="form-label">Lecture</label>
                    <input type="text" class="form-control" id ="lecture" v-model="lecture" @input="checkUpdate"/>
                </div>
                <div class="mb-5">
                    <label for="siteId" class="form-label">Description</label>
                    <input type="text" class="form-control" id ="description" v-model="description" @input="checkUpdate"/>
                </div>
            </div>
            <div class="d-flex"> 
                    <ButtonWithSpinner v-if="canCreate" :disabled="false" :isBusy="creating" @btnClicked="create" btnClass="btn-success" class="m-2 w-100">
                        <span v-if="creating">Creating...</span>
                        <span v-else-if="!creating">Create</span>
                    </ButtonWithSpinner>
                </div>
        </div>
    </PageDisplay>
</template>

<script lang="ts">
    import { defineComponent, ref, onMounted, computed } from 'vue'
    import PageDisplay from '../../../elements/pageDisplay/PageDisplay.vue'
    import PageOptionsBar from '../../../elements/pageDisplay/PageOptionsBar.vue'
    import ButtonWithSpinner from '../../../elements/pageDisplay/components/ButtonWithSpinner.vue'
    import { useCourseStore } from '../../../stores/courseStore'

    export default defineComponent({
        name: "Profile",
        components: {
            PageDisplay,
            PageOptionsBar,
            ButtonWithSpinner
        },
        setup() {
            const courseStore = useCourseStore()
            const loading = ref(true)

            const name = ref('')
            const lecture = ref('')
            const description = ref('')
            const canCreate = ref(false)
            const creating = ref(false)
            onMounted(()  => {
                loading.value = false
            })

            
            return { courseStore, loading, name, lecture, description, canCreate, creating }
        },
        methods: {
            checkUpdate() {
                if (this.name !== '' && this.lecture !== '' && this.description !== '') {
                    this.canCreate = true
                } else {
                    this.canCreate = false
                }
            },
            async create() {
                this.creating = true
                await this.courseStore.addCourse(this.name as string, this.lecture as string, this.description as string)
                await this.courseStore.getAllCourses()
                this.creating = false
                this.$router.push('/')
            },
            goBack() {
                this.$router.push('/')
            }
        }
    })
</script>