import { HttpException, HttpStatus } from '@nestjs/common';

export class VerifyCodeIsNotCorrectException extends HttpException {
  constructor(message: string = '인증코드가 확인되지 않거나 올바르지 않습니다') {
    super(message, HttpStatus.NON_AUTHORITATIVE_INFORMATION);
  }
}
