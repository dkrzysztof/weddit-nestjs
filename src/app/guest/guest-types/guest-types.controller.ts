import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { request } from 'http';
import { GuestType } from '../../../models/guestType.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateGuestTypeDto } from './dto/create-guest-type.dto';
import { GetGuestTypeDto } from './dto/get-guest-type.dto';
import { UpdateGuestTypeDto } from './dto/update-guest-type.dto';
import { GuestTypeService } from './guest-types.service';

@Controller('guest-types')
export class GuestTypeController {
	constructor(private readonly guestTypeService: GuestTypeService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	async getGuestTypes(): Promise<GetGuestTypeDto[]> {
		return await this.guestTypeService.getAllGuestTypes();
	}

	@Post()
	@UseGuards(JwtAuthGuard)
	async createGuestType(@Req() request, @Body() createGuestType: CreateGuestTypeDto): Promise<CreateGuestTypeDto> {
		return await this.guestTypeService.createGuestType(request.user, createGuestType);
	}

	@Put(':id')
	@UseGuards(JwtAuthGuard)
	async updateGuestType(
		@Req() request,
		@Param('id') idGuestType: number,
		@Body() updateGuestType: UpdateGuestTypeDto,
	): Promise<UpdateGuestTypeDto> {
		return await this.guestTypeService.updateGuestType(request.user, idGuestType, updateGuestType);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async deleteGuestType(@Req() request, @Param('id') idGuestType): Promise<any> {
		return await this.guestTypeService.deleteGuestType(request.user, idGuestType);
	}
}
