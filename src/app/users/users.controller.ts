import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { GetUserDto } from 'src/app/users/dto/get-user.dto';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { DeleteResult } from 'typeorm';
import { GetUsersDto } from './dto/get-users.dto';

@Controller('users')
export class UsersController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async getAllUsers(): Promise<GetUsersDto[]> {
		return await this.userService.getAllUsers();
	}

	@Post()
	async createUser(@Body() createUserDto: CreateUserDto): Promise<GetUserDto> {
		return await this.userService.createUser(createUserDto);
	}

	@Put(':id')
	async editUser(@Param('id') id, @Body() editUserDto: EditUserDto): Promise<GetUserDto> {
		return await this.userService.editUser(id, editUserDto);
	}

	@Delete(':id')
	async deleteUser(@Param('id') id): Promise<DeleteResult> {
		return await this.userService.deleteUser(id);
	}

	@Get(':id')
	async getUser(@Param('id') id): Promise<GetUserDto> {
		return await this.userService.getUserDetails(id);
	}
}
