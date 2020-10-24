import {
	Controller,
	Get,
	Body,
	Post,
	Request,
	UseGuards,
	Req,
	ClassSerializerInterceptor,
	UseInterceptors,
	Delete,
	Param,
	Put,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { EditUserDto } from '../users/dto/edit-user.dto';
import { GetUserDto } from '../users/dto/get-user.dto';
import { UserService } from '../users/users.service';
import { AccountService } from './account.service';

@Controller('account')
@UseInterceptors(ClassSerializerInterceptor)
export class AccountController {
	constructor(private readonly accountService: AccountService, private userService: UserService) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	async getAccountDetails(@Req() { user }): Promise<GetUserDto> {
		return this.userService.getUserDetails(user.idUser);
	}

	@Post()
	async registerUser(@Body() createUserDto: CreateUserDto): Promise<GetUserDto> {
		return await this.userService.createUser(createUserDto);
	}

	@UseGuards(JwtAuthGuard)
	@Put()
	async editAccount(@Req() { user }, @Body() editUserDto: EditUserDto): Promise<GetUserDto> {
		const { email, isAdmin, ...editInfo } = editUserDto;
		return await this.userService.editUser(user.idUser, editInfo);
	}

	@UseGuards(JwtAuthGuard)
	@Delete()
	async deleteAccount(@Req() { user }): Promise<DeleteResult> {
		return await this.userService.deleteUser(user.idUser);
	}
}
