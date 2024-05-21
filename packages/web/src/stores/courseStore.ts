import { defineStore } from 'pinia'
import type { Course } from '../../../sharedTypes/course'

interface courseState {
    courseList: Course[]
}
export const useCourseStore = defineStore({
    id: 'courseStore',
    state: (): courseState => ({
      courseList: []
    }),
    actions: {
         
    }
})