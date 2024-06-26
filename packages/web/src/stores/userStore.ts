import { defineStore } from 'pinia'
import type { AuthDetails, User, Profile, Groups} from '../../../sharedTypes/users'
import  {createUser, deleteUser, getUsers, getGroups, addUserToGroup, updateUser } from '../api/users'
import { getMyProfile } from '../api/student'

export const useUserStore = defineStore('user', {
  state: () => ({
    userDetails: null as AuthDetails | null,
    users: null as User[] | null,
    groups: null as Groups[] | null,
    profile: null as Profile | null,
    updateUsers: null as Boolean | null
  }),
  actions: {
    async createUser(email: string) {
      const result = await createUser(email)
      return result
    },
    async deleteUser(userId: string) {
      const result = await deleteUser(userId)
      return result
    },
    async getUsers() {
        const result = await getUsers()
        this.users = result
        return result
    },
    async getGroups() {
      const result = await getGroups()
      this.groups = result
      return result
    },
    async addUserToGroup(userId: string, group: string) {
      const result = await addUserToGroup(userId, group)
      return result
    },
    async getMyProfile() {
      const result = await getMyProfile()
      this.profile = result.result
      return result
    },
    async updateUser(userId: string, givenName: string, familyName: string, phoneNumber: string) {
      const result = await updateUser(userId, givenName, familyName, phoneNumber)
      return result
    }
  },
})
