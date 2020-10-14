import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UserService } from '../users/users.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
	constructor(private readonly configService: ConfigService, private readonly userService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
					return request?.cookies?.Refresh;
				},
			]),
			secretOrKey: process.env.JWT_SECRET,
			passReqToCallback: true,
		});
	}

	async validate(request: Request, payload: JwtPayload) {
		const refreshToken = request.cookies?.Refresh;
		return this.userService.getUserIfRefreshTokenMatches(refreshToken, payload.idUser);
	}
}
