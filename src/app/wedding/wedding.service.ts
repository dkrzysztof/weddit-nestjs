import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { User } from '../../models/user.entity';
import { UserWedding } from '../../models/userWedding.entity';
import { Wedding } from '../../models/wedding.entity';
import { appendOrCreateArray } from '../../utilities/empty-array-checkout.utility';
import { transactionWrapper } from '../../utilities/transaction-wrapper.utility';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { CreateWeddingPlanDto } from './dto/create-wedding-plan.dto';
import { GetWeddingDto } from './dto/get-wedding.dto';
import { UpdateWeddingDto } from './dto/update-wedding.dto';

@Injectable()
export class WeddingService {
	constructor(
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

			for (let key of Object.keys(wedding)) {
				if (updateWeddingDto[key] != null) {
					wedding[key] = updateWeddingDto[key];
				}
			}

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
			console.log(index, value);
			return value.users.idUser === userPayload.idUser;
		});

		if (checkEditPermission) {
			return !!user && user.editPermission;
		} else {
			return !!user;
		}
	}

	async getWeddingDetails(userPayload: JwtPayload, idWedding: number): Promise<GetWeddingDto> {
		if (await this.checkIfUserHasPermission(userPayload, idWedding, false)) {
			let wedding = await this.weddingRepository.findOne({ idWedding }, { relations: ['userWeddings'] });
			// wedding.userWeddings = wedding.userWeddings.filter(val => val.users.idUser === userPayload.idUser);

			let usersWeddings = await this.userWeddingRepository.find({
				where: { users: { idUser: userPayload.idUser }, wedding: { idWedding } },
			});

			return wedding;
		}
		throw new ForbiddenException('You have no access to this resource!');
	}
}
