import { Module } from '@nestjs/common';
import { PetitionService } from '../services/petition.service';
import { PetitionController } from '../controllers/petition.controller';
import { MapperModule } from './mapper.module';

@Module({
  providers: [PetitionService],
  controllers: [PetitionController],
  imports: [MapperModule],
})
export class PetitionModule {}
