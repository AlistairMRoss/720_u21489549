<template>
    <PageDisplay>
        <template v-slot:header>
            <PageOptionsBar />
        </template>
        <div class="row mx-0 pTopMore">
            <div class="container">
                <div class="mb-3">
                    <label for="siteName" class="form-label" >First Name</label>
                    <input type="text" class="form-control" id="firstname" v-model="profile.name" readonly/>
                </div>
                <div class="mb-3">
                    <label for="siteId" class="form-label">Last Name</label>
                    <input type="text" class="form-control" id ="lastName" v-model="profile.surname" readonly/>
                </div>
                <div class="mb-3">
                    <label for="siteId" class="form-label">Email</label>
                    <input type="text" class="form-control" id ="email" v-model="profile.email" readonly/>
                </div>
                <div class="mb-3">
                    <label for="siteId" class="form-label">Cellphone</label>
                    <input type="text" class="form-control" id ="cell" v-model="profile.phone_number" readonly/>
                </div>
                <div class="mb-3">
                    <label for="siteId" class="form-label">Birthdate</label>
                    <input type="text" class="form-control" id ="birthdate" v-model="profile.birthdate" readonly/>
                </div>
            </div>
        </div>
    </PageDisplay>
</template>

<script lang="ts">
    import { defineComponent, ref, onMounted } from 'vue'
    import PageDisplay from '../../elements/pageDisplay/PageDisplay.vue'
    import PageOptionsBar from '../../elements/pageDisplay/PageOptionsBar.vue'
    import { useUserStore } from '../../stores/userStore'
    export default defineComponent({
        name: "Profile",
        components: {
            PageDisplay,
            PageOptionsBar
        },
        setup() {
            const userStore = useUserStore()
            const profile = ref({
                email: '',
                name: '',
                surname: '',
                phone_number: '',
                birthdate: ''
            })

            onMounted(async () => {
                await userStore.getMyProfile()
                if (userStore.profile) {
                    profile.value = {
                        email: userStore.profile.email,
                        name: userStore.profile.name,
                        surname: userStore.profile.surname,
                        phone_number: userStore.profile.phone_number,
                        birthdate: new Date(userStore.profile.birthdate).toISOString().substring(0, 10)
                    }
                }
            })
            return {
                profile
            }
    }
})
</script>