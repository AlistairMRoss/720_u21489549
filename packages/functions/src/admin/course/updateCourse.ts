import { type APIGatewayProxyHandlerV2, type APIGatewayProxyResultV2 } from 'aws-lambda'
import { updateCourse } from '../../../../core/src/admin/course/updateCourse.js'
import { adminCheck } from '../../../../core/src/admin/adminCheck.js'
export const handler: APIGatewayProxyHandlerV2 = async (event: any): Promise<APIGatewayProxyResultV2> => {
  try {
    const data = JSON.parse(event.body as string)
    await adminCheck(event.requestContext.authorizer.jwt.claims['cognito:groups'] as string[])
    await updateCourse(data.courseId as string, data.lecture as string, data.description as string)
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: 'Course Updated' })
    }
  } catch (err: any) {
    return {
      statusCode: err.statusCode,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message })
    }
  }
}
