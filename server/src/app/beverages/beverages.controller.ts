import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Param, Query } from '@nestjs/common/decorators/http/route-params.decorator';
import { IPageQueryParams } from 'src/types/PageQueryParams';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BeveragesService } from './beverages.service';
import { AddNewBeverageDto } from './dto/add-new-beverage.dto';
import { BeverageForGetAllBeveragesDto } from './dto/get-all-beverages.dto';
import { UpdateBeverageDetailsDto } from './dto/update-beverage-details.dto';

@Controller()
export class BeveragesController {
	constructor(private readonly beveragesService: BeveragesService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	async getAllBeverages(
		@Req() { user },
		@Param('idWedding') idWedding: number,
		@Query() query: IPageQueryParams,
	): Promise<any> {
		return await this.beveragesService.getAllBeverages(user, idWedding, query);
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	async getBeverageDetails(@Req() { user }, @Param('idWedding') idWedding: number, @Param('id') idBeverage: number) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	async addNewBeverage(
		@Req() { user },
		@Param('idWedding') idWedding: number,
		@Body() addNewBeverage: AddNewBeverageDto,
	): Promise<AddNewBeverageDto> {
		return await this.beveragesService.addNewBeverage(user, idWedding, addNewBeverage);
	}

	@Put(':id')
	@UseGuards(JwtAuthGuard)
	async updateBeverageDetails(
		@Req() { user },
		@Param('idWedding') idWedding: number,
		@Param('id') idBeverage: number,
		@Body() updateBeverageDetails: UpdateBeverageDetailsDto,
	): Promise<AddNewBeverageDto> {
		return await this.beveragesService.updateBeverageDetails(user, idWedding, idBeverage, updateBeverageDetails);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async deleteBeverage(@Req() { user }, @Param('idWedding') idWedding: number, @Param('id') idBeverage: number) {
		return await this.beveragesService.deleteBeverage(user, idWedding, idBeverage);
	}
}
