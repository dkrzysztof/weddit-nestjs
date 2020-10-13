import { Connection } from 'typeorm';
import { GuestType } from '../../../models/guestType.entity';

export const guestTypeProvider = [
	{
		provide: 'GUEST_TYPES_PROVIDER',
		useFactory: (connection: Connection) => connection.getRepository(GuestType),
		inject: ['DATABASE_CONNECTION'],
	},
];
