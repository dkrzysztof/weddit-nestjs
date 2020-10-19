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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUserDto } from '../users/dto/get-user.dto';
import { UserService } from '../users/users.service';
import { AccountService } from './account.service';

@Controller('account')
@UseInterceptors(ClassSerializerInterceptor)
export class AccountController {
	constructor(private readonly accountService: AccountService, private userService: UserService) {}

	@Get('details')
	@UseGuards(JwtAuthGuard)
	async getUserDetails(@Req() { user }): Promise<GetUserDto> {
		return this.userService.getUserDetails(user.idUser);
	}
}
