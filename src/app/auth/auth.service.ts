import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
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
}