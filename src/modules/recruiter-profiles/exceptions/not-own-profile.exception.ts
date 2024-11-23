import { HttpException, HttpStatus } from '@nestjs/common';

export class NotOwnProfileException extends HttpException {
  constructor(message: string = '자신의 프로필이 아닙니다') {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
