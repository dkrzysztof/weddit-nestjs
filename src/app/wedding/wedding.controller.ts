import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { Wedding } from '../../models/wedding.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUserDto } from '../users/dto/get-user.dto';
import { CreateWeddingPlanDto } from './dto/create-wedding-plan.dto';
import { GetWeddingDto } from './dto/get-wedding.dto';
import { UpdateWeddingDto } from './dto/update-wedding.dto';
import { WeddingService } from './wedding.service';

@Controller()
export class WeddingController {
	constructor(private readonly weddingService: WeddingService) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	async createWeddingPlan(@Req() request, @Body() body: CreateWeddingPlanDto): Promise<CreateWeddingPlanDto> {
		return await this.weddingService.createWeddingPlan(request.user, body);
	}

	@UseGuards(JwtAuthGuard)
	@Put(':id')
	async updateWedding(
		@Req() request,
		@Param('id') idWedding,
		@Body() body: UpdateWeddingDto,
	): Promise<UpdateWeddingDto> {
		return await this.weddingService.updateWedding(request.user, idWedding, body);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async getWedding(@Req() request, @Param('id') idWedding): Promise<GetWeddingDto> {
		return await this.weddingService.getWeddingDetails(request.user, idWedding);
	}
}
