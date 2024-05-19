import { CoreError } from '../../CoreError.d.js'
import { CognitoIdentityServiceProvider } from 'aws-sdk'

const cognito = new CognitoIdentityServiceProvider({
  region: 'us-east-1'
})

export async function deleteUser (adminUser: string, userId: string): Promise<boolean> {
  try {
    if (adminUser === userId) {
      throw new Error('You cannot delete yourself')
    }
    await cognito.adminDeleteUser({
      // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
      UserPoolId: process.env.UserPoolId as string,
      Username: userId
    }).promise()

    return true
  } catch (err: any) {
    console.log(err.message)
    if (err.message === 'User does not exist.') {
      throw new CoreError({ message: 'User does not exist', statusCode: 404 })
    } else if (err.message === 'You cannot delete yourself') {
      throw new CoreError({ message: 'You cannot delete yourself', statusCode: 400 })
    } else {
      console.error(err)
      throw new CoreError({ message: 'Internal Server Error', statusCode: 500 })
    }
  }
}
