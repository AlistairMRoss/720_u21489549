import { DynamoDB, type AWSError } from 'aws-sdk'
import { type PromiseResult } from 'aws-sdk/lib/request.js'

export async function addCourse (courseId: string, lecture: string, description: string): Promise<PromiseResult<DynamoDB.DocumentClient.GetItemOutput, AWSError>> {
  try {
    const dynamoDb = new DynamoDB.DocumentClient()

    const putParams = {
      TableName: process.env.courseTableTableName ?? '',
      Key: {
        courseId
      },
      Item: {
        courseId,
        lecture,
        description
      }
    }

    const result = await dynamoDb.put(putParams).promise()
    return result
  } catch (err: any) {
    console.error(err)
    throw new Error('internal server error')
  }
}
