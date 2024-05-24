import { CognitoIdentityServiceProvider } from 'aws-sdk'
import { CoreError } from '../CoreError.d.js'
import { type Profile } from '../../../sharedTypes/users.js'

const cognito = new CognitoIdentityServiceProvider({
  region: 'us-east-1'
})

export async function getMyProfile (userId: string): Promise<Profile> {
  try {
    const response = await cognito.getUser({
      AccessToken: userId
    }).promise()

    const userProfile: Profile = {
      email: response.UserAttributes.find((attr) => attr.Name === 'email')?.Value ?? '',
      name: response.UserAttributes.find((attr) => attr.Name === 'given_name')?.Value ?? '',
      surname: response.UserAttributes.find((attr) => attr.Name === 'family_name')?.Value ?? '',
      phone_number: response.UserAttributes.find((attr) => attr.Name === 'phone_number')?.Value ?? '',
      birthdate: response.UserAttributes.find((attr) => attr.Name === 'birthdate')?.Value as unknown as Date ?? null
    }
    console.log(userProfile)
    return userProfile
  } catch (err: any) {
    console.log(err)
    throw new CoreError({ message: 'Internal Server Error', statusCode: 500 })
  }
}
