import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuestType } from '../../../models/guestType.entity';
import { DatabaseModule } from '../../../providers/database.module';
import { UsersModule } from '../../users/users.module';
import { GuestTypeController } from './guest-types.controller';
import { guestTypeProvider } from './guest-types.provider';
import { GuestTypeService } from './guest-types.service';

@Module({
	providers: [...guestTypeProvider, GuestTypeService],
	controllers: [GuestTypeController],
	imports: [DatabaseModule, ConfigModule, TypeOrmModule.forFeature([GuestType]), UsersModule],
	exports: [GuestTypeService],
})
export class GuestTypesModule {}
