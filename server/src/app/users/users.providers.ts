import { Connection } from 'typeorm';
import { User } from '../../models/user.entity';

export const usersProvider = [
  {
    provide: 'USER_PROVIDER',
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: ['DATABASE_CONNECTION'],
  },
];
