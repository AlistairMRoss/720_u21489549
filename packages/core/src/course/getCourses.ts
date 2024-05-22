import { DynamoDB, type AWSError } from 'aws-sdk'
import { type PromiseResult } from 'aws-sdk/lib/request.js'

export async function getCourses (): Promise<PromiseResult<DynamoDB.DocumentClient.GetItemOutput, AWSError>> {
  try {
    const dynamoDb = new DynamoDB.DocumentClient()

    const getParams = {
      TableName: process.env.courseTableTableName ?? ''
    }

    const result = await dynamoDb.scan(getParams).promise()
    return result
  } catch (err: any) {
    console.error(err)
    throw new Error('internal server error')
  }
}
