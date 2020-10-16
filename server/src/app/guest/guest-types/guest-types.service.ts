import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { query } from 'express';
import { getConnection, Repository } from 'typeorm';
import { GuestType } from '../../../models/guestType.entity';
import { transactionWrapper } from '../../../utilities/transaction-wrapper.utility';
import { updateAllObjectKeyValues } from '../../../utilities/update-all-keys.utilities';
import { JwtPayload } from '../../interfaces/jwt-payload.interface';
import { UserService } from '../../users/users.service';
import { CreateGuestTypeDto } from './dto/create-guest-type.dto';
import { UpdateGuestTypeDto } from './dto/update-guest-type.dto';

@Injectable()
export class GuestTypeService {
	constructor(
		@InjectRepository(GuestType) private guestTypeRepository: Repository<GuestType>,
		private userService: UserService,
	) {}

	async getAllGuestTypes(): Promise<GuestType[]> {
		return this.guestTypeRepository.find();
	}

	async createGuestType(userPayload: JwtPayload, createGuestType: CreateGuestTypeDto): Promise<GuestType> {
		if (await this.userService.isAdmin(userPayload.idUser)) {
			return await transactionWrapper(async queryRunner => {
				const guestType = await queryRunner.manager.create(GuestType, createGuestType);
				await queryRunner.manager.save(GuestType, guestType);
				return guestType;
			});
		} else throw new ForbiddenException('You have no permission to this action!');
	}

	async updateGuestType(
		userPayload: JwtPayload,
		idGuestType: number,
		updateGuestType: UpdateGuestTypeDto,
	): Promise<UpdateGuestTypeDto> {
		if (await this.userService.isAdmin(userPayload.idUser)) {
			const guestType = await this.guestTypeRepository.findOne({ idGuestType });

			updateAllObjectKeyValues(updateGuestType, guestType);

			return await this.guestTypeRepository.save(guestType);
		} else throw new ForbiddenException('You have no permission to this action!');
	}

	async deleteGuestType(userPayload: JwtPayload, idGuestType: number): Promise<any> {
		if (await this.userService.isAdmin(userPayload.idUser)) {
			await this.guestTypeRepository.delete({ idGuestType });
			return true;
		} else throw new ForbiddenException('You have no permission to this action!');
	}
}
