import { PetitionStatus, Student, StudentSignature, User } from '@prisma/client';

export class PetitionDb {
  id: number;
  title: string;
  text: string;
  keywords: string;
  status: PetitionStatus;
  authorId: string;
  createdAt: Date;
  author: Student & {
    user: User,
  };
  signatures: (StudentSignature & {
    student: Student & {
      user: User
    },
  })[];
}