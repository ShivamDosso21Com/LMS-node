// import { Sequelize, DataTypes, Model } from 'sequelize';
// import sequelize from '../config/database';

// class CourseTable extends Model {
//   public id!: number;
//   public name!: number;
//   public isDeleted!: boolean;
//   public status!: boolean;
//   public createdAt!: Date;
//   public updatedAt!: Date;
// }

// CourseTable.init(
//   {
//     id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     name: {
//       type: new DataTypes.STRING(128),
//       allowNull: false,
//     },
//     isDeleted: {
//       type: new DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//     status: {
//       type: new DataTypes.BOOLEAN,
//       allowNull: false,
//       defaultValue: true,
//       comment: '1 => activated or 0 => deactivated',
//     },
//     createdAt: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     updatedAt: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//   },
//   {
//     tableName: 'coursetable',
//     sequelize,
//   }
// );

// sequelize.sync({ alter: false }).then(() => {
//   console.log('course table created.');
// });



// export { CourseTable };












import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { StudentCourseTable } from './studentCourseModel';



class CourseTable extends Model {
  public id!: number;
  public name!: string; // Changed to string for course name
  public isDeleted!: boolean;
  public status!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

CourseTable.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
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
    tableName: 'coursetable',
    sequelize,
  }
);


CourseTable.hasMany(StudentCourseTable, { foreignKey: 'courseId' });
StudentCourseTable.belongsTo(CourseTable, { foreignKey: 'courseId' });


sequelize.sync({ alter: false }).then(() => {
  console.log('Course table created.');
});

export { CourseTable };
