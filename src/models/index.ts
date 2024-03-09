import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { User } from './User';
import * as config from 'config';

const options: SequelizeOptions = {
  define: {
    timestamps: false,
  },
  dialectOptions: {
    multipleStatements: true,
  },
  pool: {},
};

//Create the instance
const sequilize = new Sequelize(config.get<string>('DATABASE_URL'), options);

//Initalize the models
sequilize.addModels([User]);

export { sequilize };
export * from './types';
export { User };
