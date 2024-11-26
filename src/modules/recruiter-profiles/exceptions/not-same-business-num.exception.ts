import { HttpException, HttpStatus } from '@nestjs/common';

export class NotSameBusinessNumException extends HttpException {
  constructor(message: string = '사업자등록번호가 이전과 같아야합니다.') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
