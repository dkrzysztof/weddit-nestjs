import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from '../providers/database.module';
import { AuthModule } from './auth/auth.module';
import { WeddingModule } from './wedding/wedding.module';
import { GuestModule } from './guest/guest.module';
import { RouterModule, Routes } from 'nest-router';
import { GuestTypesModule } from './guest/guest-types/guest-types.module';
import { DrinksModule } from './drinks/drinks.module';
import { TaskListsModule } from './taskLists/taskLists.module';

const routes: Routes = [
	{
		path: '/weddings',
		module: WeddingModule,
		children: [
			{
				path: '/:idWedding/guests',
				module: GuestModule,
			},
			{
				path: '/:idWedding/drinks',
				module: DrinksModule,
			},
			{
				path: '/:idWedding/task-lists',
				module: TaskListsModule,
			},
		],
	},
];

@Module({
	imports: [
		RouterModule.forRoutes(routes),
		TaskListsModule,
		DrinksModule,
		GuestModule,
		AuthModule,
		UsersModule,
		WeddingModule,
		DatabaseModule,
		GuestTypesModule,
		ConfigModule.forRoot({
			expandVariables: true,
		}),
		TypeOrmModule.forRoot(),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
