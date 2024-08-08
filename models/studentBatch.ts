

import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';


class StudentBatch extends Model {
  public id!: number;
  public batchId!: number; // Changed to string for course name
  public studentId!: number;
  public courseId!: number;
  public status!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

StudentBatch.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    batchId: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
    },
    studentId: {
        type: new DataTypes.INTEGER(),
        allowNull: false,
      },
      courseId: {
    type: new DataTypes.INTEGER(),
    allowNull: false,
    },
    isDeleted: {
      type: new DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: new DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: '1 => activated or 0 => deactivated',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'studentbatch',
    sequelize,
  }
);


sequelize.sync({ alter: false }).then(() => {
  console.log('Course table created.');
});

export { StudentBatch };
