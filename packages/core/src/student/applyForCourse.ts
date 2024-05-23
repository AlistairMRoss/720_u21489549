import { DynamoDB, type AWSError } from 'aws-sdk'
import { type PromiseResult } from 'aws-sdk/lib/request.js'

export async function applyForCourse (studentId: string, newCourseId: string): Promise<PromiseResult<DynamoDB.DocumentClient.UpdateItemOutput, AWSError>> {
  try {
    const dynamoDb = new DynamoDB.DocumentClient()
    const params = {
      TableName: process.env.studentCoursesTableName ?? '',
      Key: {
        studentId
      },
      UpdateExpression: 'SET applications = list_append(if_not_exists(applications, :empty_list), :new_course)',
      ExpressionAttributeValues: {
        ':new_course': [newCourseId],
        ':empty_list': []
      },
      ReturnValues: 'UPDATED_NEW',
      ConditionExpression: 'attribute_not_exists(studentId)'
    }

    const result = await dynamoDb.update(params).promise()
    return result
  } catch (err) {
    console.error(err)
    throw new Error('Internal server error')
  }
}
