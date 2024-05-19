import { CoreError } from '../../CoreError.d.js'
import { CognitoIdentityServiceProvider } from 'aws-sdk'
const cognito = new CognitoIdentityServiceProvider({
  region: 'us-east-1'
})

export async function createUser (email: string): Promise<boolean> {
  try {
    // generating a unique username

    await cognito.adminCreateUser({
      // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
      UserPoolId: process.env.UserPoolId as string,
      Username: email,
      UserAttributes: [
        {
          Name: 'email',
          Value: email
        },
        {
          Name: 'email_verified',
          Value: 'True'
        }
      ]
    }).promise()

    return true
  } catch (err: any) {
    console.log(err.message)
    if (err.message === 'User already exists.') {
      throw new CoreError({ message: 'User already exists', statusCode: 409 })
    } else if (err.message === 'Invalid email address format.') {
      throw new CoreError({ message: 'Invalid email address format', statusCode: 422 })
    } else if (err.message === 'An account with the given email already exists.') {
      throw new CoreError({ message: 'An account with the given email already exists', statusCode: 409 })
    } else {
      console.error(err)
      throw new CoreError({ message: 'Internal Server Error', statusCode: 500 })
    }
  }
}
