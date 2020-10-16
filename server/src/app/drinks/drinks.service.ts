import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Drink } from '../../models/drink.entity';
import { Wedding } from '../../models/wedding.entity';
import { appendOrCreateArray } from '../../utilities/empty-array-checkout.utility';
import { transactionWrapper } from '../../utilities/transaction-wrapper.utility';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { WeddingService } from '../wedding/wedding.service';
import { AddNewDrinkDto } from './dto/add-new-drink.dto';
import { DrinkForGetAllDrinksDto } from './dto/get-all-drinks.dto';
import { UpdateDrinkDetailsDto } from './dto/update-drink-details.dto';
import { updateAllObjectKeyValues } from '../../utilities/update-all-keys.utilities';

@Injectable()
export class DrinksService {
	constructor(
		@InjectRepository(Drink) private drinkRepository: Repository<Drink>,
		private weddingService: WeddingService,
	) {}

	async getAllDrinks(userPayload: JwtPayload, idWedding: number): Promise<DrinkForGetAllDrinksDto> {
		if (this.weddingService.checkIfUserHasPermission(userPayload, idWedding, false)) {
			return await this.drinkRepository.find({ where: { wedding: { idWedding } } });
		} else throw new ForbiddenException('You have no access to this resource!');
	}

	async addNewDrink(
		userPayload: JwtPayload,
		idWedding: number,
		addNewDrinkDto: AddNewDrinkDto,
	): Promise<AddNewDrinkDto> {
		if (this.weddingService.checkIfUserHasPermission(userPayload, idWedding, false)) {
			return await transactionWrapper(async queryRunner => {
				const drink = await queryRunner.manager.create(Drink, addNewDrinkDto);
				const wedding = await queryRunner.manager.findOne(Wedding, { idWedding }, { relations: ['drinks'] });

				appendOrCreateArray(wedding, 'drinks', drink);

				await queryRunner.manager.save(Drink, drink);
				await queryRunner.manager.save(Wedding, wedding);
				return drink;
			});
		} else throw new ForbiddenException('You have no access to this resource!');
	}

	async updateDrinkDetails(
		userPayload: JwtPayload,
		idWedding: number,
		idDrink: number,
		updateDrinkDetailsDto: UpdateDrinkDetailsDto,
	): Promise<UpdateDrinkDetailsDto> {
		if (this.weddingService.checkIfUserHasPermission(userPayload, idWedding, true)) {
			const drink = await this.drinkRepository.findOne({ idDrink });

			updateAllObjectKeyValues(updateDrinkDetailsDto, drink);

			return await this.drinkRepository.save(drink);
		} else throw new ForbiddenException('You have no permission to do this action!');
	}

	async deleteDrink(userPayload: JwtPayload, idWedding: number, idDrink: number): Promise<boolean> {
		if (this.weddingService.checkIfUserHasPermission(userPayload, idWedding, true)) {
			await this.drinkRepository.delete({ idDrink });
			return true;
		} else throw new ForbiddenException('You have no permission to do this action!');
	}
}
