import { Request, Response } from "express";
import {
  createUser,
  getUser,
  findAllUsers,
} from "../services/userService";
import { ValidationError, where } from "sequelize";


import bcrypt from "bcrypt"; // Assuming you're using bcrypt for password hashing
import jwt from "jsonwebtoken"; // For generating JWT tokens
import { Otp, Student } from "../models/userModel";

export const create = async (req: Request, res: Response) => {
  try {
    //console.log("req body", req.body);

    //check if addahr number is present thencheck validations


    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({ message: 'Send at least one key' });
  }
  
    
    const isTwelveDigits = (value: number | null) => {
      if (value !== null && !/^\d{12}$/.test(String(value))) {
       return false;
      }
      return true; // Return true if validation passes
    };

    if (req.body.aadharcardnumber) {
      const result = isTwelveDigits(req.body.aadharcardnumber);
      console.log('Aadhar card result', result); // Should log true if validation passes
      if(!result){
      return res.status(200).send({message: 'aadhar number must be 12 digit number'});
    }
    }
    

    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    const namePart = (req.body.emailaddress).slice(0, 4);
    const studentId = namePart + randomNumber;

    //student id 
    req.body.studentId = studentId;
    const emailMatch = req.body.emailaddress.match(/^([^@]+)@/);
    if (!emailMatch) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    //console.log('email match',emailMatch)
    const emailPart = emailMatch[1];
    //student name 
    req.body.studentname = emailPart;

    //user name 
    req.body.username = emailPart;

    //check if mobile no is alredy registered
    let isRegistered = await Student.findOne({where : {contactnumber : req.body.contactnumber},});
    if(isRegistered){
      return res.status(400).send({message : 'This number is already registered with us',status : false})
    }
    //refer by id 
    if(req.body.referbyId){
      let result = await Student.findOne({where : {studentId : req.body.referbyId},});
      //console.log('checking refer id in database',result);
      if(result?.studentId === req.body.referbyId){
        
      }else{
        return res.status(400).send({message : 'Invalid referal code'})
      }
    }else{
      req.body.referbyId = '0001ADMIN';
    }

   
    //check user id
    let result = await Otp.findOne({where : {contactnumber : req.body.contactnumber},});
    //console.log('result from otp table',result);
    if(result && result?.otp != req?.body?.otp){
    //valid refereal
    //console.log('result from otp table',result);
    return res.status(400).send({message : 'Please enter valid otp',status : false})
    }
   

     // Check OTP
     let otpRecord = await Otp.findOne({ where: { contactnumber: req.body.contactnumber, otp: req.body.otp } });
     if (!otpRecord) {
       return res.status(400).send({ message: 'Invalid OTP' , status : false});
     }
 
     const currentTime = new Date();
     const otpTimestamp = new Date(otpRecord.createdAt);
     const timeDifference = (currentTime.getTime() - otpTimestamp.getTime()) / 1000 / 60; // Time difference in minutes
 
     if (timeDifference > 2) {
       await  Otp.destroy({where : {contactnumber : req.body.contactnumber}})
       return res.status(400).send({ message: 'OTP has expired',  status : false });
     }

     // remove otp

        await  Otp.destroy({where : {contactnumber : req.body.contactnumber}})
    

     const data = await createUser(req.body);
     res.status(201).json({ data });

   
  } catch (error) {
    //console.log("error", error);
    if (error instanceof ValidationError) {
      res.status(400).json({
        message: "Validation error",
        errors: error.errors.map((err) => ({
          field: err.path,
          message: err.message,
        })),
      });
    } else {
      res.status(500).json({ data : error , message: "Internal server error" });
    }
  }
};

export const get = async (req: Request, res: Response) => {
  const data = await getUser(parseInt(req.body.userId));
  if (data) {
   return res.status(200).send({data});
  } else {
   return res.status(404).json({ message: "User not found" });
  }
};

export const findAll = async (_req: Request, res: Response) => {
  const data = await findAllUsers();
 return res.status(200).send({data});
};

//update student
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const  id = req.body.userId; // Get student ID from URL parameters
    const updateData = req.body; // Get the fields to update from the request body
    //console.log('req body data ',req.body)
    // Ensure the ID is provided
    if (!id) {
      return res.status(400).json({ message: 'Student ID is required' });
    }

    // Ensure updateData is not empty
    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'No update data provided' });
    }

    // Update the student record
    const [updatedRowsCount] = await Student.update(updateData, {
      where: { id: id , isDeleted : false},
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const updatedStudent = await Student.findByPk(id, {
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    });

    res.status(200).send({message : "data updated", data : updatedStudent});
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'An error occurred while updating the student' });
  }
};

// Function to find a user by mobile number and validate password
export const login = async (req: Request, res: Response) => {
  try {
   
    const { contactnumber, password } = req.body;
    // Validate input
    if (!contactnumber || !password) {
      return res
        .status(400)
        .json({ message: "Mobile number and password are required" });
    }
    // Find the user by mobile number
  
    let checkNumber =  await  Student.findOne({ where: { contactnumber ,isDeleted : false} });

    if (!checkNumber) {
      return res
        .status(401)
        .json({ message: "Invalid mobile number or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, checkNumber.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid mobile number or password" });
    }

    // Generate a token
    const token = jwt.sign({ id: checkNumber.id }, `${process.env.SECRET_KEY}`);

      await  Student.update(
         {token : token},
        { where: { contactnumber ,isDeleted : false} });

    res
      .status(200)
      .json({ token,  user: { id: checkNumber.id, mobileNo: checkNumber.contactnumber } });
  } catch (error) {
    //console.log("error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const Logout = async (req: Request, res: Response) => {
  try {
   
    const { contactnumber, password } = req.body;
    // Validate input
    if (!contactnumber || !password) {
      return res
        .status(400)
        .json({ message: "Mobile number and password are required" });
    }
    // Find the user by mobile number
  
    let checkNumber =  await  Student.findOne({ where: { contactnumber ,isDeleted : false} });

    if (!checkNumber) {
      return res
        .status(401)
        .json({ message: "Invalid mobile number or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, checkNumber.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid mobile number or password" });
    }

    // Generate a token
    const token = jwt.sign({ id: checkNumber.id }, `${process.env.SECRET_KEY}`);

    res
      .status(200)
      .json({ token,  user: { id: checkNumber.id, mobileNo: checkNumber.contactnumber } });
  } catch (error) {
    //console.log("error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const forgotPassword = async (req: Request, res: Response) => {
  try {
    //console.log("req body", req.body);
    const { contactnumber } = req.body;

    if (!contactnumber) {
      return res.status(404).send({ message: "Please provide mobile number" });
    }

    let checkNumber = await Student.findOne({
      where: {
        contactnumber: contactnumber,
        isDeleted : false
      },
    });

    //console.log("number is found", checkNumber);

    //generatign otp if number is found
    // const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otp = '123456'
    //console.log("otp is generated", otp);

    if (!checkNumber) {
      return res
        .status(404)
        .send({
          message:
            "This number is not exist in our record please try with another number",
        });
    }

    //update otp in side code
    await Student.update(
      { otp: otp },
      { where: { contactnumber } } // Replace 'otp' with the actual OTP value variable
    );

    return res
      .status(200)
      .send({ message: "Otp is valid of 2 minutes"});
  } catch (error) {
    //console.log("error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const otpGenerate = async (req: Request, res: Response) => {
  try {
    //console.log("req body", req.body);
    const { contactnumber } = req.body;

    if (!contactnumber) {
      return res.status(404).send({ message: "Please provide mobile number" });
    }

    let checkNumber = await Student.findOne({
      where: {
        contactnumber: contactnumber,
        isDeleted : false
      },
    });

    console.log("number is found", checkNumber);



    //generatign otp if number is found
    // const otp = Math.floor(10000 + Math.random() * 90000).toString();
    let otp = 123456;
    //console.log("otp is generated", otp);

    if (checkNumber) {
      return res
        .status(404)
        .send({
          message:
            "This number is already registered please go to login page",
        });
    }



    //new cheks
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    const namePart = (req.body.emailaddress).slice(0, 4);
    const studentId = namePart + randomNumber;

    //student id 
    req.body.studentId = studentId;
    const emailMatch = req.body.emailaddress.match(/^([^@]+)@/);
    if (!emailMatch) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    //console.log('email match',emailMatch)
    const emailPart = emailMatch[1];
    //student name 
    req.body.studentname = emailPart;

    //user name 
    req.body.username = emailPart;

    //check if mobile no is alredy registered
    let isRegistered = await Student.findOne({where : {contactnumber : req.body.contactnumber},});
    if(isRegistered){
      return res.status(400).send({message : 'This number is already registered with us',status : false})
    }
    //refer by id 
    if(req.body.referbyId){
      let result = await Student.findOne({where : {studentId : req.body.referbyId},});
      //console.log('checking refer id in database',result);
      if(result?.studentId === req.body.referbyId){
        
      }else{
        return res.status(400).send({message : 'Invalid referal code'})
      }
    }else{
      req.body.referbyId = '0001ADMIN';
    }


    //closed 


    let otpRecord = await Otp.findOne({ where: { contactnumber: req.body.contactnumber} });
    if (otpRecord) {

      const currentTime = new Date();
      const otpTimestamp = new Date(otpRecord.createdAt);
      const timeDifference = (currentTime.getTime() - otpTimestamp.getTime()) / 1000 / 60; // Time difference in minutes
  
      if (timeDifference < 2) {
        return res.status(400).send({ message: 'Please wait for two minutes your otp has been sent to registered number' });
      }else{
        await  Otp.destroy({where : {contactnumber : req.body.contactnumber}})
      }
  
    }

  

    req.body.otp = otp
    let storeOtp = await Otp.create(req.body);
    //console.log('otp stored in database',storeOtp);

    return res
      .status(200)
      .send({ message: "Otp is valid of 2 minutes" });
  } catch (error) {
    //console.log("error", error);
    if (error instanceof ValidationError) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors.map((err) => ({
          field: err.path,
          message: err.message,
        })),
      });
    } else {
     return  res.status(500).json({ message: "Internal server error" });
    }
  }
};



export const forgotPasswordVerify = async (req: Request, res: Response) => {
  const { otp, contactnumber } = req.body;

  if (!otp  || !contactnumber) {
    return res.status(400).send({ message: "Otp,new password, contactnumber are required" });
  }

  try {
    // Update the password in one line
    const result = await Student.findOne(
      { where: { otp ,isDeleted : false , contactnumber : contactnumber} }
    );

    // Check if any rows were affected
    if (result) {
      return res.status(200).send({ message: "OTP verified", status: 200 });
    }

    return res.status(200).send({ message: "Invalid Otp" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
};



export const forgotPasswordVerify3 = async (req: Request, res: Response) => {
  const { password,contactnumber,otp } = req.body;

  if (!password || !contactnumber || !otp) {
    return res.status(400).send({ message: "Otp,new password,contact number are required" });
  }

  try {
    // Update the password in one line
    const result = await Student.update(
      { password: await bcrypt.hash(password, 10) },
      { where: { isDeleted : false , contactnumber : contactnumber, otp:otp} }
    );

    // Check if any rows were affected
    if (result[0] === 0) {
      return res.status(404).send({ message: "Couldn't update password please enter correct number and password" });
    }

    return res.status(200).send({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
};