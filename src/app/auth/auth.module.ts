import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../users/users.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
require('dotenv').config();

@Module({
	imports: [
		UsersModule,
		PassportModule,
		JwtModule.register({
			signOptions: {
				expiresIn: '12h',
			},
			secret: process.env.JWT_SECRET,
		}),
	],
	providers: [AuthService, LocalStrategy, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}
