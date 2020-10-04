import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { DatabaseModule } from 'src/providers/database.module';
import { usersProvider } from './users.providers';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../models/user.entity';

@Module({
	providers: [...usersProvider, UserService],
	controllers: [UsersController],
	imports: [DatabaseModule, ConfigModule, TypeOrmModule.forFeature([User])],
	exports: [UserService],
})
export class UsersModule {}
