import { HttpException, HttpStatus } from '@nestjs/common';

export class ProfileInfoAlreadyExistsException extends HttpException {
  constructor(message: string = '이미 같은 정보로 프로필을 추가하셨습니다') {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
