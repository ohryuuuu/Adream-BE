import { HttpException, HttpStatus } from '@nestjs/common';

export class PasswordIsNotCorrectException extends HttpException {
  constructor(message: string = '비밀번호가 일치하지 않습니다') {
    super(message, HttpStatus.NON_AUTHORITATIVE_INFORMATION);
  }
}
