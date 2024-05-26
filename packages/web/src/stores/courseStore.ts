import { defineStore } from 'pinia'
import type { course, studentCourses } from '../../../sharedTypes/course'
import { getAllCourses, addCourse, updateCourse, deleteCourse, getMyCourses, applyForCourse, getStudentApplications, acceptRejectApplication } from '../api/courses'

export const useCourseStore = defineStore('courseStore', {
    state: () => ({
      courseList: null as course[] | null,
      myCourses: undefined as course[] | undefined,
      acceptedAndReject: null as studentCourses | null,
      studentApplications: null as studentCourses | null,
      updateMyCourses: null as Boolean | null,
      updateCourseList: null as Boolean | null,
      updateStudentApplications: null as Boolean | null
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
          }
        },
        async applyForCourse(courseId: string) {
          const result = await applyForCourse(courseId)
        },
        async getStudentApplications(studentId: string) {
            const result = await getStudentApplications(studentId)
            this.studentApplications = result.Item
        },
        async acceptOrReject(courseId: string, studentId: string, acceptOrReject: boolean) {
          console.log("Did this")
          const result = await acceptRejectApplication(courseId, studentId, acceptOrReject)
        }
    }
})