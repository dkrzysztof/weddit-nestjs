import { BadRequestException, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { query } from 'express';
import { GuestType } from 'src/models/guestType.entity';
import { IPageQueryParams } from 'src/types/PageQueryParams';
import { getCollection } from 'src/utilities/get-collection.utility';
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
		@InjectRepository(GuestType) private guestTypeRepository: Repository<GuestType>,
		private weddingService: WeddingService,
	) {}

	async getAllGuests(userPayload: JwtPayload, idWedding: number, queryParams: IPageQueryParams): Promise<any> {
		if (await this.weddingService.checkIfUserHasPermission(userPayload, idWedding, false)) {
			const query = this.guestRepository
				.createQueryBuilder('G')
				.leftJoin('G.guestType', 'GT')
				.leftJoin('G.wedding', 'W')
				.select([
					'G.idGuest AS "idGuest"',
					'G.firstName AS "firstName"',
					'G.lastName AS "lastName"',
					'G.confirmed AS "confirmed"',
					'G.confirmedAfters AS "confirmedAfters"',
					'G.numberTable AS "numberTable"',
					'G.numberSeat AS "numberSeat"',
					'GT.idGuestType AS "idGuestType"',
					'GT.name AS "guestType"',
				])
				.where('W.idWedding = :idWedding', { idWedding })
				.orderBy('G.lastName', 'ASC');

			return await getCollection(
				queryParams,
				async (skip, take) =>
					await query
						.skip(skip)
						.take(take)
						.getRawMany(),
				async () => await query.getCount(),
			);
		} else throw new ForbiddenException('You have no access to this resource!');
	}

	async addNewGuest(userPayload: JwtPayload, idWedding: number, addGuestDto: AddGuestDto): Promise<AddGuestDto> {
		if (await this.weddingService.checkIfUserHasPermission(userPayload, idWedding, true)) {
			return transactionWrapper(async queryRunner => {
				const wedding = await queryRunner.manager.findOne(Wedding, { idWedding }, { relations: ['guests'] });
				const guestType = await queryRunner.manager.findOne(
					GuestType,
					{
						idGuestType: addGuestDto.idGuestType,
					},
					{ relations: ['guests'] },
				);
				const guest = await queryRunner.manager.create(Guest, addGuestDto);

				appendOrCreateArray(wedding, 'guests', guest);
				appendOrCreateArray(guestType, 'guests', guest);

				await queryRunner.manager.save(Guest, guest);
				await queryRunner.manager.save(Wedding, wedding);
				await queryRunner.manager.save(GuestType, guestType);

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
		if (updateGuestDto === null || updateGuestDto === undefined) {
			throw new BadRequestException('Brak danych do zmiany');
		}

		if (await this.weddingService.checkIfUserHasPermission(userPayload, idWedding, true)) {
			const guest = await this.guestRepository.findOne({ idGuest }, { relations: ['guestType'] });

			updateAllObjectKeyValues(updateGuestDto, guest);

			await this.guestRepository.save(guest);

			const idGuestType = guest.guestType && guest.guestType.idGuestType;

			return { idGuestType, ...guest } as UpdateGuestDto;
		} else throw new ForbiddenException('You have no access to this action!');
	}

	async deleteGuest(userPayload: JwtPayload, idWedding: number, idGuest: number): Promise<boolean> {
		if (await this.weddingService.checkIfUserHasPermission(userPayload, idWedding, true)) {
			await this.guestRepository.delete({ idGuest });
			return true;
		} else throw new ForbiddenException('You have no access to this resource or permission to this action!');
	}
}
