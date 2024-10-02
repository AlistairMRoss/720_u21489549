import { S3 } from 'aws-sdk'

export async function getNewFirmware (): Promise<Buffer | undefined> {
  try {
    const s3 = new S3()
    const params = {
      Bucket: process.env.bucketBucketName ?? '',
      Key: 'firmware.bin'
    }
    const data = await s3.getObject(params).promise()
    return data.Body as Buffer
  } catch (error) {
    console.error('Error getting file from S3:', error)
    throw error
  }
}
