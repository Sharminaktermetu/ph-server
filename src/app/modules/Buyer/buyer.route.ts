/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';




import { upload } from '../../utils/sendImageToCloudinary';
import { USER_ROLE } from '../User/user.constant';
import { UserControllers } from '../User/user.controller';

const router = express.Router();

// router.post(
//   '/create-buyer',
//   // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
//   upload.single('file'),
//   (req: Request, res: Response, next: NextFunction) => {
//     req.body = JSON.parse(req.body.data);
//     next();
//   },

//   UserControllers.createBuyer
// );





export const BuyerRoutes = router;
