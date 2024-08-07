import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { DescriptionTable } from './descriptionModel';

class ShortDescriptionTable extends Model {
  public id!: number;
  public topicId!: number;
  public shortDescription!: string;
  public isDeleted!: boolean;
  public status!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

ShortDescriptionTable.init(
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
    shortDescription: {
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
    tableName: 'shortdescription',
    sequelize,
  }
);

ShortDescriptionTable.hasMany(DescriptionTable, { as: 'descriptiontable', foreignKey: 'shortDescriptionId' });

export { ShortDescriptionTable };
