<template>
    <PageDisplay>
        <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 100vh;">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div v-else class="row mx-0 pTopMore">
            <div class="container">
                <div class="mb-3">
                    <label for="siteName" class="form-label" >First Name</label>
                    <input type="text" class="form-control" id="firstname" :value="getAttribute('given_name')" readonly/>
                </div>
                <div class="mb-3">
                    <label for="siteId" class="form-label">Last Name</label>
                    <input type="text" class="form-control" id ="lastName" :value="getAttribute('family_name')" readonly/>
                </div>
                <div class="mb-3">
                    <label for="siteId" class="form-label">Email</label>
                    <input type="text" class="form-control" id ="email" :value="getAttribute('email')" readonly/>
                </div>
                <div class="mb-3">
                    <label for="siteId" class="form-label">Cellphone</label>
                    <input type="text" class="form-control" id ="cell" :value="getAttribute('phone_number')" readonly/>
                </div>
                <div class="mb-3">
                    <label for="siteId" class="form-label">Birthdate</label>
                    <input type="text" class="form-control" id ="birthdate" :value="getAttribute('birthdate')" readonly/>
                </div>
                <div class="mb-3">
                    <label for="siteId" class="form-label">UserId</label>
                    <input type="text" class="form-control" id ="birthdate" :value="getAttribute('sub')" readonly/>
                </div>
                <div class="mb-3">
                    <label for="siteId" class="form-label">Joined Date</label>
                    <input type="text" class="form-control" id ="birthdate" :value="getUserCreated()" readonly/>
                </div>
                <div class="mb-3">
                    <label for="siteId" class="form-label">Status</label>
                    <input type="text" class="form-control" id ="birthdate" :value="user?.Enabled" readonly/>
                </div>
            </div>
        </div>
    </PageDisplay>
</template>

<script lang="ts">
    import { defineComponent, ref, onMounted, watch } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import PageDisplay from '../../elements/pageDisplay/PageDisplay.vue'
    import { type User } from '../../../../sharedTypes/users'
    import { useUserStore } from '../../stores/userStore'
    import { useCourseStore } from '../../stores/courseStore'

    export default defineComponent({
        name: "User Info",
        components: {
            PageDisplay
        },
        setup() {
            const route = useRoute()
            const userStore = useUserStore()
            const courseStore = useCourseStore()
            const username = ref(route.params.username)
            const loading = ref(true)
            const user = ref<User>()
            onMounted(async () => {
                if(userStore.users === null) {
                    await userStore.getUsers()
                } 
                user.value = userStore.users?.find(user => user.Username === username.value) as User || null
                await courseStore.getStudentApplications(user.value.Username)
                console.log(user.value)
                loading.value = false
            })

            return { loading, user }
        },
        methods: {
            cancel() {
                this.$router.push(`/users`)
            },
            delete() {
                
            },
            update() {

            },
            getAttribute(attributeName: any) {
                const attribute = this.user?.Attributes.find((attr: { Name: any; }) => attr.Name === attributeName);
                return attribute ? attribute.Value : 'Not available';
            },
            getUserCreated() {
                return this.formatDate(this.user?.UserCreateDate as string)
            },
            formatDate(datetime: string): string {
                const date = new Date(datetime)
                const year = date.getFullYear()
                const month = String(date.getMonth() + 1).padStart(2, '0')
                const day = String(date.getDate()).padStart(2, '0')
                return `${year}-${month}-${day}`
            }
        }
    })
</script>