import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../users/users.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { JwtRefreshStrategy } from './strategies/refresh.strategy';
require('dotenv').config();

@Module({
	imports: [
		UsersModule,
		PassportModule,
		JwtModule.register({
			signOptions: {
				expiresIn: `${process.env.JWT_EXPIRY || 12}h`,
			},
			secret: process.env.JWT_SECRET,
		}),
	],
	providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
	exports: [AuthService],
})
export class AuthModule {}
