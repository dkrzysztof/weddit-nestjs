import { Body, Injectable, Post } from '@nestjs/common';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UserService } from './users/users.service';

@Injectable()
export class AppService {
	constructor(private userService: UserService) {}
	getHello(): string {
		return 'Hello World!';
	}

	getTest(): string {
		return 'test';
	}

	@Post('auth/register')
	async register(@Body() createUserDto: CreateUserDto) {
		// async register(@Request() req) {
		return await this.userService.createUser(createUserDto);
	}
}
