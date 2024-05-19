import { CoreError } from '../CoreError.d.js'

export async function adminCheck (userGroup: string | string[] | undefined): Promise<boolean> {
  try {
    if ((userGroup?.includes('admin')) ?? false) {
      console.log('Authorized admin')
    } else {
      console.log('user not registered as admin')
      throw new Error('Invalid admin')
    }
    return true
  } catch (err: any) {
    console.log('user not registered as admin')
    if (err.message === 'Invalid admin') {
      console.warn('Invalid admin')
      throw new CoreError({ message: 'Invalid admin', statusCode: 403 })
    } else {
      console.error('Some error occured', err)
      throw new CoreError({ message: 'Unauthorized', statusCode: 401 })
    }
  }
}
