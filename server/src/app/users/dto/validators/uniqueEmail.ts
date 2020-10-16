import { InjectRepository } from '@nestjs/typeorm';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Repository } from 'typeorm';
import { User } from '../../../../models/user.entity';

@ValidatorConstraint({ name: 'uniqueEmail', async: true })
export class UniqueEmail implements ValidatorConstraintInterface {
	constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

	validate(email: string) {
		return this.userRepository
			.findOne({ email })
			.then(() => false)
			.catch(() => true);
	}

	defaultMessage() {
		return 'Email is already in use!';
	}
}
