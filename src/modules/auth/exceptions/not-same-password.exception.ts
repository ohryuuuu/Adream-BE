import { HttpException, HttpStatus } from '@nestjs/common';

export class NotSamePasswordException extends HttpException {
  constructor(message: string = '올바르지 않은 비밀번호입니다') {
    super(message, HttpStatus.NON_AUTHORITATIVE_INFORMATION);
  }
}
