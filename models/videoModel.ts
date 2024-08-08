
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Video extends Model {
  public id!: number;
  public title!: string;
  public filePath!: string;
}

Video.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    filePath: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: 'videos',
    sequelize,
  }
);

export default Video;
