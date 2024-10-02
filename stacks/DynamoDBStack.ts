
import { StackContext, Table, Bucket } from 'sst/constructs'

export function DynamoDBStack ({ stack }: StackContext): { courseTable: Table, studentCourses: Table, bucket: Bucket}
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

  const bucket = new Bucket(stack, "Uploads");


  return { courseTable, studentCourses, bucket }
} 