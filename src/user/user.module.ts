import { Module } from '@nestjs/common';
import { UsuarioController } from './user.controller';
import { UserRepository } from './user.repository';
import { PrismaService } from '../prisma.service';
import { UserUniqueValidator } from './validator/userUniqueValidator';

import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  controllers: [UsuarioController],
  providers: [UserRepository, PrismaService, UserUniqueValidator, JwtStrategy],
  exports: [UserRepository],
})
export class UserModule {}
