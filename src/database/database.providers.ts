import * as mongoose from 'mongoose';
import { DB_CONECTION } from 'src/base/constants';

export const databaseProviders = [
  {
    provide: DB_CONECTION,
    useFactory: (): Promise<typeof mongoose> => {
      console.log('~ process.env.DB_URI:', process.env.DB_URI);
      return mongoose.connect(process.env.DB_URI);
    },
  },
];
