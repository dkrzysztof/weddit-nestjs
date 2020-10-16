import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskList } from '../../models/taskList.entity';
import { DatabaseModule } from '../../providers/database.module';
import { WeddingModule } from '../wedding/wedding.module';
import { TaskListsController } from './taskLists.controller';
import { taskListsProvider } from './taskLists.provider';
import { TaskListsService } from './taskLists.service';

@Module({
	providers: [...taskListsProvider, TaskListsService],
	controllers: [TaskListsController],
	imports: [DatabaseModule, ConfigModule, TypeOrmModule.forFeature([TaskList]), WeddingModule],
	exports: [TaskListsService],
})
export class TaskListsModule {}
