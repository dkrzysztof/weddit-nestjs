import { Controller, Get, Body, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UserService } from './users/users.service';

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly authService: AuthService,
		private userService: UserService,
	) {}

	@UseGuards(LocalAuthGuard)
	@Post('/auth/login')
	async login(@Request() req) {
		return this.authService.login(req.user);
	}

	@Post('auth/register')
	async register(@Body() createUserDto: CreateUserDto) {
		return await this.userService.createUser(createUserDto);
	}

	@UseGuards(JwtAuthGuard)
	@Get('auth/profile')
	getProfile(@Request() req) {
		return req.user;
	}
}
