import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppService } from 'src/app/app.service';
import { UserService } from 'src/app/users/users.service';

@Injectable()
export class AdminGuard implements CanActivate {
	constructor(@Inject('AppService') private readonly appService: AppService) {}
	canActivate(context: ExecutionContext): boolean | Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		return this.appService.isUserAdmin(Number.parseInt(request.user.idUser));
	}
}
