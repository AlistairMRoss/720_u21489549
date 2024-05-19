import { CoreError } from '../../CoreError.d.js'
import { CognitoIdentityServiceProvider } from 'aws-sdk'
const cognito = new CognitoIdentityServiceProvider({
  region: 'us-east-1'
})

export async function createGroup (group: string): Promise<boolean> {
  try {
    // creating a group
    await cognito.createGroup({
      // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
      UserPoolId: process.env.UserPoolId as string,
      GroupName: group
    }).promise()

    return true
  } catch (err: any) {
    console.log(err)
    console.error(err)

    throw new CoreError({ message: 'Internal Server Error', statusCode: 500 })
  }
}
