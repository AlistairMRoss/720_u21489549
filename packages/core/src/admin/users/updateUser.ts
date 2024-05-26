import { CognitoIdentityServiceProvider } from 'aws-sdk'
import { CoreError } from '../../CoreError.d.js'

const cognito = new CognitoIdentityServiceProvider({
  region: 'us-east-1'
})

export async function updateUserAttributes (userId: string, givenName: string, familyName: string, phoneNumber: string): Promise<void> {
  try {
    await cognito.adminUpdateUserAttributes({
      // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
      UserPoolId: process.env.UserPoolId as string,
      Username: userId,
      UserAttributes: [
        {
          Name: 'given_name',
          Value: givenName
        },
        {
          Name: 'family_name',
          Value: familyName
        },
        {
          Name: 'phone_number',
          Value: phoneNumber
        }
      ]
    }).promise()
  } catch (err: any) {
    console.log(err)
    throw new CoreError({ message: 'Internal Server Error', statusCode: 500 })
  }
}
