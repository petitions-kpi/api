import { HttpException, HttpStatus } from '@nestjs/common';

export class PetitionIsSignedException extends HttpException {
  constructor () {
    super('Petition is already signed', HttpStatus.CONFLICT);
  }
}