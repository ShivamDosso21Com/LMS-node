import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { ShortDescriptionTable } from './shortDescriptionModel';

class TopicTable extends Model {
  public id!: number;
  public courseId!: number;
  public topic!: string;
  public isDeleted!: boolean;
  public status!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

TopicTable.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    courseId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
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
    topic: {
      type: DataTypes.STRING(250),
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
    tableName: 'topictable',
    sequelize,
  }
);

TopicTable.hasMany(ShortDescriptionTable, { as: 'shortdescription', foreignKey: 'topicId' });

export { TopicTable };
