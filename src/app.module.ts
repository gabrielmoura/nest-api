import { Module } from '@nestjs/common';
// import { ProdutoModule } from './produto/produto.module';
import { UserModule } from './user/user.module';
import { HomeController } from './home.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [HomeController],
})
export class AppModule {}
