import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class CreatePetitionDto {
  @MinLength(8, { message: 'Title is too short (min: 8)' })
  @MaxLength(20, { message: 'Title is too long (max: 20)' })
  @IsNotEmpty({ message: 'Title is empty' })
    title: string;

  @MinLength(100, { message: 'Text is too short (min: 100)' })
  @MaxLength(1000, { message: 'Text is too long (max: 1000)' })
  @IsNotEmpty({ message: 'Text is empty' })
    text: string;

  @MaxLength(50, { message: 'Keywords are too long (max: 50)' })
  @IsOptional()
    keywords?: string;
}