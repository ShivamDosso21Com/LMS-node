import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class DescriptionTable extends Model {
  public id!: number;
  public topicId!: number;
  public description!: string;
  public shortDescriptionId!: number;
  public isDeleted!: boolean;
  public status!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

DescriptionTable.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    topicId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'topictable',
        key: 'id',
      },
    },
    shortDescriptionId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'shortdescription',
        key: 'id',
      },
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: '1 => activated or 0 => deactivated',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    tableName: 'descriptiontable',
    sequelize,
  }
);

export { DescriptionTable };
