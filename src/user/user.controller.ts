import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './Dto/CreateUser';
import { ListUserDto } from './Dto/listUser.dto';
import { UpdateUserDto } from './Dto/UpdateUser';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';

@Controller('/users')
export class UsuarioController {
  constructor(private readonly usuarioRepository: UserRepository) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CreateUserDto) {
    const user = await this.usuarioRepository.createUser(dadosDoUsuario);
    return new ListUserDto(user.id, user.name);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async listUsuarios() {
    return await this.usuarioRepository.users({});
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.usuarioRepository.getUser({ id });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async editUser(
    @Param('id') id: string,
    @Body() dadosDoUsuario: UpdateUserDto,
  ) {
    const user = await this.usuarioRepository.updateUser({
      where: { id },
      data: dadosDoUsuario,
    });
    return {
      user,
      mensagem: 'usuário atualizado com sucesso',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.usuarioRepository.deleteUser({ id });
    return {
      id: user.id,
      mensagem: 'usuário removido com sucesso',
    };
  }
}
