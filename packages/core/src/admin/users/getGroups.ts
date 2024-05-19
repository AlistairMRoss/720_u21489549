import { CoreError } from '../../CoreError.d.js'
import { CognitoIdentityServiceProvider } from 'aws-sdk'
import { type Groups } from '../../../../sharedTypes/users.js'
const cognito = new CognitoIdentityServiceProvider({
  region: 'us-east-1'
})

export async function getGroups (): Promise<Groups[]> {
  try {
    // getting all the groups
    const groupList = await cognito.listGroups({
      // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
      UserPoolId: process.env.UserPoolId as string
    }).promise()

    console.log(groupList)
    return groupList as unknown as Groups[]
  } catch (err: any) {
    console.log(err)
    console.error(err)
    throw new CoreError({ message: 'Internal Server Error', statusCode: 500 })
  }
}
