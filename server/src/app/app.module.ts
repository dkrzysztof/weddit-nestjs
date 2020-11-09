import { Global, Module } from '@nestjs/common';
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
import { TaskListsModule } from './taskLists/taskLists.module';
import { AccountModule } from './account/account.module';
import { BeveragesModule } from './beverages/beverages.module';

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
				path: '/:idWedding/beverages',
				module: BeveragesModule,
			},
			{
				path: '/:idWedding/task-lists',
				module: TaskListsModule,
			},
		],
	},
];

@Global()
@Module({
	imports: [
		RouterModule.forRoutes(routes),
		TaskListsModule,
		BeveragesModule,
		GuestModule,
		AuthModule,
		UsersModule,
		WeddingModule,
		AccountModule,
		DatabaseModule,
		GuestTypesModule,
		ConfigModule.forRoot({
			expandVariables: true,
		}),
		TypeOrmModule.forRoot(),
	],
	controllers: [AppController],
	providers: [AppService],
	exports: [AppService],
})
export class AppModule {}
