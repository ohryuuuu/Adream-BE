import { HttpException, HttpStatus } from '@nestjs/common';

export class DeadlineTightException extends HttpException {
  constructor(message: string = '마감일이 너무 촉박합니다(오늘보다 약 1일 뒤로)') {
    super(message, HttpStatus.NOT_ACCEPTABLE);
  }
}
