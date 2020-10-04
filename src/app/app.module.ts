import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'src/app/users/users.module';
import { DatabaseModule } from 'src/providers/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		AuthModule,
		UsersModule,
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
