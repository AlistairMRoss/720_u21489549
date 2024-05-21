import { API_ROOT } from "./config"
import { useAuthStore } from '../stores/authStore'

const getAllCourses = async (): Promise<any> => {
    const authStore = useAuthStore()
    await authStore.checkLoginStatus()
    const userDetails = authStore.authDetails
    const token = userDetails?.token as string
    const response = await fetch(`${API_ROOT}/course/getAllCourses`, {
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

const addCourse = async (courseId: string, lecture: string, description: string): Promise<any> => {
    const authStore = useAuthStore()
    await authStore.checkLoginStatus()
    const userDetails = authStore.authDetails
    const token = userDetails?.token as string
    const response = await fetch(`${API_ROOT}/course/addCourse`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ courseId, lecture, description })
    })
    const respObj = await response.json()
    if(response.status === 200) {
        return respObj
    } else {
        throw new Error(respObj.message)
    }
}

const updateCourse = async (courseId: string, lecture: string, description: string): Promise<any> => {
    const authStore = useAuthStore()
    await authStore.checkLoginStatus()
    const userDetails = authStore.authDetails
    const token = userDetails?.token as string
    const response = await fetch(`${API_ROOT}/course/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ courseId, lecture, description })
    })
    const respObj = await response.json()
    if(response.status === 200) {
        return respObj
    } else {
        throw new Error(respObj.message)
    } 
}

const deleteCourse = async (courseId: string): Promise<any> => {
    const authStore = useAuthStore()
    await authStore.checkLoginStatus()
    const userDetails = authStore.authDetails
    const token = userDetails?.token as string
    const response = await fetch(`${API_ROOT}/course/${courseId}/delete`, {
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

const getMyCourses = async (studentId: string): Promise<any> => {
    
}