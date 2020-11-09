import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Beverage } from '../../models/beverages.entity';
import { Wedding } from '../../models/wedding.entity';
import { appendOrCreateArray } from '../../utilities/empty-array-checkout.utility';
import { transactionWrapper } from '../../utilities/transaction-wrapper.utility';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { WeddingService } from '../wedding/wedding.service';
import { AddNewBeverageDto } from './dto/add-new-beverage.dto';
import { BeverageForGetAllBeveragesDto } from './dto/get-all-beverages.dto';
import { UpdateBeverageDetailsDto } from './dto/update-beverage-details.dto';
import { updateAllObjectKeyValues } from '../../utilities/update-all-keys.utilities';
import { getCollection } from 'src/utilities/get-collection.utility';
import { IPageQueryParams } from 'src/types/PageQueryParams';

@Injectable()
export class BeveragesService {
	constructor(
		@InjectRepository(Beverage) private beverageRepository: Repository<Beverage>,
		private weddingService: WeddingService,
	) {}

	async getAllBeverages(
		userPayload: JwtPayload,
		idWedding: number,
		query: IPageQueryParams,
	): Promise<BeverageForGetAllBeveragesDto> {
		if (this.weddingService.checkIfUserHasPermission(userPayload, idWedding, false)) {
			return await getCollection(
				query,
				async (skip, take) => {
					return await this.beverageRepository.find({
						where: { wedding: { idWedding } },
						skip,
						take,
						order: { name: 'ASC' },
					});
				},
				async () => {
					return await this.beverageRepository.count({ where: { wedding: { idWedding } } });
				},
			);
		} else throw new ForbiddenException('You have no access to this resource!');
	}

	async addNewBeverage(
		userPayload: JwtPayload,
		idWedding: number,
		addNewBeverageDto: AddNewBeverageDto,
	): Promise<AddNewBeverageDto> {
		if (this.weddingService.checkIfUserHasPermission(userPayload, idWedding, false)) {
			return await transactionWrapper(async queryRunner => {
				const beverage = await queryRunner.manager.create(Beverage, addNewBeverageDto);
				const wedding = await queryRunner.manager.findOne(Wedding, { idWedding }, { relations: ['beverages'] });

				appendOrCreateArray(wedding, 'beverages', beverage);

				await queryRunner.manager.save(Beverage, beverage);
				await queryRunner.manager.save(Wedding, wedding);
				return beverage;
			});
		} else throw new ForbiddenException('You have no access to this resource!');
	}

	async updateBeverageDetails(
		userPayload: JwtPayload,
		idWedding: number,
		idBeverage: number,
		updateBeverageDetailsDto: UpdateBeverageDetailsDto,
	): Promise<UpdateBeverageDetailsDto> {
		if (this.weddingService.checkIfUserHasPermission(userPayload, idWedding, true)) {
			const beverage = await this.beverageRepository.findOne({ idBeverage });

			updateAllObjectKeyValues(updateBeverageDetailsDto, beverage);

			return await this.beverageRepository.save(beverage);
		} else throw new ForbiddenException('You have no permission to do this action!');
	}

	async deleteBeverage(userPayload: JwtPayload, idWedding: number, idBeverage: number): Promise<boolean> {
		if (this.weddingService.checkIfUserHasPermission(userPayload, idWedding, true)) {
			await this.beverageRepository.delete({ idBeverage });
			return true;
		} else throw new ForbiddenException('You have no permission to do this action!');
	}
}
