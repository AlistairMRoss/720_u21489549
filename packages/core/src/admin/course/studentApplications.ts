import { DynamoDB, type AWSError } from 'aws-sdk'
import { type PromiseResult } from 'aws-sdk/lib/request.js'

export async function studentApplications (studentId: string): Promise<PromiseResult<DynamoDB.DocumentClient.UpdateItemOutput, AWSError>> {
  try {
    const dynamoDb = new DynamoDB.DocumentClient()

    const getParams = {
      TableName: process.env.studentCoursesTableName ?? '',
      Key: {
        studentId
      }
    }

    const result = await dynamoDb.get(getParams).promise()
    console.log(result)
    return result
  } catch (err: any) {
    console.error(err)
    throw new Error('internal server error')
  }
}
