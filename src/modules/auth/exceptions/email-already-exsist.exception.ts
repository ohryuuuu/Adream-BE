import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAlreadyExistsException extends HttpException {
  constructor(message: string = '같은 이메일로 유저가 존재함') {
    super(message, HttpStatus.FOUND);
  }
}
