import { HttpException, HttpStatus } from '@nestjs/common';

export class NotWorkingBusinessException extends HttpException {
  constructor(message: string = '현재 운영중인 비즈니스가 아닙니다') {
    super(message, HttpStatus.NOT_FOUND);
  }
}
