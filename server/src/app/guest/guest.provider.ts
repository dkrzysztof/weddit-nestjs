import { Connection } from 'typeorm';
import { Guest } from '../../models/guest.entity';

export const guestProvider = [
	{
		provide: 'GUEST_PROVIDER',
		useFactory: (connection: Connection) => connection.getRepository(Guest),
		inject: ['DATABASE_CONNECTION'],
	},
];
