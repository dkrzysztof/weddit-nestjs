import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { GetUserDto } from 'src/app/users/dto/get-user.dto';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { DeleteResult } from 'typeorm';
import { GetUsersDto } from './dto/get-users.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { IPageQueryParams } from 'src/types/PageQueryParams';
import { ICollectionResponse } from 'src/types/CollectionResponse';

@Controller('admin/users')
export class UsersController {
	constructor(private readonly userService: UserService) {}

	@UseGuards(JwtAuthGuard, AdminGuard)
	@Get()
	async getAllUsers(@Query() query: IPageQueryParams): Promise<ICollectionResponse<GetUsersDto>> {
		return await this.userService.getAllUsers(query);
	}

	@UseGuards(JwtAuthGuard, AdminGuard)
	@Post()
	async createUser(@Body() createUserDto: CreateUserDto): Promise<GetUserDto> {
		return await this.userService.createUser(createUserDto);
	}

	@UseGuards(JwtAuthGuard, AdminGuard)
	@Put(':id')
	async editUser(@Param('id') id, @Body() editUserDto: EditUserDto): Promise<GetUserDto> {
		return await this.userService.editUser(id, editUserDto);
	}

	@UseGuards(JwtAuthGuard, AdminGuard)
	@Delete(':id')
	async deleteUser(@Param('id') id): Promise<DeleteResult> {
		return await this.userService.deleteUser(id);
	}

	@UseGuards(JwtAuthGuard, AdminGuard)
	@Get(':id')
	async getUser(@Param('id') id): Promise<GetUserDto> {
		return await this.userService.getUserDetails(id);
	}
}
