export class BadRequest extends Error {
  constructor(message) {
    super(message)
    this.name = 'BadRequest'
    this.status = 400
  }
}
export class Unauthorized extends Error {
  constructor(message = 'Unauthorized') {
    super(message)
    this.name = 'Unauthorized'
    this.status = 401
  }
}
export class NotFound extends Error {
  constructor(message = 'The requested resource could not be found') {
    super(message)
    this.name = 'NotFound'
    this.status = 404
  }
}
