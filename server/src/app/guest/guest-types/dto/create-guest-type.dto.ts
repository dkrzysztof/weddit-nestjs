import { IsString } from 'class-validator';

export class CreateGuestTypeDto {
	@IsString()
	name: string;
}
