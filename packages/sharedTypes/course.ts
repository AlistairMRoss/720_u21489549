export interface course {
    courseId: string
    lecture: string
    description: string
}

export interface studentCourses {
    studentId: string
    accepted: string[]
    applications: string[]
}