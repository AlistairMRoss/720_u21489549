import { API_ROOT } from "./config"
import { useAuthStore } from '../stores/authStore'

const getMyProfile = async (): Promise<any> => {
    const authStore = useAuthStore()
    await authStore.checkLoginStatus()
    const userDetails = authStore.authDetails
    const token = userDetails?.token as string
    const response = await fetch(`${API_ROOT}/student/getProfile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    const respObj = await response.json()
    if(response.status === 200) {
        return respObj
    } else {
        throw new Error(respObj.message)
    }
}

const applyForCourse = async (courseId: string): Promise<any> => {
    const authStore = useAuthStore()
    await authStore.checkLoginStatus()
    const userDetails = authStore.authDetails
    const token = userDetails?.token as string
    const response = await fetch(`${API_ROOT}/courses/apply`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ courseId })
    })
    const respObj = await response.json()
    if(response.status === 200) {
        return respObj
    } else {
        throw new Error(respObj.message)
    }
}

export { getMyProfile, applyForCourse }