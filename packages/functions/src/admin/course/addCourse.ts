import { type APIGatewayProxyHandlerV2, type APIGatewayProxyResultV2 } from 'aws-lambda'
import { addCourse } from '../../../../core/src/admin/course/addCourse.js'
import { adminCheck } from '../../../../core/src/admin/adminCheck.js'
export const handler: APIGatewayProxyHandlerV2 = async (event: any): Promise<APIGatewayProxyResultV2> => {
  try {
    const data = JSON.parse(event.body as string)
    await adminCheck(event.requestContext.authorizer.jwt.claims['cognito:groups'] as string[])
    await addCourse(data.courseId as string, data.lecture as string, data.description as string)
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: 'new Course Added' })
    }
  } catch (err: any) {
    return {
      statusCode: err.statusCode,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message })
    }
  }
}
