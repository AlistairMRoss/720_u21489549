import { DynamoDB, type AWSError } from 'aws-sdk'
import { type PromiseResult } from 'aws-sdk/lib/request.js'

export async function courseApplications (courseId: string, studentId: string, accepted: boolean): Promise<PromiseResult<DynamoDB.DocumentClient.GetItemOutput, AWSError>> {
  try {
    const dynamoDb = new DynamoDB.DocumentClient()

    let updateExpression = 'SET #applications = list_remove(if_not_exists(#applications, :empty_list), :courseId)'
    let expressionAttributeValues: Record<string, any> = { ':courseId': courseId, ':empty_list': [] }
    const expressionAttributeNames: Record<string, string> = { '#applications': 'applications' }

    if (accepted) {
      updateExpression = 'SET accepted = list_append(if_not_exists(accepted, :empty_list), :new_course), #applications = list_remove(if_not_exists(#applications, :empty_list), :courseId)'
      expressionAttributeValues = {
        ':courseId': courseId,
        ':new_course': [courseId],
        ':empty_list': []
      }
    }

    const updateParams = {
      TableName: process.env.studentCoursesTableName ?? '',
      Key: {
        studentId
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ExpressionAttributeNames: expressionAttributeNames,
      ReturnValues: 'ALL_NEW'
    }

    const result = await dynamoDb.update(updateParams).promise()
    console.log(result)
    return result
  } catch (err: any) {
    console.error(err)
    throw new Error('internal server error')
  }
}
