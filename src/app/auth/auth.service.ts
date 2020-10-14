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

	async login(user: any): Promise<any> {
		const payload = { email: user.email, sub: user.idUser };

		return {
			access_token: this.jwtService.sign(payload),
		};
	}

	public getCookieWithJwtAccessToken(idUser: number, email: string) {
		const payload: JwtPayload = { idUser, email };
		const token = this.jwtService.sign(payload, {
			secret: process.env.JWT_SECRET,
			expiresIn: `${process.env.JWT_EXPIRY}h`,
		});
		return `Access_token=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_EXPIRY}`;
	}

	async getCookieWithJwtRefreshToken(idUser: number, email: string) {
		const payload: JwtPayload = { idUser, email };
		const token = this.jwtService.sign(payload, {
			secret: process.env.REFRESH_SECRET,
			expiresIn: `${process.env.REFRESH_EXPIRY}d`,
		});

		const cookie = `Refresh_token=${token}; HttpOnly; Secure; Path=/; Max-Age=${process.env.REFRESH_EXPIRY}`;

		return {
			cookie,
			token,
		};
	}

	public getCookiesForLogOut() {
		return ['Access_token=; HttpOnly; Path=/; Max-Age=0', 'Refresh=; HttpOnly; Path=/; Max-Age=0'];
	}
}
