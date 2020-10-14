import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskList } from '../../models/taskList.entity';
import { Wedding } from '../../models/wedding.entity';
import { appendOrCreateArray } from '../../utilities/empty-array-checkout.utility';
import { transactionWrapper } from '../../utilities/transaction-wrapper.utility';
import { updateAllObjectKeyValues } from '../../utilities/update-all-keys.utilities';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { WeddingService } from '../wedding/wedding.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskDetailsDto } from './dto/get-task.dto';
import { UpdateTaskDetailsDto } from './dto/update-task-details.dto';

@Injectable()
export class TaskListsService {
	constructor(
		@InjectRepository(TaskList) private taskListsRepository: Repository<TaskList>,
		private weddingService: WeddingService,
	) {}

	async createTask(userPayload: JwtPayload, idWedding: number, createTaskDto: CreateTaskDto): Promise<CreateTaskDto> {
		if (this.weddingService.checkIfUserHasPermission(userPayload, idWedding, true)) {
			return await transactionWrapper(async queryRunner => {
				const task = await queryRunner.manager.create(TaskList, createTaskDto);
				const wedding = await queryRunner.manager.findOne(Wedding, { idWedding }, { relations: ['taskLists'] });

				appendOrCreateArray(wedding, 'taskLists', task);

				await queryRunner.manager.save(TaskList, task);
				await queryRunner.manager.save(Wedding, wedding);

				return task;
			});
		} else throw new ForbiddenException('You have no permission to do this action!');
	}

	async getTask(userPayload: JwtPayload, idWedding: number, idTaskList: number): Promise<GetTaskDetailsDto> {
		if (this.weddingService.checkIfUserHasPermission(userPayload, idWedding, true)) {
			return await this.taskListsRepository.findOne({ idTaskList });
		} else throw new ForbiddenException('You have no permission to do this action!');
	}

	async getTaskList(userPayload: JwtPayload, idWedding: number): Promise<GetTaskDetailsDto[]> {
		if (this.weddingService.checkIfUserHasPermission(userPayload, idWedding, true)) {
			const taskList = (await this.taskListsRepository
				.createQueryBuilder('t')
				.leftJoinAndSelect('t.wedding', 'w')
				.select([
					't.idTaskList',
					't.description',
					't.deadline',
					't.dutyHolderFullName',
					't.isComplete',
					't.cost',
					'w.idWedding',
				])
				.where('w.idWedding = :idWedding', { idWedding })
				.getRawMany()) as GetTaskDetailsDto[];

			return taskList;
		} else throw new ForbiddenException('You have no permission to do this action!');
	}

	async updateTask(
		userPayload: JwtPayload,
		idWedding: number,
		idTaskList: number,
		updateTaskDetailsDto: UpdateTaskDetailsDto,
	): Promise<UpdateTaskDetailsDto> {
		if (this.weddingService.checkIfUserHasPermission(userPayload, idWedding, true)) {
			let task = await this.taskListsRepository.findOne({ idTaskList });

			updateAllObjectKeyValues(updateTaskDetailsDto, task);

			return await this.taskListsRepository.save(task);
		} else throw new ForbiddenException('You have no permission to do this action!');
	}

	async deleteTask(userPayload: JwtPayload, idWedding: number, idTaskList: number): Promise<boolean> {
		if (this.weddingService.checkIfUserHasPermission(userPayload, idWedding, true)) {
			await this.taskListsRepository.delete({ idTaskList });
			return true;
		} else throw new ForbiddenException('You have no permission to do this action!');
	}
}
