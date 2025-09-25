/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { TAdmin } from '../Admin/admin.interface';
import { Admin } from '../Admin/admin.model';




import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';
import { TBuyer } from './buyer.interface';
import { Buyer } from './buyer.model';

// const createBuyerIntoDB = async (
//   file: any,
//   password: string,
//   payload: TBuyer,
// ) => {
//   // create a user object
//   const userData: Partial<TUser> = {};
 

//   //if password is not given , use default password
//   userData.password = password || (config.default_password as string);

//   //set student role
//   userData.role = 'buyer';
//   // set student email
//   userData.email = payload.email;




 

//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();
//     //set  generated id
//     userData.id = await generateBuyerId();

  

//     // create a user (transaction-1)
//     const newUser = await User.create([userData], { session }); // array

//     //create a student
//     if (!newUser.length) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
//     }
//     // set id , _id as user
//     payload.id = newUser[0].id;
//     payload.user = newUser[0]._id; //reference _id

//     // create a student (transaction-2)
//     const newBuyer = await Buyer.create([payload], { session });

//     if (!newBuyer.length) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Buyer');
//     }

//     await session.commitTransaction();
//     await session.endSession();

//     return newBuyer;
//   } catch (err: any) {
//     await session.abortTransaction();
//     await session.endSession();
//     throw new Error(err);
//   }
// };






export const UserServices = {
// createBuyerIntoDB,

};
