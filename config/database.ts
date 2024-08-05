import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('lms', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
