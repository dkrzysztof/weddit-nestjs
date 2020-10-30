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
import { AllowUserToAccessWedding } from './dto/allow-user-to-access-wedding.dto';
import { CreateWeddingPlanDto } from './dto/create-wedding-plan.dto';
import { GetUserWeddingsDto } from './dto/get-user-weddings.dto';
import { GetWeddingDto } from './dto/get-wedding.dto';
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
				.leftJoinAndSelect('wedding.userWeddings', 'userWedding')
				.where('wedding.idWedding = :idWedding', { idWedding })
				.leftJoin('userWedding.users', 'users')
				.andWhere('users.idUser = :idUser', { idUser: userPayload.idUser })
				.getOne();

			const { userWeddings } = weddingDetails;

			let weddingDetailsDto = Object.assign({}, weddingDetails, { userWedding: { ...userWeddings.pop() } });
			delete weddingDetailsDto.userWeddings;

			return weddingDetailsDto;
		}
		throw new ForbiddenException('You have no access to this resource!');
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
					.leftJoinAndSelect('T.wedding', 'W')
					.leftJoinAndSelect('T.users', 'U')
					.select([
						'W.idWedding as "idWedding"',
						'W.name AS "name"',
						'W.dateOfWedding as "dateOfWedding"',
						'W.address AS "address"',
					])
					.where('U.idUser = :idUser', { idUser: user.idUser })
					.skip(skip)
					.take(take)
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
}
