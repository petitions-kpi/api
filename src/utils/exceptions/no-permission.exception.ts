import { HttpException, HttpStatus } from '@nestjs/common';

export class NoPermissionException extends HttpException {
  constructor () {
    super('You do not have permission', HttpStatus.FORBIDDEN);
  }
}