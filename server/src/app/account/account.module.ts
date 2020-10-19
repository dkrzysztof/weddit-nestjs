import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/providers/database.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../models/user.entity';
import { AccountController } from './account.controller';
import { UserService } from '../users/users.service';
import { AccountService } from './account.service';
import { usersProvider } from '../users/users.providers';
import { UsersModule } from '../users/users.module';

@Module({
	providers: [...usersProvider, AccountService],
	controllers: [AccountController],
	imports: [DatabaseModule, ConfigModule, TypeOrmModule.forFeature([User]), UsersModule],
	exports: [AccountService],
})
export class AccountModule {}
