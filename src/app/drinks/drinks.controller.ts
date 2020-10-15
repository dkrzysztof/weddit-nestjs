import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DrinksService } from './drinks.service';
import { AddNewDrinkDto } from './dto/add-new-drink.dto';
import { DrinkForGetAllDrinksDto } from './dto/get-all-drinks.dto';
import { UpdateDrinkDetailsDto } from './dto/update-drink-details.dto';

@Controller()
export class DrinksController {
	constructor(private readonly drinksService: DrinksService) {}

	@Get()
	async getAllDrinks(@Req() { user }, @Param('idWedding') idWedding: number): Promise<DrinkForGetAllDrinksDto> {
		return await this.drinksService.getAllDrinks(user, idWedding);
	}

	@Get(':id')
	async getDrinkDetails(@Req() { user }, @Param('idWedding') idWedding: number, @Param('id') idDrink: number) {}

	@Post()
	async addNewDrink(
		@Req() { user },
		@Param('idWedding') idWedding: number,
		@Body() addNewDrink: AddNewDrinkDto,
	): Promise<AddNewDrinkDto> {
		return await this.drinksService.addNewDrink(user, idWedding, addNewDrink);
	}

	@Put(':id')
	async updateDrinkDetails(
		@Req() { user },
		@Param('idWedding') idWedding: number,
		@Param('id') idDrink: number,
		@Body() updateDrinkDetails: UpdateDrinkDetailsDto,
	): Promise<AddNewDrinkDto> {
		return await this.drinksService.updateDrinkDetails(user, idWedding, idDrink, updateDrinkDetails);
	}

	@Delete(':id')
	async deleteDrink(@Req() { user }, @Param('idWedding') idWedding: number, @Param('id') idDrink: number) {
		return await this.drinksService.deleteDrink(user, idWedding, idDrink);
	}
}
