import { defineStore } from 'pinia'
import type { Course } from '../../../sharedTypes/course'
import { getAllCourses, addCourse, updateCourse, deleteCourse, getMyCourses } from '../api/courses'


export const useCourseStore = defineStore('courseStore', {
    state: () => ({
      courseList: null as Course[] | null,
      myCourses: null as Course[] | null
    }),
    actions: {
        async getAllCourses() {
          const result = await getAllCourses()
          this.courseList = result.result.Items
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