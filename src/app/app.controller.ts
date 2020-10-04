import { Controller, Get, Body, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UserService } from './users/users.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('/auth/login')
	async login(@Request() req) {
		return this.authService.login(req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Request() req) {
		return req.user;
	}
}
