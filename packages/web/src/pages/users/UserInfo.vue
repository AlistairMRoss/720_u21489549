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
                <div class="mb-3">
                    <label for="siteName" class="form-label" >First Name</label>
                    <input type="text" class="form-control" id="firstname" v-model="given_name" @input="gNameChange()"/>
                </div>
                <div class="mb-3">
                    <label for="siteId" class="form-label">Last Name</label>
                    <input type="text" class="form-control" id ="lastName" v-model="family_name" @input="fNameChange()"/>
                </div>
                <div class="mb-3">
                    <label for="siteId" class="form-label">Email</label>
                    <input type="text" class="form-control" id ="email" v-model="email" readonly/>
                </div>
                <div class="mb-3">
                    <label for="siteId" class="form-label">Cellphone</label>
                    <input type="text" class="form-control" id ="cell" v-model="phone" @input="phoneChange()"/>
                </div>
                <div class="mb-3">
                    <label for="siteId" class="form-label">Birthdate</label>
                    <input type="text" class="form-control" id ="birthdate" v-model="birthdate" readonly/>
                </div>
                <div class="mb-3">
                    <label for="siteId" class="form-label">UserId</label>
                    <input type="text" class="form-control" id ="birthdate" v-model="sub" readonly/>
                </div>
                <div class="mb-3">
                    <label for="siteId" class="form-label">Joined Date</label>
                    <input type="text" class="form-control" id ="birthdate" v-model="userCreated" readonly/>
                </div>
                <div class="mb-3" v-if="courseApplications?.length !== 0 && courseApplications !== undefined && doUpdate === false">
                    <label for="newPMnum" class="form-label">Course Applications</label>
                        <select v-model="courseId" class="form-control" id="courseSelection" @change="courseSelected()">
                            <option value="">---Select a course---</option>
                            <option v-for="course in courseApplications" :key="course" :value="course">
                                {{ course }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="d-flex justify-content-between" v-if="doUpdate === false">
                    <ButtonWithSpinner v-if="accepting" :disabled="isSaveDisabled" :isBusy="acceptReject" @btnClicked="doApplication(true)" btnClass="btn-success" class="m-2 w-100">
                        <span v-if="acceptReject">Processing...</span>
                        <span v-else-if="!acceptReject">Accept</span>
                    </ButtonWithSpinner>
                    <ButtonWithSpinner v-if="rejecting" :disabled="isSaveDisabled" :isBusy="acceptReject" @btnClicked="doApplication(false)" btnClass="btn-danger" class="m-2 w-100">
                        <span v-if="acceptReject">Processing...</span>
                        <span v-else-if="!acceptReject">Reject</span>
                    </ButtonWithSpinner>
                </div>
                <div class="d-flex" v-else> 
                    <ButtonWithSpinner v-if="doUpdate" :disabled="isSaveDisabled" :isBusy="updating" @btnClicked="update" btnClass="btn-success" class="m-2 w-100">
                        <span v-if="updating">Processing...</span>
                        <span v-else-if="!updating">Update</span>
                    </ButtonWithSpinner>
                </div>
            </div>
    </PageDisplay>
</template>

<script lang="ts">
    import { defineComponent, ref, onMounted, watch } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import PageDisplay from '../../elements/pageDisplay/PageDisplay.vue'
    import PageOptionsBar from '../../elements/pageDisplay/PageOptionsBar.vue'
    import { type User } from '../../../../sharedTypes/users'
    import { useUserStore } from '../../stores/userStore'
    import { useCourseStore } from '../../stores/courseStore'
    import ButtonWithSpinner from '../../elements/pageDisplay/components/ButtonWithSpinner.vue'

    export default defineComponent({
        name: "User Info",
        components: {
            PageDisplay,
            PageOptionsBar,
            ButtonWithSpinner
        },
        setup() {
            const route = useRoute()
            const userStore = useUserStore()
            const courseStore = useCourseStore()
            const username = ref(route.params.username)
            const loading = ref(true)
            const user = ref<User>()
            const courseApplications = ref<string[]>()
            const courseId = ref('')

            const given_name = ref('')
            const family_name = ref('')
            const email = ref('')
            const phone = ref('')
            const birthdate = ref('')
            const sub = ref('')
            const userCreated = ref('')

            const doUpdate = ref(false)
            const updating = ref(false)
            const acceptReject = ref(false)
            const isSaveDisabled = ref(false)
            const accepting = ref(false)
            const rejecting = ref(false)

            onMounted(async () => {
                if(userStore.users === null || userStore.updateUsers) {
                    await userStore.getUsers()
                    userStore.updateUsers = false
                } 
                user.value = userStore.users?.find(user => user.Username === username.value) as User || null
                if(user.value.Username !== null) {
                    await courseStore.getStudentApplications(user.value.Username)
                    courseApplications.value = courseStore.studentApplications?.applications
                    given_name.value = getAttribute("given_name")
                    family_name.value = getAttribute("family_name")
                    email.value = getAttribute("email")
                    phone.value = getAttribute("phone_number")
                    birthdate.value = getAttribute("birthdate")
                    sub.value = getAttribute("sub")
                    userCreated.value = formatDate(user.value.UserCreateDate)
                    loading.value = false
                }
                    
            })
            function getAttribute(attributeName: any) {
                const attribute = user.value?.Attributes.find((attr: { Name: any; }) => attr.Name === attributeName);
                return attribute ? attribute.Value : 'Not available';
            }

            function formatDate(datetime: string): string {
                const date = new Date(datetime)
                const year = date.getFullYear()
                const month = String(date.getMonth() + 1).padStart(2, '0')
                const day = String(date.getDate()).padStart(2, '0')
                return `${year}-${month}-${day}`
            }

            return { loading, user, courseApplications, courseId, given_name, family_name, email, phone, 
                    birthdate, sub, userCreated, doUpdate, acceptReject, isSaveDisabled, accepting, rejecting, 
                    courseStore, userStore, updating, username }
        },
        methods: {
            cancel() {
                this.$router.push(`/users`)
            },
            delete() {
                
            },
            async update() {
                this.updating = true
                await this.userStore.updateUser(this.sub as string, this.given_name as string, this.family_name as string, this.phone as string)
                this.updating = false
                this.doUpdate = false
                await this.userStore.getUsers()
                this.user = this.userStore.users?.find(user => user.Username === this.username) as User || null
            },
            getAttribute(attributeName: any) {
                const attribute = this.user?.Attributes.find((attr: { Name: any; }) => attr.Name === attributeName);
                return attribute ? attribute.Value : 'Not available';
            },
            courseSelected() {
                if(this.courseId !== '') {
                    this.accepting = true
                    this.rejecting = true
                } else {
                    this.accepting = false
                    this.rejecting = false
                }
            },
            gNameChange() {
                if(this.given_name !== this.getAttribute("given_name")) {
                    this.doUpdate = true
                }
                else {
                    this.doUpdate = false
                }
            },
            fNameChange() {
                if(this.family_name !== this.getAttribute("family_name")) {
                    this.doUpdate = true
                }
                else {
                    this.doUpdate = false
                }
            },
            phoneChange() {
                if(this.phone !== this.getAttribute("phone_number")) {
                    this.doUpdate = true
                }
                else {
                    this.doUpdate = false
                } 
            },
            doApplication(acceptOrReject: boolean) {
                if(acceptOrReject) {
                    this.rejecting = false
                } else {
                    this.accepting = false
                }
                this.acceptReject = true
                this.courseStore.acceptOrReject(this.courseId as string, this.sub as string, acceptOrReject)
                this.acceptReject = false
                this.courseStore.updateMyCourses = true
                this.courseStore.updateStudentApplications = true
                this.userStore.updateUsers = true
                this.$router.push('/users')
            }, 
            goBack() {
                this.$router.push('/users')
            }
        }
    })
</script>