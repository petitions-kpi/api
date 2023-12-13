import { Injectable } from '@nestjs/common';
import { PetitionDb } from '../../database/dbs/PetitionDb';

@Injectable()
export class PetitionMapper {
  private getBase (petition: PetitionDb) {
    return {
      id: petition.id,
      title: petition.title,
      status: petition.status,
      keywords: petition.keywords,
      createdAt: petition.createdAt,
      author: {
        id: petition.authorId,
        firstName: petition.author.user.firstName,
        middleName: petition.author.user.middleName,
        lastName: petition.author.user.lastName,
      },
    };
  }

  getAll (petitions: PetitionDb[]) {
    return petitions.map((p) => ({
      ...this.getBase(p),
      signatures: p.signatures.length,
    }));
  }

  get (petition: PetitionDb) {
    return {
      ...this.getBase(petition),
      text: petition.text,
      signatures: petition.signatures.map((s) => ({
        studentId: s.studentId,
        firstName: s.student.user.firstName,
        middleName: s.student.user.middleName,
        lastName: s.student.user.lastName,
        date: s.date,
      })),
    };
  }
}