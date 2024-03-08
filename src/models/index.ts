import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { User } from './User';

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
const sequilize = new Sequelize(
  'mysql://root:M@1234ithu@localhost:3306/inventory',
  options,
);

//Initalize the models
sequilize.addModels([User]);

export { sequilize };
export * from './types';
export { User };
