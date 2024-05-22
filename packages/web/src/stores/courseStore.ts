import { defineStore } from 'pinia'
import type { Course } from '../../../sharedTypes/course'
import { getAllCourses, addCourse, updateCourse, deleteCourse, getMyCourses } from '../api/courses'

interface courseState {
    courseList: Course[]
    myCourses: Course[]
}
export const useCourseStore = defineStore({
    id: 'courseStore',
    state: (): courseState => ({
      courseList: [],
      myCourses: []
    }),
    actions: {
        async getAllCourses() {
          const result = await getAllCourses()
          this.courseList = result
        },
        async addCourse(courseId: string, lecture: string, description: string) {
          const result = await addCourse(courseId, lecture, description)
          return result
        },
        async updateCourse(courseId: string, lecture: string, description: string) {
          const result = updateCourse(courseId, lecture, description)
          return result
        },
        async deleteCourse(courseId: string) {
          const result = deleteCourse(courseId)
          return result
        },
        async getMyCourses() {
          const result = await getMyCourses()
        }
    }
})