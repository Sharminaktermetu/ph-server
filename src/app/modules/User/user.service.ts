/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { TAdmin } from '../Admin/admin.interface';
import { Admin } from '../Admin/admin.model';

import { TUser } from './user.interface';
import { User } from './user.model';
import { generateAdminId, generateBuyerId } from './user.utils';
import { TBuyer } from '../Buyer/buyer.interface';
import { Buyer } from '../Buyer/buyer.model';

const createBuyerIntoDB = async (file:any, password: string, payload: TBuyer) => {
   // create a user object
   console.log(payload)
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'buyer';
  //set admin email
  userData.email = payload.email;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateBuyerId();

    if (file) {
      const imageName = `${userData.id}${payload?.name}`;
      const path = file?.path;
      //send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImg = secure_url as string;
    }

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a Buyer
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Buyer');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a Buyer (transaction-2)
    const newBuyer = await Buyer.create([payload], { session });

    if (!newBuyer.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Buyer');
    }

    await session.commitTransaction();
    await session.endSession();

    return newBuyer;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
  
};

const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TAdmin,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'admin';
  //set admin email
  userData.email = payload.email;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file?.path;
      //send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImg = secure_url as string;
    }

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getMe = async (userId: string, role: string) => {
  let result = null;
  // if (role === 'student') {
  //   result = await Student.findOne({ id: userId }).populate('user');
  // }
  if (role === 'admin') {
    result = await Admin.findOne({ id: userId }).populate('user');
  }

  // if (role === 'faculty') {
  //   result = await Faculty.findOne({ id: userId }).populate('user');
  // }

  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const UserServices = {
  createBuyerIntoDB,
  createAdminIntoDB,
  getMe,
  changeStatus,
};
