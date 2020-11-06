import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuestType } from 'src/models/guestType.entity';
import { Guest } from '../../models/guest.entity';
import { User } from '../../models/user.entity';
import { UserWedding } from '../../models/userWedding.entity';
import { Wedding } from '../../models/wedding.entity';
import { DatabaseModule } from '../../providers/database.module';
import { userWeddingProvider } from '../user-wedding/userWedding.provider';
import { usersProvider } from '../users/users.providers';
import { WeddingModule } from '../wedding/wedding.module';
import { weddingProvider } from '../wedding/wedding.provider';
import { WeddingService } from '../wedding/wedding.service';
import { guestTypeProvider } from './guest-types/guest-types.provider';
import { GuestController } from './guest.controller';
import { guestProvider } from './guest.provider';
import { GuestService } from './guest.service';

@Module({
	providers: [...guestProvider, ...weddingProvider, ...guestTypeProvider, GuestService],
	controllers: [GuestController],
	imports: [DatabaseModule, ConfigModule, TypeOrmModule.forFeature([Guest, GuestType]), WeddingModule],
	exports: [GuestService],
})
export class GuestModule {}
