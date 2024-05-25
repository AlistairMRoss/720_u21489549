import { defineStore } from 'pinia'
import type { course, studentCourses } from '../../../sharedTypes/course'
import { getAllCourses, addCourse, updateCourse, deleteCourse, getMyCourses, applyForCourse, getStudentApplications } from '../api/courses'

export const useCourseStore = defineStore('courseStore', {
    state: () => ({
      courseList: null as course[] | null,
      myCourses: undefined as course[] | undefined,
      acceptedAndReject: null as studentCourses | null,
      studentApplications: null as string[] | null
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
          this.acceptedAndReject = result.result.Item;
          if(this.courseList === null) {
            await getAllCourses()
          }
          if (this.courseList) {
            this.myCourses = this.courseList.filter((course) => this.acceptedAndReject?.accepted.includes(course.courseId))
            console.log(this.myCourses)
          }
        },
        async applyForCourse(courseId: string) {
          const result = await applyForCourse(courseId)
        },
        async getStudentApplications(studentId: string) {
          console.log(studentId)
          const result = await getStudentApplications(studentId)
          console.log(result)
          this.studentApplications = result.Item
        }
    }
})