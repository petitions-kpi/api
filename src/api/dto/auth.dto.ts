import { IsEmail, IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { UKR, UKRSPEC } from '../../utils/constants';

export class AuthDto {
  @IsEmail({}, { message: 'Email isn\'t valid' })
  @Matches(/@kpi.ua$/, { message: 'Email doesn\'t belong to @kpi.ua domain' })
  @IsNotEmpty({ message: 'Email is empty' })
    email: string;

  @Matches(/^(?=.*[A-Za-z])(?=.*\d).{8,32}$/, {
    message: 'Password must be between 8 and 32 characters long, contain at least one letter and one number',
  })
  @IsNotEmpty({ message: 'Password is empty' })
    password: string;

  @Matches(new RegExp('^[' + UKR + UKRSPEC + ']{2,40}$'), {
    message: 'First name is not correct (A-Я(укр.)\\-\' ), or too short (min: 2), or too long (max: 40)',
  })
  @IsNotEmpty({ message: 'First name is empty' })
    firstName: string;

  @Matches(new RegExp('^[' + UKR + UKRSPEC + ']{0,40}$'), {
    message: 'Middle name is not correct (A-Я(укр.)\\-\' ), or too long (max: 40)',
  })
  @IsOptional()
    middleName?: string;

  @Matches(new RegExp('^[' + UKR + UKRSPEC + ']{2,40}$'), {
    message: 'Last name is not correct (A-Я(укр.)\\-\' ), or too short (min: 2), or too long (max: 40)',
  })
  @IsNotEmpty({ message: 'Last name is empty' })
    lastName: string;
}