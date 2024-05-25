import { DynamoDB, type AWSError } from 'aws-sdk'
import { type PromiseResult } from 'aws-sdk/lib/request.js'
import { addUserToGroup } from '../users/addUserToGroup.js'

export async function courseApplications (courseId: string, studentId: string, accepted: boolean): Promise<PromiseResult<DynamoDB.DocumentClient.UpdateItemOutput, AWSError>> {
  try {
    const dynamoDb = new DynamoDB.DocumentClient()

    const getItemParams = {
      TableName: process.env.studentCoursesTableName ?? '',
      Key: { studentId }
    }

    const currentItem = await dynamoDb.get(getItemParams).promise()

    if (currentItem.Item == null) {
      throw new Error('Item not found')
    }

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const applications = currentItem.Item.applications || []
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const acceptedList = currentItem.Item.accepted || []

    if (acceptedList.length === 0 && accepted) {
      await addUserToGroup(studentId, 'student')
    }
    const updatedApplications = applications.filter((id: string) => id !== courseId)

    let updateExpression = 'SET #applications = :updatedApplications'
    const expressionAttributeValues: Record<string, any> = { ':updatedApplications': updatedApplications }
    const expressionAttributeNames: Record<string, string> = { '#applications': 'applications' }

    if (accepted) {
      const updatedAcceptedList = [...acceptedList, courseId]
      console.log(updatedAcceptedList)
      updateExpression += ', #accepted = :updatedAcceptedList'
      expressionAttributeValues[':updatedAcceptedList'] = updatedAcceptedList
      expressionAttributeNames['#accepted'] = 'accepted'
    }

    console.log(updateExpression)
    console.log(expressionAttributeValues)
    console.log(expressionAttributeNames)

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
