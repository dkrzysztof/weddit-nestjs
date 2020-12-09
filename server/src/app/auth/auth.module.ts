import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../users/users.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { JwtRefreshStrategy } from './strategies/refresh.strategy';
import { AdminGuard } from './guards/admin.guard';
require('dotenv').config();

@Module({
	imports: [
		UsersModule,
		PassportModule,
		JwtModule.register({
			signOptions: {
				expiresIn: `40m`,
			},
			secret: process.env.JWT_SECRET,
		}),
	],
	providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
	exports: [AuthService],
})
export class AuthModule {}
