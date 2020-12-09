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
import * as csv from '@fast-csv/parse';
import { parseStream } from 'fast-csv';
import * as stream from 'stream';

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
				.orderBy('G.lastName', 'ASC')
				.orderBy('G.firstName', 'ASC');

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

	async getAllGuestsShort(userPayload: JwtPayload, idWedding: number) {
		if (await this.weddingService.checkIfUserHasPermission(userPayload, idWedding, false)) {
			const query = await this.guestRepository
				.createQueryBuilder('G')
				.leftJoin('G.wedding', 'W')
				.select(['G.idGuest AS "idGuest"', 'G.firstName AS "firstName"', 'G.lastName AS "lastName"'])
				.where('W.idWedding = :idWedding', { idWedding })
				.orderBy('G.lastName', 'ASC')
				.getRawMany();

			return query;
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
		} else throw new ForbiddenException('Nie masz uprawnień do tego zasobu!');
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
			const { idGuestType } = updateGuestDto;
			let guest = await this.guestRepository.findOne({ idGuest }, { relations: ['guestType'] });

			if (idGuestType) {
				const typeBefore = await this.guestTypeRepository.findOne(
					{ idGuestType: guest.guestType && guest.guestType.idGuestType },
					{ relations: ['guests'] },
				);
				const typeAfter = await this.guestTypeRepository.findOne(
					{ idGuestType: updateGuestDto.idGuestType },
					{ relations: ['guests'] },
				);
				if (typeBefore) typeBefore.guests = typeBefore.guests.filter(g => g.idGuest != guest.idGuest);

				appendOrCreateArray(typeAfter, 'guests', guest);

				if (typeBefore) await this.guestTypeRepository.save(typeBefore);
				await this.guestTypeRepository.save(typeAfter);
			}
			guest = await this.guestRepository.findOne({ idGuest }, { relations: ['guestType'] });

			updateAllObjectKeyValues(updateGuestDto, guest);

			await this.guestRepository.save(guest);
			const idGuestTypeNew = guest.guestType && guest.guestType.idGuestType;

			return { idGuestType: idGuestTypeNew, ...guest } as UpdateGuestDto;
		} else throw new ForbiddenException('Nie masz uprawnień do wykonania tej akcji!');
	}

	async deleteGuest(userPayload: JwtPayload, idWedding: number, idGuest: number): Promise<boolean> {
		if (await this.weddingService.checkIfUserHasPermission(userPayload, idWedding, true)) {
			await this.guestRepository.delete({ idGuest });
			return true;
		} else throw new ForbiddenException('Nie masz uprawnień do wykonania tej akcji!');
	}

	async uploadGuestsFromFile(user: JwtPayload, idWedding: number, file: File) {
		let bufferStream = new stream.PassThrough();
		bufferStream.end(file.buffer);

		let guestsArrayToCreate = [];

		let parseFilePromise = new Promise<any>((resolve, reject) => {
			parseStream(bufferStream, {
				headers: ['firstName', 'lastName', 'confirmed', 'confirmedAfters'],
				delimiter: ';',
			})
				.on('error', error => reject(error))
				.on('data', row =>
					guestsArrayToCreate.push({
						...row,
						confirmed: row.confirmed == 'true',
						confirmedAfters: row.confirmedAfters == 'true',
						idGuestType: 6,
					}),
				)
				.on('end', rowsNumber => resolve(rowsNumber));
		});

		await parseFilePromise;

		return await transactionWrapper(async queryRunner => {
			const wedding = await queryRunner.manager.findOne(Wedding, { idWedding }, { relations: ['guests'] });
			const guestTypeIds = await this.guestTypeRepository.find({ select: ['idGuestType', 'name'] });
			for (const guestToCreate of guestsArrayToCreate) {
				const newGuest = await queryRunner.manager.create(Guest, guestToCreate);
				const guestType = await queryRunner.manager.findOne(
					GuestType,
					{
						idGuestType: guestTypeIds.find(x => x.idGuestType === guestToCreate.idGuestType)
							? guestToCreate.idGuestType
							: guestTypeIds.find(x => x.name === 'Osoba Dorosła').idGuestType,
					},
					{ relations: ['guests'] },
				);

				appendOrCreateArray(wedding, 'guests', newGuest);
				appendOrCreateArray(guestType, 'guests', newGuest);

				await queryRunner.manager.save(Guest, newGuest);
				await queryRunner.manager.save(GuestType, guestType);
			}

			await queryRunner.manager.save(Wedding, wedding);

			return guestsArrayToCreate.length;
		});
	}
}

export interface File {
	fieldname: string;
	originalname: string;
	encoding: string;
	mimetype: string;
	buffer: Buffer;
	size: number;
}
