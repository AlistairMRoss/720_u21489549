import { type APIGatewayProxyHandlerV2, type APIGatewayProxyResultV2 } from 'aws-lambda'
import { updateUserAttributes } from '../../../../core/src/admin/users/updateUser.js'
import { adminCheck } from '../../../../core/src/admin/adminCheck.js'
export const handler: APIGatewayProxyHandlerV2 = async (event: any): Promise<APIGatewayProxyResultV2> => {
  try {
    const data = JSON.parse(event.body as string)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await adminCheck(event.requestContext.authorizer.jwt.claims['cognito:groups'])
    await updateUserAttributes(data.userId as string, data.givenName as string, data.familyName as string, data.phoneNumber as string)
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: 'User updated succesfully' })
    }
  } catch (err: any) {
    return {
      statusCode: err.statusCode,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message })
    }
  }
}
