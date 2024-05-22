import { DynamoDB, type AWSError } from 'aws-sdk'
import { type PromiseResult } from 'aws-sdk/lib/request.js'

export async function updateCourse (courseId: string, lecture: string, description: string): Promise<PromiseResult<DynamoDB.DocumentClient.UpdateItemOutput, AWSError>> {
  try {
    const dynamoDb = new DynamoDB.DocumentClient()

    const updateParams = {
      TableName: process.env.courseTableTableName ?? '',
      Key: {
        courseId
      },
      UpdateExpression: 'set lecture = :lecture, description = :description',
      ExpressionAttributeValues: {
        ':lecture': lecture,
        ':description': description
      }
      // ReturnValues: 'UPDATED_NEW'
    }

    const result = await dynamoDb.update(updateParams).promise()
    return result
  } catch (err: any) {
    console.error(err)
    throw new Error('internal server error')
  }
}
