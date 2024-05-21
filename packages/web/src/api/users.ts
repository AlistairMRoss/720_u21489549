import { API_ROOT } from './config'
import { useAuthStore } from '../stores/authStore'

const createUser = async (email: string): Promise<any> => {
    const userStore = useAuthStore()
    await userStore.checkLoginStatus()
    const userDetails = userStore.authDetails
    const token = userDetails?.token as string
    const response = await fetch(`${API_ROOT}/admin/user/createUser`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
            },
        body: JSON.stringify({ email }),
    })
    const respObj = await response.json()
    
    if(response.status === 200) {
        return respObj
    } else {
        throw new Error(respObj.message)
    }
}

const deleteUser = async (userId: string): Promise<any> => {
    const userStore = useAuthStore()
    await userStore.checkLoginStatus()
    const userDetails = userStore.authDetails
    const token = userDetails?.token as string
    const response = await fetch(`${API_ROOT}/admin/user/${userId}/deleteUser`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
    })
    const respObj = await response.json()
    if(response.status === 200) {
        return respObj
    } else {
        throw new Error(respObj.message)
    }
}

const getUsers = async (): Promise<any> => {
    const userStore = useAuthStore()
    await userStore.checkLoginStatus()
    const userDetails = userStore.authDetails
    const token = userDetails?.token as string
    const response = await fetch(`${API_ROOT}/admin/user/getUsers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
    })
    const respObj = await response.json()
    if(response.status === 200) {
        return respObj.users
    } else {
        throw new Error(respObj.message)
    }
}

const getGroups = async (): Promise<any> => {
    const userStore = useAuthStore()
    await userStore.checkLoginStatus()
    const userDetails = userStore.authDetails
    const token = userDetails?.token as string
    const response = await fetch(`${API_ROOT}/admin/user/getGroups`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
    })
    const respObj = await response.json()
    if(response.status === 200) {
        return respObj.Groups
    } else {
        throw new Error(respObj.message)
    }
}

const createGroup = async (group: string): Promise<any> => {
    const userStore = useAuthStore()
    await userStore.checkLoginStatus()
    const userDetails = userStore.authDetails
    const token = userDetails?.token as string
    const response = await fetch(`${API_ROOT}/admin/user/createGroup`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        body: JSON.stringify({ group }),
    })
    const respObj = await response.json()
    if(response.status === 200) {
        return respObj
    } else {
        throw new Error(respObj.message)
    }
}

const addUserToGroup = async (userId: string, group: string): Promise<any> => {
    const userStore = useAuthStore()
    await userStore.checkLoginStatus()
    const userDetails = userStore.authDetails
    const token = userDetails?.token as string
    const response = await fetch(`${API_ROOT}/admin/user/${userId}/addUserToGroup`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        body: JSON.stringify({ group }),
    })
    const respObj = await response.json()
    if(response.status === 200) {
        return respObj
    } else {
        throw new Error(respObj.message)
    }
}




export { createUser, deleteUser, getUsers, getGroups, createGroup, addUserToGroup }