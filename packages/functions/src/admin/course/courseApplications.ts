import { type APIGatewayProxyHandlerV2, type APIGatewayProxyResultV2 } from 'aws-lambda'
import { courseApplications } from '../../../../core/src/admin/course/courseApplications.js'
import { adminCheck } from '../../../../core/src/admin/adminCheck.js'
export const handler: APIGatewayProxyHandlerV2 = async (event: any): Promise<APIGatewayProxyResultV2> => {
  try {
    const data = JSON.parse(event.body as string)
    await adminCheck(event.requestContext.authorizer.jwt.claims['cognito:groups'] as string[])
    await courseApplications(data.courseId as string, data.studentId as string, data.accepted as boolean)
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: 'Course Application captured' })
    }
  } catch (err: any) {
    return {
      statusCode: err.statusCode,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message })
    }
  }
}
