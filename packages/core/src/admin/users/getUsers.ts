import { CognitoIdentityServiceProvider } from 'aws-sdk'
import { CoreError } from '../../CoreError.d.js'
import { type User } from '../../../../sharedTypes/users.js'

const cognito = new CognitoIdentityServiceProvider({
  region: 'us-east-1'
})

export async function getUsers (): Promise<User[]> {
  try {
    const users: User[] = []
    let paginationToken: string | undefined

    do {
      const response = await cognito.listUsers({
        // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
        UserPoolId: process.env.UserPoolId as string,
        PaginationToken: paginationToken
      }).promise()

      users.push(...(response.Users as unknown as User[]))

      paginationToken = response.PaginationToken
    } while (paginationToken !== undefined && paginationToken !== '')

    return users
  } catch (err: any) {
    console.log(err)
    throw new CoreError({ message: 'Internal Server Error', statusCode: 500 })
  }
}
