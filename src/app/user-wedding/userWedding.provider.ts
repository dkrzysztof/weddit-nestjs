import { Connection } from 'typeorm';
import { UserWedding } from '../../models/userWedding.entity';

export const userWeddingProvider = [
	{
		provide: 'USER_WEDDING_PROVIDER',
		useFactory: (connection: Connection) => connection.getRepository(UserWedding),
		inject: ['DATABASE_CONNECTION'],
	},
];
