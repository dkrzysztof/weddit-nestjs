import { Connection } from 'typeorm';
import { Drink } from '../../models/drink.entity';

export const drinksProvider = [
	{
		provide: 'DRINK_PROVIDER',
		useFactory: (connection: Connection) => connection.getRepository(Drink),
		inject: ['DATABASE_CONNECTION'],
	},
];
