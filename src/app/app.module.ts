import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from '../providers/database.module';
import { AuthModule } from './auth/auth.module';
import { WeddingModule } from './wedding/wedding.module';

@Module({
	imports: [
		AuthModule,
		UsersModule,
		WeddingModule,
		DatabaseModule,
		ConfigModule.forRoot({
			expandVariables: true,
		}),
		TypeOrmModule.forRoot(),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
