import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Student extends Model {
  public id!: number;
  public contactNumber!: number;
  public name!: string;
  public studentId!: string;
  public studentName!: string;
  public wallet!: number;
  public userName!: string;
  public isDeleted!: boolean;
  public emailAddress!: string;
  public courseId!: string;
  public password!: string;
  public referbyId!: string;
  public status!: boolean;
  public otp!: number;
  public token!: string;
  public studentProfile!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    contactNumber: {
      type: new DataTypes.BIGINT(), // Using BIGINT to accommodate larger numbers
      allowNull: false,
      unique: true,
      validate: {
        isTenDigits(value: number) {
          if (!/^[6-9]\d{9}$/.test(String(value))) {
            throw new Error('Contact number must be a 10-digit number starting with a digit between 6 and 9.');
          }
        }
      },
    },
    studentId: {
      type: DataTypes.STRING(24),
      allowNull: false,
      unique: true,
    },
    studentName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    wallet: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      defaultValue : 0
    },
    isDeleted: {
      type: new DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    courseId: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    emailAddress: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    referbyId: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    otp: {
      type: DataTypes.INTEGER(), // Using BIGINT for 12-digit Aadhar number
      allowNull: true,
    },
    status: {
      type: new DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: '1 => activated or 0 => deactivated',
    },
    studentProfile: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    token: {
      type: new DataTypes.STRING(250),
      allowNull: true,
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
    tableName: 'students',
    sequelize,
  }
);

sequelize.sync({ alter: false }).then(() => {
  console.log('Students table created.');
});




// import { Sequelize, DataTypes, Model } from 'sequelize';
// import sequelize from '../config/database';

// class Student extends Model {
//   public id!: number;
//   public contactnumber!: number;
//   public studentId!: string;
//   public studentname!: string;
//   public username!: string;
//   public isDeleted!: boolean;
//   public studentidimage!: string;
//   public aadharcardnumber!: number | null;
//   public aadharimage!: string;
//   public emailaddress!: string;
//   public password!: string;
//   public referbyId!: string;
//   public status!: boolean;
//   public otp!: string;
//   public token!: string;
//   public studentprofile!: string;
//   public createdAt!: Date;
//   public updatedAt!: Date;
// }

// Student.init(
//   {
//     id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     contactnumber: {
//       type: new DataTypes.INTEGER(),
//       allowNull: false,
//       unique: true,
//     },
//     studentId: {
//       type: DataTypes.STRING(24),
//       allowNull: false,
//       unique: true,
//     },
//     studentname: {
//       type: new DataTypes.STRING(128),
//       allowNull: false,
//     },
//     isDeleted: {
//       type: new DataTypes.BOOLEAN,
//       defaultValue : false
//     },
//     username: {
//       type: new DataTypes.STRING(128),
//       allowNull: false,
//     },
//     aadharcardnumber: {
//       type: new DataTypes.INTEGER(),
//       allowNull: true,
//       unique : true,
//     },
//     aadharimage: {
//       type: new DataTypes.STRING(128),
//       allowNull: true,
//     },
//     emailaddress: {
//       type: new DataTypes.STRING(128),
//       allowNull: false,
//     },
//     password: {
//       type: new DataTypes.STRING(128),
//       allowNull: false,
//     },
//     referbyId: {
//       type: new DataTypes.STRING(128),
//       allowNull: false,
//     },
//     otp: {
//       type: new DataTypes.STRING(128),
//       allowNull: true,
//     },
//     status: {
//       type: new DataTypes.BOOLEAN,
//       allowNull: false,
//       defaultValue: true, 
//       comment: '1 => activated or 0 => deactivated',
//     },
//     studentprofile: {
//       type: new DataTypes.STRING(128),
//       allowNull: true,
//     },
//     token: {
//       type: new DataTypes.STRING(128),
//       allowNull: true,
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
//     tableName: 'students',
//     sequelize,
//   }
// );

// sequelize.sync({alter : false }).then(() => {
//   console.log('Students table created.');
// });

// sequelize.sync({ force: true }).then(() => {
//   console.log('Database synced with force.');
// });




class Otp extends Model {
  public id!: number;
  public contactnumber!: number;
  public otp!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Otp.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    contactnumber: {
      type: new DataTypes.BIGINT(), // Using BIGINT to accommodate larger numbers
      allowNull: false,
      unique: true,
      validate: {
        isTenDigits(value: number) {
          if (!/^[6-9]\d{9}$/.test(String(value))) {
            throw new Error('Contact number must be a 10-digit number starting with a digit between 6 and 9.');
          }
        }
      },
    },
    otp: {
      type: DataTypes.INTEGER,
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
    tableName: 'otp',
    sequelize,
  }
);

sequelize.sync({alter : false }).then(() => {
  console.log('Otp table created.');
});

// sequelize.sync({ force: true }).then(() => {
//   console.log('Database synced with force.');
// });


export { Otp };
export { Student };


