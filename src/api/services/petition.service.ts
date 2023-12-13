import { Injectable } from '@nestjs/common';
import { PetitionRepo } from '../../database/repos/petition.repo';
import { PetitionDb } from '../../database/dbs/PetitionDb';
import { CreatePetitionDto } from '../dto/create-petition.dto';
import { PetitionIsSignedException } from '../../utils/exceptions/petition-is-signed.exception';
import { PetitionStatus, Prisma } from '@prisma/client';
import { SIGNATURE_COUNT } from '../../utils/constants';

@Injectable()
export class PetitionService {
  constructor (
    private petitionRepo: PetitionRepo,
  ) {}

  async getAll (): Promise<PetitionDb[]> {
    return this.petitionRepo.findMany({});
  }

  async get (id: number): Promise<PetitionDb> {
    return this.petitionRepo.findById(id);
  }

  async create (data: CreatePetitionDto, authorId: string): Promise<PetitionDb> {
    return this.petitionRepo.create({
      ...data,
      authorId,
    });
  }

  async sign (id: number, studentId: string): Promise<PetitionDb> {
    const petition = await this.petitionRepo.findById(id);
    if (petition.signatures.some((s) => s.studentId === studentId)) {
      throw new PetitionIsSignedException();
    }

    const updateInput: Prisma.PetitionUncheckedUpdateInput = {
      signatures: {
        create: {
          studentId,
        },
      },
    };
    if (petition.signatures.length >= SIGNATURE_COUNT) {
      updateInput.status = PetitionStatus.PENDING;
    }

    return this.petitionRepo.updateById(id, updateInput);
  }
}
