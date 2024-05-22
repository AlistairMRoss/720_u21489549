import { CoreError } from '../CoreError.d.js'

export async function studentCheck (userGroup: string | string[] | undefined): Promise<boolean> {
  try {
    if ((((userGroup?.includes('student')) ?? false) || userGroup?.includes('admin')) ?? false) {
      console.log('Authorized student')
    } else {
      console.log('user not registered as student')
      throw new Error('Invalid student')
    }
    return true
  } catch (err: any) {
    console.log('user not registered as student')
    if (err.message === 'Invalid student') {
      console.warn('Invalid stuent')
      throw new CoreError({ message: 'Invalid student', statusCode: 403 })
    } else {
      console.error('Some error occured', err)
      throw new CoreError({ message: 'Unauthorized', statusCode: 401 })
    }
  }
}
