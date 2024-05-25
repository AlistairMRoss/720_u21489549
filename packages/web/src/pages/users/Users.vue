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
                <div v-for="user in users" :key="user.Username" class="col-md-6 mb-4">
                    <individualUser :user=user @click="goToUser(user)"/>
                </div>
            </div>
        </div> 
    </PageDisplay>
</template>

<script lang="ts">
    import { defineComponent, ref, onMounted, watch } from 'vue'
    import { useUserStore } from '../../stores/userStore'
    import PageDisplay from '../../elements/pageDisplay/PageDisplay.vue'
    import PageOptionsBar from '../../elements/pageDisplay/PageOptionsBar.vue'
    import individualUser from './components/User.vue'
    import { type User } from '../../../../sharedTypes/users'

    export default defineComponent({
        name: "Users",
        components: { 
            PageDisplay,
            PageOptionsBar,
            individualUser
        },
        setup() {
            const userStore = useUserStore()
            const loading = ref(true)
            const users = ref<User[]>([])
            onMounted(async () => {
                if(userStore.users === null) {
                    await userStore.getUsers()
                }
                users.value = userStore.users || []
                loading.value = false
            })

            return { loading, users }
        },
        methods: {
            goToUser(user:  User) {
                this.$router.push(`/userinfo/${user.Username}`)
            }
        }
    })
</script>