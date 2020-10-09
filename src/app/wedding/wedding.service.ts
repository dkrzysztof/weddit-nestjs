import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { User } from '../../models/user.entity';
import { UserWedding } from '../../models/userWedding.entity';
import { Wedding } from '../../models/wedding.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { CreateWeddingPlan } from './dto/create-wedding-plan.dto';

@Injectable()
export class WeddingService {
	constructor(
		@InjectRepository(Wedding) private weddingRepository: Repository<Wedding>,
		@InjectRepository(User) private userRepository: Repository<User>,
		@InjectRepository(UserWedding) private userWeddingRepository: Repository<UserWedding>,
	) {}

	async createWeddingPlan(user: JwtPayload, createWeddingPlan: CreateWeddingPlan) {
		await getConnection().createQueryRunner();
		const newUserWeddingJoinRelation = await this.userWeddingRepository.save({
			editPermission: true,
		});

		let {
			dateOfWedding: dateOfWeddingString,
			hourOfChurchService: hourOfChurchServiceString,
			hourOfWedding: hourOfWeddingString,
			...others
		} = createWeddingPlan;

		let dateOfWedding = new Date(dateOfWeddingString);
		let hourOfChurchService = new Date(hourOfChurchServiceString);
		let hourOfWedding = new Date(hourOfWeddingString);

		const createdWedding = await this.weddingRepository.save({
			dateOfWedding,
			hourOfChurchService,
			hourOfWedding,
			...others,
		});

		const user = await this.userRepository.findOne(user);

		if (user) {
		} else {
		}

		createdWedding.userWeddings;
	}
}
