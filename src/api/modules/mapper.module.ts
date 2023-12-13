import { Module } from '@nestjs/common';
import { PetitionMapper } from '../mappers/petition.mapper';

@Module({
  providers: [PetitionMapper],
  exports: [PetitionMapper],
})
export class MapperModule {}