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
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UserService } from './users/users.service';
import JwtRefreshGuard from './auth/guards/refresh-auth.guard';
import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator';

@Controller()
export class AppController {
	constructor(private readonly authService: AuthService, private userService: UserService) {}

	@UseGuards(LocalAuthGuard)
	@Post('/auth/login')
	async login(@Request() req) {
		const { user } = req;
		const accessTokenCookie = await this.authService.getCookieWithJwtAccessToken(
			user.idUser,
			user.email,
			user.isAdmin,
		);
		const refreshTokenCookie = await this.authService.getCookieWithJwtRefreshToken(user.idUser, user.email);

		await this.userService.setCurrentRefreshToken(refreshTokenCookie.token, user.idUser);

		req.res.setHeader('Set-Cookie', [accessTokenCookie.cookie, refreshTokenCookie.cookie]);
		return this.authService.login(accessTokenCookie.token, refreshTokenCookie.token);
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

	@UseGuards(JwtRefreshGuard)
	@Get('auth/refresh-token')
	refresh(@Req() req) {
		const { cookie, token } = this.authService.getCookieWithJwtAccessToken(
			req.user.idUser,
			req.user.email,
			req.user.isAdmin,
		);

		req.res.setHeader('Set-Cookie', cookie);
		return {
			access_token: token,
		};
	}

	@UseGuards(JwtAuthGuard)
	@Post('log-out')
	@HttpCode(200)
	async logOut(@Req() request) {
		await this.userService.removeRefreshToken(request.user.id);
		request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());
	}
}
