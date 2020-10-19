import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { User } from '../../models/user.entity';

@Injectable()
export class AccountService {
	constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
}
