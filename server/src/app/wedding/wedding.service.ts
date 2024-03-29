import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICollectionResponse } from 'src/types/CollectionResponse';
import { IPageQueryParams } from 'src/types/PageQueryParams';
import { getCollection } from 'src/utilities/get-collection.utility';
import { getConnection, Repository } from 'typeorm';
import { User } from '../../models/user.entity';
import { UserWedding } from '../../models/userWedding.entity';
import { Wedding } from '../../models/wedding.entity';
import { appendOrCreateArray } from '../../utilities/empty-array-checkout.utility';
import { transactionWrapper } from '../../utilities/transaction-wrapper.utility';
import { updateAllObjectKeyValues } from '../../utilities/update-all-keys.utilities';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserService } from '../users/users.service';
import { AddSeatDiagram } from './dto/add-chart-diagram';
import { AllowUserToAccessWedding } from './dto/allow-user-to-access-wedding.dto';
import { CreateWeddingPlanDto } from './dto/create-wedding-plan.dto';
import { GetUserWeddingsDto } from './dto/get-user-weddings.dto';
import { GetWeddingDto } from './dto/get-wedding.dto';
import { TableForSeatChartModel } from './dto/SeatChartNodeModel';
import { UpdateWeddingDto } from './dto/update-wedding.dto';

@Injectable()
export class WeddingService {
	constructor(
		private userService: UserService,
		@InjectRepository(Wedding) private weddingRepository: Repository<Wedding>,
		@InjectRepository(User) private userRepository: Repository<User>,
		@InjectRepository(UserWedding) private userWeddingRepository: Repository<UserWedding>,
	) {}

	async createWeddingPlan(
		userPayload: JwtPayload,
		createWeddingPlan: CreateWeddingPlanDto,
	): Promise<CreateWeddingPlanDto> {
		return transactionWrapper(async queryRunner => {
			// Stwórz obiekt encji UserWedding
			const userWedding = await queryRunner.manager.create(UserWedding, {
				editPermission: true,
			});

			// Stwórz obiekt encji Wedding
			const wedding = await queryRunner.manager.create(Wedding, createWeddingPlan);
			appendOrCreateArray(wedding, 'userWeddings', userWedding);

			// Stwórz obiekt encji User
			const user = await queryRunner.manager.findOne(User, { ...userPayload }, { relations: ['userWeddings'] });
			if (user) {
				appendOrCreateArray(user, 'userWeddings', userWedding);
			} else throw new BadRequestException('User does not exit!');

			await queryRunner.manager.save(userWedding);
			await queryRunner.manager.save(user);
			await queryRunner.manager.save(wedding);

			return wedding as CreateWeddingPlanDto;
		});
	}

	async updateWedding(
		userPayload: JwtPayload,
		idWedding: number,
		updateWeddingDto: UpdateWeddingDto,
	): Promise<UpdateWeddingDto> {
		if (await this.checkIfUserHasPermission(userPayload, idWedding, true)) {
			const wedding = await this.weddingRepository.findOne({ idWedding });

			updateAllObjectKeyValues(updateWeddingDto, wedding);

			return await this.weddingRepository.save(wedding);
		} else {
			throw new ForbiddenException('You have no permission to edit this wedding');
		}
	}

	async checkIfUserHasPermission(
		userPayload: JwtPayload,
		idWedding: number,
		checkEditPermission: boolean,
	): Promise<boolean> {
		const weddingPermissions = await this.userWeddingRepository.find({
			where: { wedding: { idWedding } },
			relations: ['users'],
		});

		const user = await weddingPermissions.find((value, index) => {
			return value.users.idUser === userPayload.idUser;
		});

		if (checkEditPermission) {
			return !!user && user.editPermission;
		} else {
			return !!user;
		}
	}

	async getWeddingDetails(userPayload: JwtPayload, idWedding: number): Promise<any> {
		if (await this.checkIfUserHasPermission(userPayload, idWedding, false)) {
			let weddingDetails = await this.weddingRepository
				.createQueryBuilder('wedding')
				.leftJoinAndSelect('wedding.userWeddings', 'uw')
				.where('wedding.idWedding = :idWedding', { idWedding })
				.leftJoin('uw.users', 'u')
				.andWhere('u.idUser = :idUser', { idUser: userPayload.idUser })
				.getOne();

			const sumCostTask = await this.calculateTaskBudget(idWedding);
			const sumCostBeverage = await this.calculateBeveragesCost(idWedding);
			console.log(sumCostBeverage);

			const { userWeddings } = weddingDetails;

			let weddingDetailsDto = Object.assign({}, weddingDetails, { userWedding: { ...userWeddings.pop() } });
			delete weddingDetailsDto.userWeddings;

			return {
				...weddingDetailsDto,
				sumCostTask,
				sumCostBeverage,
				sumCost: sumCostTask + sumCostBeverage,
				budget: weddingDetailsDto.budget ? weddingDetailsDto.budget - sumCostTask - sumCostBeverage : 0,
				exceedBudget:
					weddingDetailsDto.budget <= sumCostTask + sumCostBeverage
						? weddingDetailsDto.budget - sumCostTask - sumCostBeverage
						: 0,
			} as GetWeddingDto;
		}
		throw new ForbiddenException('You have no access to this resource!');
	}

	async calculateTaskBudget(idWedding: number): Promise<any> {
		return transactionWrapper(async queryRunner => {
			let { sum } = await queryRunner.manager
				.createQueryBuilder(Wedding, 'w')
				.leftJoinAndSelect('w.taskLists', 't')
				.where('w.idWedding = :idWedding', { idWedding })
				.select(`SUM(t."cost")`)
				.getRawOne();

			return Number.parseFloat(sum);
		});
	}

	async calculateBeveragesCost(idWedding: number): Promise<any> {
		return transactionWrapper(async queryRunner => {
			let { cost } = await queryRunner.manager
				.createQueryBuilder(Wedding, 'w')
				.leftJoinAndSelect('w.beverages', 'b')
				.where('w.idWedding = :idWedding', { idWedding })
				.select(`SUM(b."boughtAmount"*b."price")`, 'cost')
				.getRawOne();

			return Number.parseFloat(cost);
		});
	}

	async updateUserPermission(idUserToBeUpdated: number, idWedding: number, canEdit: boolean): Promise<any> {
		const userWeddingRelation = await this.userWeddingRepository.findOne({
			where: { users: { idUser: idUserToBeUpdated }, wedding: { idWedding } },
		});

		if (userWeddingRelation) {
			userWeddingRelation.editPermission = canEdit;
			return await this.userWeddingRepository.save(userWeddingRelation);
		} else {
			return transactionWrapper(async queryRunner => {
				const wedding = await queryRunner.manager.findOne(
					Wedding,
					{ idWedding },
					{ relations: ['userWeddings'] },
				);
				const user = await queryRunner.manager.findOne(
					User,
					{ idUser: idUserToBeUpdated },
					{ relations: ['userWeddings'] },
				);
				const userWedding = await queryRunner.manager.create(UserWedding, { editPermission: canEdit });

				appendOrCreateArray(wedding, 'userWeddings', userWedding);
				appendOrCreateArray(user, 'userWeddings', userWedding);

				await queryRunner.manager.save(UserWedding, userWedding);
				await queryRunner.manager.save(Wedding, wedding);
				await queryRunner.manager.save(User, user);

				return userWedding;
			});
		}
	}

	async getUserWeddings(query: IPageQueryParams, user: JwtPayload): Promise<ICollectionResponse<GetUserWeddingsDto>> {
		return await getCollection(
			query,
			(skip, take) => {
				return this.userWeddingRepository
					.createQueryBuilder('T')
					.leftJoinAndSelect('T.users', 'u')
					.leftJoinAndSelect('T.wedding', 'w')
					.leftJoinAndSelect('w.guests', 'g')
					.groupBy('w.idWedding, u.idUser, w.name, w.dateOfWedding, w.address')
					.select([
						'w.idWedding as "idWedding"',
						'w.name AS "name"',
						'w.dateOfWedding as "dateOfWedding"',
						'w.address AS "address"',
					])
					.addSelect('COUNT(g.idGuest) as "size"')
					.having('u.idUser = :idUser', { idUser: user.idUser })
					.skip(skip)
					.take(take)
					.orderBy('w.name', 'ASC')
					.getRawMany() as Promise<GetUserWeddingsDto[]>;
			},
			() => {
				return this.userWeddingRepository
					.createQueryBuilder('T')
					.leftJoinAndSelect('T.wedding', 'W')
					.leftJoinAndSelect('T.users', 'U')
					.select([
						'W.idWedding AS "idWedding',
						'W.name AS "name"',
						'W.dateOfWedding AS "dateOfWedding"',
						'W.address AS "address"',
					])
					.where('U.idUser = :idUser', { idUser: user.idUser })
					.getCount();
			},
		);
	}

	async allowUserToAccessWedding(
		user: JwtPayload,
		idWedding: number,
		body: AllowUserToAccessWedding,
	): Promise<boolean> {
		if (await this.checkIfUserHasPermission(user, idWedding, true)) {
			const { userEmail, canEdit: userCanEdit } = body;
			const userPermissionToBeChanged = await this.userService.findOne(userEmail);
			if (userPermissionToBeChanged) {
				const { idUser, email } = userPermissionToBeChanged;
				return await this.updateUserPermission(idUser, idWedding, userCanEdit);
			} else
				throw new BadRequestException({
					code: 'EMAIL_NOT_FOUND',
				});
		} else throw new ForbiddenException('Nie masz pozwolenia na wykonanie tej akcji!');
	}

	async getUsersWithAccess(user: JwtPayload, idWedding: number): Promise<any> {
		if (await this.checkIfUserHasPermission(user, idWedding, true)) {
			return await this.userWeddingRepository
				.createQueryBuilder('T')
				.leftJoinAndSelect('T.wedding', 'W')
				.leftJoinAndSelect('T.users', 'U')
				.select([
					'U.idUser AS "idUser"',
					'U.email AS "email"',
					'U.firstName AS "firstName"',
					'U.lastName AS "lastName"',
					'T.editPermission AS "editPermission"',
				])
				.where('W.idWedding = :idWedding', { idWedding })
				.getRawMany();
		} else throw new ForbiddenException('Nie masz uprawnień do wykonania tej akcji!');
	}

	async removeUserAccessToWedding(user: JwtPayload, idWedding: number, idUser: number): Promise<boolean> {
		if (await this.checkIfUserHasPermission(user, idWedding, true)) {
			const found = await this.userWeddingRepository
				.createQueryBuilder('T')
				.leftJoinAndSelect('T.wedding', 'W')
				.leftJoinAndSelect('T.users', 'U')
				.select(['T.idUserWedding AS "idUserWedding"'])
				.where('W.idWedding = :idWedding', { idWedding })
				.andWhere('U.idUser = :idUser', { idUser })
				.getRawOne();

			if (found) {
				const { affected } = await this.userWeddingRepository
					.createQueryBuilder()
					.delete()
					.from(UserWedding)
					.where('idUserWedding = :id', { id: found.idUserWedding })
					.execute();
				return affected === 1;
			}
			return true;
		} else throw new ForbiddenException('Nie masz uprawnień do wykonania tej akcji!');
	}

	async deleteWedding(user: JwtPayload, idWedding: number): Promise<boolean> {
		if (await this.checkIfUserHasPermission(user, idWedding, true)) {
			const { affected } = await this.weddingRepository.delete(idWedding);

			return affected === 1;
		} else throw new ForbiddenException('Nie masz uprawnień do wykonania tej akcji!');
	}

	async addSeatDiagram(user: JwtPayload, idWedding: number, body: AddSeatDiagram): Promise<boolean> {
		if (await this.checkIfUserHasPermission(user, idWedding, true)) {
			const wedding = await this.weddingRepository.findOne({ idWedding });

			wedding.seatChart = body.model;
			const seatDiagram = JSON.parse(body.model);
			let tableCounter = 0;

			seatDiagram.nodeDataArray.forEach(element => {
				let table = element as TableForSeatChartModel;
				if (table.hasOwnProperty('guests')) {
					tableCounter = tableCounter + 1;
				}
			});

			wedding.tablesTotalCount = tableCounter;

			await this.weddingRepository.save(wedding);

			return true;
		} else throw new ForbiddenException('Nie masz uprawnień do wykonania tej akcji!');
	}
}
