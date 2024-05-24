import { CoreError } from '../../CoreError.d.js'
import { CognitoIdentityServiceProvider } from 'aws-sdk'
const cognito = new CognitoIdentityServiceProvider({
  region: 'us-east-1'
})

export async function addUserToGroup (userId: string, group: string): Promise<boolean> {
  try {
    await cognito.adminAddUserToGroup({
      // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
      UserPoolId: process.env.UserPoolId as string,
      Username: userId,
      GroupName: group
    }).promise()

    return true
  } catch (err: any) {
    console.log(err)
    console.error(err)
    if (err.message === 'Group not found.') {
      throw new CoreError({ message: 'Group not found', statusCode: 404 })
    } else if (err.message === 'User does not exist.') {
      throw new CoreError({ message: 'User does not exist', statusCode: 404 })
    } else if (err.message === 'The user is already in the group.') {
      throw new CoreError({ message: 'The user is already in the group', statusCode: 409 })
    } else {
      throw new CoreError({ message: 'Internal Server Error', statusCode: 500 })
    }
  }
}
