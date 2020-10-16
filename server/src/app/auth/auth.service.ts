import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserService } from '../users/users.service';

@Injectable()
export class AuthService {
	constructor(private usersService: UserService, private jwtService: JwtService) {}

	async validateUser(email: string, pass: string): Promise<any> {
		const user = await this.usersService.findOne(email);

		if (user && bcrypt.compare(pass, user.password)) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	async login(access_token: string, refresh_token: string): Promise<any> {
		return {
			access_token,
			refresh_token,
		};
	}

	public getCookieWithJwtAccessToken(idUser: number, email: string) {
		const payload: JwtPayload = { idUser, email };
		const token = this.jwtService.sign(payload, {
			secret: process.env.JWT_SECRET,
			expiresIn: `${process.env.JWT_EXPIRY}h`,
		});
		const cookie = `access_token=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_EXPIRY}`;

		return {
			cookie,
			token,
		};
	}

	async getCookieWithJwtRefreshToken(idUser: number, email: string) {
		const payload: JwtPayload = { idUser, email };
		const refreshTokenExpiry = Number.parseInt(process.env.JWT_REFRESH_EXPIRY) || 1;

		const token = this.jwtService.sign(payload, {
			secret: process.env.JWT_REFRESH_SECRET,
			expiresIn: `${refreshTokenExpiry}d`,
		});

		const refreshExpirationInSeconds = refreshTokenExpiry * 24 * 60 * 60;
		const cookie = `refresh_token=${token}; HttpOnly; Path=/; Max-Age=${refreshExpirationInSeconds}`;

		return {
			cookie,
			token,
		};
	}

	public getCookiesForLogOut() {
		return ['Access_token=; HttpOnly; Path=/; Max-Age=0', 'Refresh=; HttpOnly; Path=/; Max-Age=0'];
	}
}
