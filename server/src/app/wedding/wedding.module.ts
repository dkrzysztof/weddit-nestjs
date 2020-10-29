import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/providers/database.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../models/user.entity';
import { weddingProvider } from './wedding.provider';
import { WeddingController } from './wedding.controller';
import { WeddingService } from './wedding.service';
import { Wedding } from '../../models/wedding.entity';
import { usersProvider } from '../users/users.providers';
import { userWeddingProvider } from '../user-wedding/userWedding.provider';
import { UserWedding } from '../../models/userWedding.entity';
import { UsersModule } from '../users/users.module';

@Module({
	providers: [...weddingProvider, ...usersProvider, ...userWeddingProvider, WeddingService],
	controllers: [WeddingController],
	imports: [DatabaseModule, ConfigModule, TypeOrmModule.forFeature([Wedding, User, UserWedding]), UsersModule],
	exports: [WeddingService],
})
export class WeddingModule {}
