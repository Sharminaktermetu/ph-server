import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from '../User/user.service';


// const createBuyer = catchAsync(async (req, res) => {
//   const { password, student: studentData } = req.body;

//   const result = await UserServices.createBuyerIntoDB(
//     req.file,
//     password,
//     studentData,
//   );

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Student is created successfully',
//     data: result,
//   });
// });



export const UserControllers = {
//  createBuyer,

};
