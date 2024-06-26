import { DynamoDB, type AWSError } from 'aws-sdk'
import { type PromiseResult } from 'aws-sdk/lib/request.js'

export async function deleteCourse (courseId: string): Promise<PromiseResult<DynamoDB.DocumentClient.DeleteItemOutput, AWSError>> {
  try {
    const dynamoDb = new DynamoDB.DocumentClient()

    const deleteParams = {
      TableName: process.env.courseTableTableName ?? '',
      Key: {
        courseId
      }
    }

    const result = await dynamoDb.delete(deleteParams).promise()
    console.log(result)
    return result
  } catch (err: any) {
    console.error(err)
    throw new Error('internal server error')
  }
}
