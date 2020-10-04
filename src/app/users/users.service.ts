import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { User } from '../../models/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

	async getAllUsers(): Promise<GetUsersDto[]> {
		return this.userRepository.find();
	}

	async getUserDetails(id: number): Promise<GetUserDto> {
		return this.userRepository.findOne(id);
	}

	async createUser(user: CreateUserDto): Promise<GetUserDto> {
		const { password, ...userData } = user;

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		return this.userRepository.save({ ...userData, password: hashedPassword });
	}

	async editUser(id: number, user: EditUserDto): Promise<GetUserDto> {
		const { id: userToEditId, ...userEditedData } = user;
		const foundUser = await this.userRepository.findOne(id);

		Object.assign(foundUser, userEditedData);

		return this.userRepository.save(foundUser);
	}

	async deleteUser(id: number): Promise<DeleteResult> {
		return this.userRepository.delete({ id });
	}

	async findOne(email: string): Promise<User | undefined> {
		return this.userRepository.findOne({ email });
	}
}
