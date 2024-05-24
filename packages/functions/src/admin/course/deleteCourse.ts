import { type APIGatewayProxyHandlerV2, type APIGatewayProxyResultV2 } from 'aws-lambda'
import { deleteCourse } from '../../../../core/src/admin/course/deleteCourse.js'
import { adminCheck } from '../../../../core/src/admin/adminCheck.js'
export const handler: APIGatewayProxyHandlerV2 = async (event: any): Promise<APIGatewayProxyResultV2> => {
  try {
    await adminCheck(event.requestContext.authorizer.jwt.claims['cognito:groups'] as string[])
    await deleteCourse(event.pathParameters.courseId as string)
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: 'Course Deleted' })
    }
  } catch (err: any) {
    return {
      statusCode: err.statusCode,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message })
    }
  }
}
