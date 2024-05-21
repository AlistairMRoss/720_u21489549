import { DynamoDB, type AWSError } from 'aws-sdk'
import { type PromiseResult } from 'aws-sdk/lib/request.js'

export async function applyForCourse (studentId: string, newCourseIds: string[]): Promise<PromiseResult<DynamoDB.DocumentClient.UpdateItemOutput, AWSError>> {
  try {
    const dynamoDb = new DynamoDB.DocumentClient()
    const updateParams = {
      TableName: process.env.courseTableTableName ?? '',
      Key: {
        studentId
      },
      UpdateExpression: 'ADD courseId :newCourse',
      ExpressionAttributeValues: {
        ':newCourse': dynamoDb.createSet(newCourseIds)
      },
      ReturnValues: 'UPDATED_NEW'
    }

    const result = await dynamoDb.update(updateParams).promise()
    return result
  } catch (err: any) {
    console.error(err)
    throw new Error('internal server error')
  }
}
