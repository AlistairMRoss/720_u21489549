import { type APIGatewayProxyHandlerV2, type APIGatewayProxyResultV2 } from 'aws-lambda'
import { getMyProfile } from '../../../core/src/student/getMyProfile.js'
// import { studentCheck } from '../../../core/src/student/studentCheck.js'

export const handler: APIGatewayProxyHandlerV2 = async (event: any): Promise<APIGatewayProxyResultV2> => {
  try {
    // await studentCheck(event.requestContext.authorizer.jwt.claims['cognito:groups'] as string[])
    const accessToken = event.headers.authorization.split('Bearer ')[1]
    const result = await getMyProfile(accessToken as string)
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ result })
    }
  } catch (err: any) {
    return {
      statusCode: err.statusCode,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message })
    }
  }
}
