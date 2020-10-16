import { Body, Controller, Delete, Get, Post, Put, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskForGetAllTasks } from './dto/get-all-tasks.dto';
import { GetTaskDetailsDto } from './dto/get-task.dto';
import { UpdateTaskDetailsDto } from './dto/update-task-details.dto';
import { TaskListsService } from './taskLists.service';

@Controller()
export class TaskListsController {
	constructor(private readonly taskListService: TaskListsService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	async getAllTasks(@Req() { user }, @Param('idWedding') idWedding: number): Promise<TaskForGetAllTasks[]> {
		return await this.taskListService.getTaskList(user, idWedding);
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	async getTaskDetails(
		@Req() { user },
		@Param('idWedding') idWedding: number,
		@Param('id') idTask: number,
	): Promise<GetTaskDetailsDto> {
		return await this.taskListService.getTask(user, idWedding, idTask);
	}

	@Post()
	@UseGuards(JwtAuthGuard)
	async createTask(@Req() { user }, @Param('idWedding') idWedding: number, @Body() createTaskDto: CreateTaskDto) {
		return await this.taskListService.createTask(user, idWedding, createTaskDto);
	}

	@Put(':id')
	@UseGuards(JwtAuthGuard)
	async updateTaskDetails(
		@Req() { user },
		@Param('idWedding') idWedding: number,
		@Param('id') idTask: number,
		@Body() updateTaskDetails: UpdateTaskDetailsDto,
	) {
		return await this.taskListService.updateTask(user, idWedding, idTask, updateTaskDetails);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async deleteTask(@Req() { user }, @Param('idWedding') idWedding: number, @Param('id') idTask: number) {
		return await this.taskListService.deleteTask(user, idWedding, idTask);
	}
}
