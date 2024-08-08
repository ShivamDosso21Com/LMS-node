import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Student } from '../models/userModel';

const secretKey = `${process.env.SECRET_KEY}` // Replace with your secret key

interface TokenPayload {
  id: string;
  iat: number;
  exp?: number;
}

const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1]; this is middle ware

  if (token == null) {
    return res.status(401).send({message : 'unauthorized'}); // Unauthorized if no token is provided
  }

  const tokenCheck = await Student.findOne({ where: { token } });

 
  if(!tokenCheck){
    return res.status(400).send({message : 'user logout please go to login page', status : false})
  }

  jwt.verify(token, secretKey, async (err, user) => {
    if (err) {
      return res.status(403).send({message  : "forbidden token is invalid"}); // Forbidden if token is invalid
    }


    const { id } = user as TokenPayload;

    //console.log('id is gettng here',user);

    if (!id) {
      return res.status(403).send({message : 'forbidde user is not found'}); // Forbidden if no user ID in token
    }

    //check if user id exist in database and user is activated 
    const student = await Student.findOne({
        where: {
          id,
          status: true,
          isDeleted : false
        },
      });
  
      if (!student) {
        return res.status(403).send({message  : "user is not activated please contact to admin"}); // Forbidden if user not found or not active
      }
     
    req.body.userId = id; // Attach user ID to request object for use in routes
    //console.log('inside middleware ',req.body.userId)
    next();
  });
};

export default authenticateToken;


