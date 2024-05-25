import { DynamoDB, type AWSError } from 'aws-sdk'
import { type PromiseResult } from 'aws-sdk/lib/request.js'

export async function applyForCourse (studentId: string, newCourseId: string): Promise<PromiseResult<DynamoDB.DocumentClient.UpdateItemOutput, AWSError>> {
  try {
    const dynamoDb = new DynamoDB.DocumentClient()

    const getParams = {
      TableName: process.env.studentCoursesTableName ?? '',
      Key: {
        studentId
      }
    }

    const studentItem = await dynamoDb.get(getParams).promise()

    if (studentItem.Item == null) {
      const newParams = {
        TableName: process.env.studentCoursesTableName ?? '',
        Key: {
          studentId
        },
        Item: {
          studentId,
          accepted: [],
          applications: [newCourseId]
        }
      }
      const result = await dynamoDb.put(newParams).promise()
      return result
    }

    const putParams = {
      TableName: process.env.studentCoursesTableName ?? '',
      Key: {
        studentId
      },
      UpdateExpression: 'SET applications = list_append(if_not_exists(applications, :empty_list), :new_course)',
      ExpressionAttributeValues: {
        ':new_course': [newCourseId],
        ':empty_list': []
      },
      ReturnValues: 'UPDATED_NEW'
    }

    const result = await dynamoDb.update(putParams).promise()
    return result
  } catch (err) {
    console.error(err)
    throw new Error('Internal server error')
  }
}
