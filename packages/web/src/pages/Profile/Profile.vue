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
        <div v-else class="row mx-0 pTopMore">
            <div class="container">
                <div class="mb-3">
                    <label for="siteName" class="form-label" >First Name</label>
                    <input type="text" class="form-control" id="firstname" :value="profile?.name || ''" readonly/>
                </div>
                <div class="mb-3">
                    <label for="siteId" class="form-label">Last Name</label>
                    <input type="text" class="form-control" id ="lastName" :value="profile?.surname || ''" readonly/>
                </div>
                <div class="mb-3">
                    <label for="siteId" class="form-label">Email</label>
                    <input type="text" class="form-control" id ="email" :value="profile?.email || ''" readonly/>
                </div>
                <div class="mb-3">
                    <label for="siteId" class="form-label">Cellphone</label>
                    <input type="text" class="form-control" id ="cell" :value="profile?.phone_number || ''" readonly/>
                </div>
                <div class="mb-3">
                    <label for="siteId" class="form-label">Birthdate</label>
                    <input type="text" class="form-control" id ="birthdate" :value="profile?.birthdate || ''" readonly/>
                </div>
            </div>
        </div>
    </PageDisplay>
</template>

<script lang="ts">
    import { defineComponent, ref, onMounted, watch } from 'vue'
    import PageDisplay from '../../elements/pageDisplay/PageDisplay.vue'
    import PageOptionsBar from '../../elements/pageDisplay/PageOptionsBar.vue'
    import { useUserStore } from '../../stores/userStore'
    import { type Profile } from '../../../../sharedTypes/users'

    export default defineComponent({
        name: "Profile",
        components: {
            PageDisplay,
            PageOptionsBar
        },
        setup() {
            const userStore = useUserStore()
            const profile = ref<Profile | null>(null)
            const loading = ref(true)

            onMounted(async()  => {
                if (userStore.profile === null) {
                    await userStore.getMyProfile()
                }
                profile.value = userStore.profile
                loading.value = false
            })

            return { userStore, profile, loading }
        }
    }
)
</script>