export class CoreError extends Error {
  statusCode: number
  message: string
  constructor (data: any) {
    super(data.message as string)
    this.statusCode = data.statusCode
    this.message = data.message
  }
}
