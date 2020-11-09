import { Connection } from 'typeorm';
import { Beverage } from '../../models/beverages.entity';

export const beveragesProvider = [
	{
		provide: 'BEVERAGE_PROVIDER',
		useFactory: (connection: Connection) => connection.getRepository(Beverage),
		inject: ['DATABASE_CONNECTION'],
	},
];
