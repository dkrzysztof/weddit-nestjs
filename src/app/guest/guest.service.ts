import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { query } from 'express';
import { getConnection, Repository } from 'typeorm';
import { Guest } from '../../models/guest.entity';
import { Wedding } from '../../models/wedding.entity';
import { appendOrCreateArray } from '../../utilities/empty-array-checkout.utility';
import { transactionWrapper } from '../../utilities/transaction-wrapper.utility';
import { updateAllObjectKeyValues } from '../../utilities/update-all-keys.utilities';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { WeddingService } from '../wedding/wedding.service';
import { AddGuestDto } from './dto/add-guest.dto';
import { UpdateGuestDto } from './dto/update-geust.dto';

@Injectable()
export class GuestService {
	constructor(
		@InjectRepository(Guest) private guestRepository: Repository<Guest>,
		private weddingService: WeddingService,
	) {}

	async getAllGuests(userPayload: JwtPayload, idWedding: number): Promise<any> {
		if (await this.weddingService.checkIfUserHasPermission(userPayload, idWedding, false)) {
			return await this.guestRepository.find({ where: { wedding: idWedding } });
		} else throw new ForbiddenException('You have no access to this resource!');
	}

	async addNewGuest(userPayload: JwtPayload, idWedding: number, addGuestDto: AddGuestDto): Promise<AddGuestDto> {
		if (await this.weddingService.checkIfUserHasPermission(userPayload, idWedding, true)) {
			return transactionWrapper(async queryRunner => {
				const wedding = await queryRunner.manager.findOne(Wedding, { idWedding }, { relations: ['guests'] });
				const guest = await queryRunner.manager.create(Guest, addGuestDto);

				appendOrCreateArray(wedding, 'guests', guest);

				await queryRunner.manager.save(Guest, guest);
				await queryRunner.manager.save(Wedding, wedding);

				return guest;
			});
		} else throw new ForbiddenException('You have no access to this resource or permission to this action!');
	}

	async updateGuestDetails(
		userPayload: JwtPayload,
		idWedding: number,
		idGuest: number,
		updateGuestDto: UpdateGuestDto,
	): Promise<UpdateGuestDto> {
		if (await this.weddingService.checkIfUserHasPermission(userPayload, idWedding, true)) {
			const guest = await this.guestRepository.findOne({ idGuest }, { relations: ['guestType'] });

			updateAllObjectKeyValues(updateGuestDto, guest);

			await this.guestRepository.save(guest);

			return { idGuestType: guest.guestType.idGuestType, ...guest } as UpdateGuestDto;
		} else throw new ForbiddenException('You have no access to this action!');
	}

	async deleteGuest(userPayload: JwtPayload, idWedding: number, idGuest: number): Promise<boolean> {
		if (await this.weddingService.checkIfUserHasPermission(userPayload, idWedding, true)) {
			await this.guestRepository.delete({ idGuest });
			return true;
		} else throw new ForbiddenException('You have no access to this resource or permission to this action!');
	}
}
