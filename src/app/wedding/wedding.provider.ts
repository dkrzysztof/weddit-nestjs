import { Connection } from 'typeorm';
import { Wedding } from '../../models/wedding.entity';

export const weddingProvider = [
	{
		provide: 'WEDDING_PROVIDER',
		useFactory: (connection: Connection) => connection.getRepository(Wedding),
		inject: ['DATABASE_CONNECTION'],
	},
];
