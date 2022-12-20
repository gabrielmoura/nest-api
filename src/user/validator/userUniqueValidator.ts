import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from '../user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class UserUniqueValidator implements ValidatorConstraintInterface {
  constructor(private readonly usuarioRepository: UserRepository) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    return !(await this.usuarioRepository.getUser({ email: value }));
  }
}

export const UserUnique = (options?: ValidationOptions) => {
  return (obj: object, prop: string) => {
    registerDecorator({
      target: obj.constructor,
      propertyName: prop,
      options: options,
      constraints: [],
      validator: UserUniqueValidator,
    });
  };
};
