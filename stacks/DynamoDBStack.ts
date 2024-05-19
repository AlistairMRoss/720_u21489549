
import { StackContext, Table} from 'sst/constructs'

export function DynamoDBStack ({ stack }: StackContext): { courseTable: Table, studentCourses: Table }
{
  const courseTable = new Table(stack, "courseData", {
    fields: {
      courseId: "string"
    },
    primaryIndex: { 
      partitionKey: "courseId"},
  })

  const studentCourses = new Table(stack , "studentCourseData", {
    fields: {
      studentId: "string"
    },
    primaryIndex: { 
      partitionKey: "studentId"},
  })

  return { courseTable, studentCourses }
} 