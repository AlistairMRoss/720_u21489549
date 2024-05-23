import { DynamoDB, type AWSError } from 'aws-sdk'
import { type PromiseResult } from 'aws-sdk/lib/request.js'

export async function applyForCourse (studentId: string, newCourseId: string): Promise<PromiseResult<DynamoDB.DocumentClient.UpdateItemOutput, AWSError>> {
  try {
    const dynamoDb = new DynamoDB.DocumentClient()
    const updateParams = {
      TableName: process.env.courseTableTableName ?? '',
      Key: {
        studentId
      },
      UpdateExpression: 'ADD courseIds :newCourseId',
      ExpressionAttributeValues: {
        ':newCourseId': dynamoDb.createSet([newCourseId])
      },
      ReturnValues: 'UPDATED_NEW'
    }

    const result = await dynamoDb.update(updateParams).promise()
    return result
  } catch (err) {
    console.error(err)
    throw new Error('Internal server error')
  }
}
