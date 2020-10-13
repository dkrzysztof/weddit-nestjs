import { IsString } from 'class-validator';

export class UpdateGuestTypeDto {
	@IsString()
	name: string;
}
