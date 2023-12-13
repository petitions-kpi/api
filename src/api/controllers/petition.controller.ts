import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { PetitionService } from '../services/petition.service';
import { PetitionMapper } from '../mappers/petition.mapper';
import { JwtAuthGuard } from '../../security/guards/jwt-auth.guard';
import { CreatePetitionDto } from '../dto/create-petition.dto';

@Controller({
  version: '1',
  path: '/petitions',
})
export class PetitionController {
  constructor (
    private petitionService: PetitionService,
    private petitionMapper: PetitionMapper,
  ) {}

  @Get()
  async getAll () {
    const petitions = await this.petitionService.getAll();
    return { petitions: this.petitionMapper.getAll(petitions) };
  }

  @Get('/:petitionId')
  async get (
    @Param('petitionId', ParseIntPipe) petitionId: number
  ) {
    const petition = await this.petitionService.get(petitionId);
    return this.petitionMapper.get(petition);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create (
    @Body() body: CreatePetitionDto,
    @Req() req
  ) {
    const petition = await this.petitionService.create(body, req.user.id);
    return this.petitionMapper.get(petition);
  }

  @Post('/:petitionId/sign')
  @UseGuards(JwtAuthGuard)
  async sign (
    @Param('petitionId', ParseIntPipe) petitionId: number,
    @Req() req
  ) {
    const petition = await this.petitionService.sign(petitionId, req.user.id);
    return this.petitionMapper.get(petition);
  }
}
