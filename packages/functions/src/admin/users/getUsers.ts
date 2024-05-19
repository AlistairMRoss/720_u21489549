import { type APIGatewayProxyHandlerV2, type APIGatewayProxyResultV2 } from 'aws-lambda'
import { getUsers } from '../../../../core/src/admin/users/getUsers.js'
import { adminCheck } from '../../../../core/src/admin/adminCheck.js'
export const handler: APIGatewayProxyHandlerV2 = async (event: any): Promise<APIGatewayProxyResultV2> => {
  // returning
  try {
    // Checks if the user is an admin
    console.log('Got here')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await adminCheck(event.requestContext.authorizer.jwt.claims['cognito:groups'])
    const result = await getUsers()
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ users: result })
    }
  } catch (err: any) {
    return {
      statusCode: err.statusCode,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message })
    }
  }
}
