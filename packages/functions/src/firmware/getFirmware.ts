import { type APIGatewayProxyHandlerV2, type APIGatewayProxyResultV2 } from 'aws-lambda'
import { getNewFirmware } from '../../../core/src/firmware/getNewFirmware.js'

export const handler: APIGatewayProxyHandlerV2 = async (event: any): Promise<APIGatewayProxyResultV2> => {
  try {
    
    const result = await getNewFirmware()
    if (Buffer.isBuffer(result)) {  
        return {
            statusCode: 200,
            headers: {
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': 'attachment; filename="firmware.bin"'
            },
            body: result.toString('base64'),
            isBase64Encoded: true
        }
    } else {
        return {
            statusCode: 401,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'error' })
          }
    }
  } catch (err: any) {
    return {
      statusCode: err.statusCode,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message })
    }
  }
}
